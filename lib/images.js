Images = new FS.Collection("images", {
  filter: {
    maxSize: 1048576, // in bytes
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png', 'jpg', 'jpeg']
    },
    deny: {
      contentTypes: ['image/*'],
      extensions: ['bmp']
    },
    onInvalid: function (message) {
      if (Meteor.isClient) {
        alert(message);
      } else {
        console.log(message);
      }
    }
  }
});

if (Meteor.isServer) {
  Images.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    }
  });
}