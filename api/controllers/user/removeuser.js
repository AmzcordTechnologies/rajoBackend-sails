module.exports = {


  friendlyName: 'Removeuser',


  description: 'Removeuser user.',


  inputs: {

    selectedItems: {

      type: 'ref',
      required: true

    }

  },

  exits: {},


  fn: async function(inputs, exits) {

    var result = await User.destroy({
      id: {
        in: inputs.selectedItems
      }
    }).fetch();

    return exits.success({
      result: result
    });

  }


};
