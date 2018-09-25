exec = require('cordova/exec');
var conversations = {
  startPhoneCall: function(user, room,token,succ,fail) {
    exec(
      succ || function(){},
      fail || function(){},
      'VideoConversationPlugin',
      'startPhoneCall',
      [user, room, token]
    );
  },
  startVideoCall: function(user, room,token,succ,fail) {
    exec(
      succ || function(){},
      fail || function(){},
      'VideoConversationPlugin',
      'startVideoCall',
      [user, room, token]
    );
  }
};

module.exports = conversations;