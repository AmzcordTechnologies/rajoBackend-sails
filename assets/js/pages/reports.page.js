parasails.registerPage('reports', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {


    //…
  },
  mounted: async function() {

    // google.charts.load('current', {
    //   'packages': ['bar']
    // });
    // google.charts.setOnLoadCallback(drawChart);
    // // this.drawChart();
    //
    // ar data = google.visualization.arrayToDataTable([]);
    //
    // var options = {
    //   chart: {
    //     title: 'Company Performance',
    //     subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    //   },
    //   bars: 'horizontal' // Required for Material Bar Charts.
    // };
    //
    // var chart = new google.charts.Bar(document.getElementById('barchart_material'));
    //
    // chart.draw(data, google.charts.Bar.convertOptions(options));


  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    drawChart: function() {

      var data = google.visualization.arrayToDataTable([]);

      var options = {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        },
        bars: 'horizontal' // Required for Material Bar Charts.
      };

      var chart = new google.charts.Bar(document.getElementById('barchart_material'));

      chart.draw(data, google.charts.Bar.convertOptions(options));

    }
    //…
  }
});
