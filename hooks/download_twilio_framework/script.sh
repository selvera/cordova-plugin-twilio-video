printf "\n** downloading twilio video framework **"
mkdir plugins/cordova-plugin-twilio-video/src/frameworks/
mkdir plugins/cordova-plugin-twilio-video/src/frameworks/twilio/
curl -L https://s3.amazonaws.com/ccr.mala/TwilioVideo.framework.zip --output plugins/cordova-plugin-twilio-video/src/frameworks/twilio/TwilioVideo.framework.zip
printf "\n** download completed **"
printf "\n** extracting **"
unzip plugins/cordova-plugin-twilio-video/src/frameworks/twilio/TwilioVideo.framework.zip -d plugins/cordova-plugin-twilio-video/src/frameworks/twilio/
mv plugins/cordova-plugin-twilio-video/src/frameworks/twilio/Build/iOS/TwilioVideo.framework plugins/cordova-plugin-twilio-video/src/frameworks/twilio/
printf "\n** extracting complete **"