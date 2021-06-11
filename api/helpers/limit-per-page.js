module.exports = {


  friendlyName: 'limit per page',


  description: '',


  inputs: {

    limit: {
      type: 'number'
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    // TODO

    // const DEFAULT_PER_PAGE = sails.config.custom.DEFAULT_PER_PAGE;

    let perPage = (typeof inputs.limit !== 'undefined' ? inputs.limit : sails.config.custom.DEFAULT_PER_PAGE);

    return exits.success(perPage);

  }
};
