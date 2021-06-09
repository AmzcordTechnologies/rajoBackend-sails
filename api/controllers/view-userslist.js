module.exports = {


  friendlyName: 'View userslist',


  description: 'Display "Userslist" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/userslist'
    }

  },


  fn: async function(inputs, exits) {

    var data = await User.find();

    // Respond with view.
    return exits.success({
      data: data,
    });

  }


};
