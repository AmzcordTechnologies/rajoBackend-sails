module.exports = {


  friendlyName: 'Calculate by age',


  description: '',


  inputs: {
    value: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function(inputs, exits) {
  var diff = inputs.value.split("-");

  console.log("diff");
  console.log(diff);

  return exits.success(diff);

  }


};
