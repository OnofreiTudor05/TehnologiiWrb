var baseOptions = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: 'Deal Size',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


const createPieChart1 = async () => {
    const response = await fetch('/pie1', { method: 'GET' });
    const data = await response.json();

    var chartData = data.map(function (obj) {
        return { value: obj['SALES'], name: obj['DEAL_SIZE'] };
    });

    const chart = echarts.init(document.getElementById('pieChart1'));

    let options = baseOptions;
    options.series[0].data = chartData;
    chart.setOption(options);
    window.addEventListener('resize', function () {
        chart.resize();
    });
};


const createPieChart2 = async () => {
    const response = await fetch('/pie2', { method: 'GET' });
    const data = await response.json();

    var chartData = data.map(function (obj) {
        return { value: obj['SALES'], name: obj['DEAL_SIZE'] };
    });

    const chart = echarts.init(document.getElementById('pieChart2'));

    let options = baseOptions;
    options.series[0].data = chartData;
    chart.setOption(options);
    window.addEventListener('resize', function () {
        chart.resize();
    });
};


createPieChart1();
createPieChart2();