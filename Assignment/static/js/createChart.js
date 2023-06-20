const createCumulativePlot = async () => {
  const response = await fetch('/plot', { method: 'GET' });
  const data = await response.json();

  const xValues = data.map(item => item['MONTH']);
  const yValues = data.map(item => item['CUMULATIVE_SALES']); // CUMULATIVE_SALES
  const chart = echarts.init(document.getElementById('chart'));
  const option = {
    responsive: true,
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      }
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: { type: 'category', data: xValues, boundaryGap: false },
    yAxis: { type: 'value', boundaryGap: [0, '100%'] },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [{
      type: 'line',
      sampling: 'lttb',
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)'
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }
        ])
      },
      data: yValues
    }]

  };
  chart.setOption(option);
  window.addEventListener('resize', function () {
    chart.resize();
  });
};


createCumulativePlot();
