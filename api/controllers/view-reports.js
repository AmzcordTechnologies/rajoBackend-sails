module.exports = {


  friendlyName: 'View reports',


  description: 'Display "Reports" page.',

  inputs: {
    fromDate: {
      type: 'string'
    },
    toTime: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
  },


  exits: {

    success: {
      viewTemplatePath: 'pages/reports'
    }

  },


  fn: async function(inputs, exits) {

    var maxBy = require('lodash.maxby');

    var filter = {}
    var groupByData = [];
    if (!_.isEmpty(inputs)) {
      var from = Date.parse(inputs.fromDate);
      var to = Date.parse(inputs.toTime);
      filter.createdAt = {
        '>=': from,
        '<=': to
      };
    }

    var data = await User.find(filter)

    if (inputs.type == 0) {
      var dataArr = [];

      groupByData =
        _.chain(data)
        // Group the elements of Array based on `type` property
        .groupBy("howDidYouHearAboutUs")
        // `key` is group's name (type), `value` is the array of objects
        .map((value, key) => ({

          type: key,
          value: value.length
        }))
        .value();

    } else if (inputs.type == 1) {

      // ByAge
      var data = await User.find(filter)
      var max = maxBy(data, function(o) {
        return o.age;
      });
      var maxAge = max.age
      var noOfCol = Math.round(maxAge / 10);
      var ageArr = [];

      console.log("noOfCol");
      console.log(noOfCol);

      var pre = 0;

      for (var i = 0; i < noOfCol; i++) {
        var number = i + 1 + "0";
        ageArr.push({
          name: i == 0 ? i + "-" + number : pre + "-" + number,
          value: 0
        })
        pre = number;
      }

      groupByData = ageArr;

    }

    console.log(groupByData);




    // Respond with view.
    return exits.success({
      chartData: groupByData,
      from: inputs.fromDate ? inputs.fromDate : '',
      to: inputs.toTime ? inputs.toTime : '',
      type: inputs.reportType,
      type: inputs.type ? inputs.type : 0,
      data: data ? data : []
    });
  }


};
