module.exports = {


  friendlyName: 'View userslist',


  description: 'Display "Userslist" page.',

  inputs: {

    name: {
      description: 'Search Name',
      type: 'string'
    },

    page: {
      description: 'Page Number of the Pagenation',
      type: 'number'
    },

    limit: {
      description: 'Limit Records Per Page',
      type: 'number'
    },

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/userslist'
    }

  },


  fn: async function(inputs, exits) {

    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {

      delete this.req.session.itemList;

    }

    var formatedLimit = await sails.helpers.limitPerPage(inputs.limit);
    var formatedPage = await sails.helpers.parsePage(inputs.page);

    // VARIABLES
    var data = [];
    var numRecords = 0;
    var filter = {};

    // SET FILTER
    if (typeof this.req.session.itemList !== "undefined") {

      if (this.req.session.itemList.name && (typeof inputs.name === 'undefined')) {

        inputs.name = this.req.session.itemList.name;

      }

    }

    // SET FILTER VALUES
    Object.keys(inputs).forEach((name, i) => {

      var value = inputs[name];

      // NAME
      if (name == 'name' && value != '') {

        filter.fullName = {
          'contains': inputs.name
        };

      }

    });

    data = await User.find(filter).paginate(formatedPage, formatedLimit).meta({
      makeLikeModifierCaseInsensitive: true
    }).sort('createdAt DESC');

    // RECORDS
    numRecords = await User.count(filter);

    this.req.session.itemList = inputs;

    var pageCount = Math.ceil(numRecords / formatedLimit);


    return exits.success({
      data: data,
      pageCount: pageCount,
      page: formatedPage,
      limit: formatedLimit,
      filter: this.req.session.itemList ? this.req.session.itemList : {},
    });

  }



};
