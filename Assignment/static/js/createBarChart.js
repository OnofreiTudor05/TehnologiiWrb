const getDataByMonth = async () => {
    const response = await fetch('/bar1', { method: 'GET' });
    const jsonData = await response.json();

    const chart = echarts.init(document.getElementById('barchart'));

    const options = {
        responsive: true,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            show: true,
            itemSize: '30',
            feature: {
                myTool1: {
                    show: true,
                    title: 'By Year',
                    icon: 'path://"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312V4.002Z"',
                    onclick: function () {
                        getDataByYear();
                    }
                },
                myTool2: {
                    show: true,
                    title: 'By Month',
                    icon: 'path://"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z"',
                    onclick: function () {
                        getDataByMonth();
                    }
                },
            }
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };

    // Set the x-axis data
    options.xAxis.data = jsonData[Object.keys(jsonData)[0]].map(pair => pair[0]);

    // Iterate over the territories
    Object.entries(jsonData).forEach(([territory, pairs]) => {
        // Create a series for each territory
        var series = {
            name: territory,
            type: 'bar',
            data: pairs.map(pair => pair[1])
        };

        // Add the series to the options
        options.series.push(series);
        options.legend.data.push(territory);
    });

    // Set the chart options and render the chart
    chart.setOption(options);


    window.addEventListener('resize', function () {
        chart.resize();
    });
};

const getDataByYear = async () => {
    const response = await fetch('/bar2', { method: 'GET' });
    const jsonData = await response.json();

    const chart = echarts.init(document.getElementById('barchart'));

    const options = {
        responsive: true,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            show: true,
            itemSize: '30',
            feature: {
                myTool1: {
                    show: true,
                    title: 'By Year',
                    icon: 'path://"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002H7.971L6.072 5.385v1.271l1.834-1.318h.065V12h1.312V4.002Z"',
                    onclick: function () {
                        getDataByYear();
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                myTool2: {
                    show: true,
                    title: 'By Month',
                    icon: 'path://"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z"',
                    onclick: function () {
                        getDataByMonth();
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
            }
        },
        legend: {
            orient: 'horizontal',
            left: 'left',
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };

    // Set the x-axis data
    options.xAxis.data = jsonData[Object.keys(jsonData)[0]].map(pair => pair[0]);

    // Iterate over the territories
    Object.entries(jsonData).forEach(([territory, pairs]) => {
        // Create a series for each territory
        var series = {
            name: territory,
            type: 'bar',
            data: pairs.map(pair => pair[1])
        };

        // Add the series to the options
        options.series.push(series);
        options.legend.data.push(territory);
    });

    // Set the chart options and render the chart
    chart.setOption(options);


    window.addEventListener('resize', function () {
        chart.resize();
    });
};

getDataByMonth();