'use strict';



// This hook expects that the framework dependency is defined on plugin.xml.
// Example: 
// <platform name="ios">
//     <!-- .... -->
//     <framework src="path/to/FRAMEWORK_NAME.framework" custom="true" embed="true" />
// </platform>
// For the OutSystems platform it is better to add this hook on both events. As so:
// <platform name="ios">
//     <!-- .... -->
//     <hook type="after_plugin_install" src="path/to/thishook/embed_framework_hook.js" />
//     <hook type="before_build" src="path/to/thishook/embed_framework_hook.js" />
// </platform>

module.exports = function (ctx) {

    // IMPORTANT!!
    // Replace the following var with the correct name of the .framework file to be embed
    var frameworkName = "TwilioVideo.framework"

    var fs = ctx.requireCordovaModule("fs");
    var path = ctx.requireCordovaModule("path");
    var xcode = ctx.requireCordovaModule("xcode");
    var deferral = ctx.requireCordovaModule('q').defer();

    /**
     * Recursively search for file with the tiven filter starting on startPath
     */
    function searchRecursiveFromPath(startPath, filter, rec, multiple) {
        if (!fs.existsSync(startPath)) {
            console.log("no dir ", startPath);
            return;
        }

        var files = fs.readdirSync(startPath);
        var resultFiles = []
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory() && rec) {
                fromDir(filename, filter); //recurse
            }

            if (filename.indexOf(filter) >= 0) {
                if (multiple) {
                    resultFiles.push(filename);
                } else {
                    return filename;
                }
            }
        }
        if (multiple) {
            return resultFiles;
        }
    }

    if (process.length >= 5 && process.argv[1].indexOf('cordova') == -1) {
        if (process.argv[4] != 'ios') {
            return; // plugin only meant to work for ios platform.
        }
    }

    var xcodeProjPath = searchRecursiveFromPath('platforms/ios', '.xcodeproj', false);
    var projectPath = xcodeProjPath + '/project.pbxproj';
    console.log("Found", projectPath);

    var proj = xcode.project(projectPath);
    proj.parseSync();


    var options = {};
    options['shellPath'] = '/bin/sh';
    options['shellScript'] = `APP_PATH="\${TARGET_BUILD_DIR}/\${WRAPPER_NAME}"
# This script loops through the frameworks embedded in the application and
# removes unused architectures.
find "$APP_PATH" -name \'*.framework\' -type d | while read -r FRAMEWORK
do
FRAMEWORK_EXECUTABLE_NAME=$(defaults read "$FRAMEWORK/Info.plist" CFBundleExecutable)
FRAMEWORK_EXECUTABLE_PATH="$FRAMEWORK/$FRAMEWORK_EXECUTABLE_NAME"
echo "Executable is $FRAMEWORK_EXECUTABLE_PATH"
EXTRACTED_ARCHS=()
for ARCH in $ARCHS
do
echo "Extracting $ARCH from $FRAMEWORK_EXECUTABLE_NAME"
lipo -extract "$ARCH" "$FRAMEWORK_EXECUTABLE_PATH" -o "$FRAMEWORK_EXECUTABLE_PATH-$ARCH"
EXTRACTED_ARCHS+=("$FRAMEWORK_EXECUTABLE_PATH-$ARCH")
done
echo "Merging extracted architectures: \${ARCHS}"
lipo -o "$FRAMEWORK_EXECUTABLE_PATH-merged" -create "\${EXTRACTED_ARCHS[@]}"
rm "\${EXTRACTED_ARCHS[@]}"
echo "Replacing original executable with thinned version"
rm "$FRAMEWORK_EXECUTABLE_PATH"
mv "$FRAMEWORK_EXECUTABLE_PATH-merged" "$FRAMEWORK_EXECUTABLE_PATH"
done`;

    // If the build phase doesn't exist, add it
    if (proj.pbxEmbedFrameworksBuildPhaseObj(proj.getFirstTarget().uuid) == undefined) {
        console.log("BuildPhase not found in XCode project. Adding PBXCopyFilesBuildPhase - TRIM Frameworks");
        proj.addBuildPhase([], 'PBXCopyFilesBuildPhase', "Trim Twilio framework", proj.getFirstTarget().uuid, options);
    }

    fs.writeFile(proj.filepath, proj.writeSync(), 'utf8', function (err) {
        if (err) {
            deferral.reject(err);
            return;
        }
        console.log("finished writing xcodeproj - Trim Twilio framework");
        deferral.resolve();
    });

    return deferral.promise;
};
