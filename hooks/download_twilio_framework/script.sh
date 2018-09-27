printf "\n** downloading twilio video framework **"
mkdir plugins/cordova-plugin-twilio-video/src/frameworks/
mkdir plugins/cordova-plugin-twilio-video/src/frameworks/twilio/
curl -L https://github.com/twilio/twilio-video-ios/releases/download/1.4.2/TwilioVideo.framework.zip --output plugins/cordova-plugin-twilio-video/src/frameworks/twilio/TwilioVideo.framework.zip
printf "\n** download completed **"
printf "\n** extracting **"
unzip plugins/cordova-plugin-twilio-video/src/frameworks/twilio/TwilioVideo.framework.zip -d plugins/cordova-plugin-twilio-video/src/frameworks/twilio/
mv plugins/cordova-plugin-twilio-video/src/frameworks/twilio/Build/iOS/TwilioVideo.framework plugins/cordova-plugin-twilio-video/src/frameworks/twilio/
printf "\n** extracting complete **"
