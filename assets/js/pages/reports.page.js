parasails.registerPage('reports', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    listView: '/reports',
    formData: {
      fromDate: '',
      toTime: '',
      reportType: '',
    }
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

    if (this.from != '' && this.to != '') {
      this.formData.fromDate = this.from;
      this.formData.toTime = this.to;
      this.formData.reportType = this.type;
    }

    //…
  },
  mounted: async function() {

    var dataArr = [];
    var chartType = "";
    dataArr[0] = ['Move', 'Percentage'];

    if (this.type == 0) {
      chartType = 'How Did You Here';


      if (this.chartData.length > 0) {
        for (var i = 0; i < this.chartData.length; i++) {
          dataArr.push([this.chartData[i].type, this.chartData[i].value])
        }
      }
    } else {

      chartType = 'By Age Group';


      for (var f = 0; f < this.chartData.length; f++) {
        var count = 0;

        var valuesInTwo = this.chartData[f].name.split("-");

        for (var c = 0; c < this.data.length; c++) {
          if (this.data[c].age && this.data[c].age >= valuesInTwo[0] && this.data[c].age < valuesInTwo[1]) {
            count = count + 1;
          }
        }

        dataArr.push([this.chartData[f].name, count])
      }

    }

    console.log(dataArr);

    google.charts.load('current', {
      'packages': ['bar']
    });
    google.charts.setOnLoadCallback(drawStuff);

    function drawStuff() {
      var data = new google.visualization.arrayToDataTable(dataArr);

      var options = {
        width: 600,
        legend: {
          position: 'none'
        },
        chart: {
          // title: 'Chess opening moves',
          // subtitle: 'popularity by percentage'
        },
        axes: {
          x: {
            0: {
              side: 'top',
              label: chartType
            } // Top x-axis.
          }
        },
        bar: {
          groupWidth: "80%"
        }
      };

      var chart = new google.charts.Bar(document.getElementById('top_x_div'));
      // Convert the Classic options to Material options.
      chart.draw(data, google.charts.Bar.convertOptions(options));
    };

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
