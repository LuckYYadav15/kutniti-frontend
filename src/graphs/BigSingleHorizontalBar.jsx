import React from 'react';
import ReactApexChart from 'react-apexcharts';


class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        series: [
            { name: 'Positive', data: [props.positiveValue], color: '#00f050' }, // Change the color here
            { name: 'Neutral', data: [props.neutralValue], color: '#fff000' }, 
            { name: 'Negative', data: [props.negativeValue], color: '#ff2b47' }, // Change the color here
 
          ],
      options: {
        grid: {
            show: false, // Hide the grid lines
          },
        chart: {
          type: 'bar',
          width: '25%',
          height: 50, // Set height as needed
          stacked: true,
          stackType: '100%',
          toolbar: {
            show: false, // Hide chart toolbar
          },
        },
        plotOptions: {
          bar: {
            offsetY: -5,
            horizontal: true,
            dataLabels: {
              position: 'center', // Display data labels in the center of bars
            },
          },
        },
        fill: {
          opacity: 1,
        },
        dataLabels: {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#fff'], // Data label color
          },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            opacity: 0.5,
          },
        },
        legend: {
          show: false, // Hide the legend
        },
        xaxis: {
          labels: {
            show: false, // Hide x-axis labels
          },
          axisBorder: {
            show: false, // Hide x-axis border
          },
        },
        yaxis: {
          labels: {
            show: false, // Hide y-axis labels
          },
          axisBorder: {
            show: false, // Hide y-axis border
          },
        },
      },
    };
  }

  render() {
    return (
        <div id="chart" style={{ width: '200%', marginTop: '-30px', marginBottom: '-20px' }}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={80}
        />
      </div>
    );
  }
}

export default ApexChart;
