printf "\n** downloading twilio video framework **"
mkdir plugins/cordova-plugin-twilio-video/src/frameworks/
mkdir plugins/cordova-plugin-twilio-video/src/frameworks/twilio/
curl -L -s https://github.com/twilio/twilio-video-ios/releases/download/1.4.2/TwilioVideo.framework.zip --output plugins/cordova-plugin-twilio-video/src/frameworks/twilio/TwilioVideo.framework.zip
printf "\n** download completed **"
printf "\n** extracting **"
unzip src/frameworks/twilio/TwilioVideo.framework.zip -d src/frameworks/twilio/
mv src/frameworks/twilio/Build/iOS/TwilioVideo.framework src/frameworks/twilio/
printf "\n** extracting complete **"