exec = require('cordova/exec');
var conversations = {
  startPhoneCall: function(callTo,token,succ,fail) {
    exec(
      succ || function(){},
      fail || function(){},
      'VideoConversationPlugin',
      'startPhoneCall',
      [callTo,token]
    );
  }
};

module.exports = conversations;