module.exports = {


  friendlyName: 'parse page',


  description: '',


  inputs: {

    page: {
      type: 'number'
    },

  },

  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {

    // const DEFAULT_PAGE = 0;
    let selectedpage = (typeof inputs.page !== 'undefined' ? inputs.page : sails.config.custom.DEFAULT_PAGE);

    return exits.success(selectedpage);

  }

};
