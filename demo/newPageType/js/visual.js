//交通流量
var data = {
    id: 'multipleBarsLines',
    legendBar: ['高速公路', '城镇公路'],
    symbol: ' ', //数值是否带百分号        --默认为空 ''
    legendLine: ['环比', '同比'],
    xAxis: ['2014', '2015', '2016', '2017', '2018',
        '2019'
    ],
    yAxis: [
        [8, 10, 10, 11, 4, 13],
        [10, 7, 8, 8, 7, 9]
    ],
    lines: [
        [10, 10, 9, 11, 7, 4],
        [6, 12, 12, 2, 4, 4]
    ],
    barColor: ['#009883', '#e66922'], //柱子颜色 必填参数
    lineColor: ['#fd6665', '#fba73b'], // 折线颜色

}

var myData = (function test() {
    let yAxis = data.yAxis || []
    let lines = data.lines || []
    let legendBar = data.legendBar || []
    let legendLine = data.legendLine || []
    var symbol = data.symbol || ' '
    let seriesArr = []
    let legendArr = []
    yAxis && yAxis.forEach((item, index) => {
        legendArr.push({
            name: legendBar && legendBar.length > 0 && legendBar[index]
        })
        seriesArr.push({
            name: legendBar && legendBar.length > 0 && legendBar[index],
            type: 'bar',
            barGap: '0.5px',
            data: item,
            barWidth: data.barWidth || 12,
            label: {
                normal: {
                    show: false,
                    formatter: '{c}' + symbol,
                    position: 'top',
                    textStyle: {
                        color: '#000',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        textAlign: 'left',
                        fontSize: 11,
                    },
                },
            },
            itemStyle: { //图形样式
                normal: {
                    barBorderRadius:0,
                    borderWidth:1,
                    borderColor:'#ddd',
                    color: data.barColor[index]
                },
            }
        })
    })

    lines && lines.forEach((item, index) => {
        legendArr.push({
            name: legendLine && legendLine.length > 0 && legendLine[index]
        })
        seriesArr.push({
            name: legendLine && legendLine.length > 0 && legendLine[index],
            type: 'line',
            data: item,
            itemStyle: {
                normal: {
                    color: data.lineColor[index],
                    lineStyle: {
                        width: 2,//折线宽度
                        type: 'solid',
                    }
                }
            },
            label: {
                normal: {
                    show: false, //折线上方label控制显示隐藏
                    position: 'top',
                }
            },
            symbol: 'circle',
            symbolSize: 5
        })
    })

    return {
        seriesArr,
        legendArr
    }
})()
option1 = {
    title: {
        show: true,
        text: data.title,
        subtext: data.subTitle,
        link: '1111'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            var time = '';
            var str = '';
            for (var i of params) {
                time = i.name.replace(/\n/g, '') + '<br/>';
                if (i.data == 'null' || i.data == null) {
                    str += i.seriesName + '：无数据' + '<br/>'
                } else {
                    str += i.seriesName + '：' + i.data + symbol + '%<br/>'
                }

            }
            return time + str;
        },
        axisPointer: {
            type: 'none'
        },
    },
    legend: {
        right: data.legendRight || '30%',
        top: 0,
        right:10,
        itemGap: 16,
        itemWidth: 10,
        itemHeight: 10,
        data: myData.legendArr,
        textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12,
        }
    },
    grid: {
        x: 0,
        y: 30,
        x2: 0,
        y2: 25,
    },
    xAxis: {
        type: 'category',
        data: data.xAxis,
        axisTick: {
            show: false,
        },

        axisLine: {
            show: false,
        },
        axisLabel: {       //轴标
            show: true,
            interval: '0',
            textStyle: {
                lineHeight:5,
                padding: [2, 2, 0, 2],
                height: 50,
                fontSize: 12,
                color:'#fff',
            },
            rich: {
                Sunny: {
                    height: 50,
                    // width: 60,
                    padding: [0, 5, 0, 5],
                    align: 'center',
                },
            },
            formatter: function(params, index) {
                var newParamsName = "";
                var splitNumber = 5;
                var paramsNameNumber = params && params.length;
                if (paramsNameNumber && paramsNameNumber <= 4) {
                    splitNumber = 4;
                } else if (paramsNameNumber >= 5 && paramsNameNumber <= 7) {
                    splitNumber = 4;
                } else if (paramsNameNumber >= 8 && paramsNameNumber <= 9) {
                    splitNumber = 5;
                } else if (paramsNameNumber >= 10 && paramsNameNumber <= 14) {
                    splitNumber = 5;
                } else {
                    params = params && params.slice(0, 15);
                }

                var provideNumber = splitNumber; //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0;
                if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                        var tempStr = "";
                        var start = p * provideNumber;
                        var end = start + provideNumber;
                        if (p == rowNumber - 1) {
                            tempStr = params.substring(start, paramsNameNumber);
                        } else {
                            tempStr = params.substring(start, end) + "\n";
                        }
                        newParamsName += tempStr;
                    }

                } else {
                    newParamsName = params;
                }
                params = newParamsName
                return '{Sunny|' + params + '}';
            },
            color: '#687284',
        },

    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#F1F3F5',
                type: 'solid'
            },
            interval: 2
        },
        splitNumber: 4,
    },
    series: myData.seriesArr
}
//////////////////////交通流量 end

//交通工具流量
var cost = [0.5, 0.201, 0.6,0.7, 0.301]//本期比上期（大于1按1处理）
var dataCost = [10.01,200,200,1000.01,200000]//真是的金额
var totalCost = [ 1,1, 1, 1,1]//比例综合
var visits = [24, 76, 89,92, 22, ]//本期占总的百分比*100
var grade = ['示范区','工业区','示范区','魏都区','建安区', ]
var myColor = ['#21BF57','#56D0E3',  '#1089E7', '#F8B448','#F57474', ];
var option2data = {
    grade: grade,
    cost: cost,
    totalCost: totalCost,
    visits: visits,
    dataCost:dataCost
};
option2 = {
    // backgroundColor: '#05274C',
    title: {
        // top: '2%',
        left: 'center',
        // text: '民用月隐患统计',
        textStyle: {
            align: 'center',
            color: '#4DCEF8',
            fontSize: 18
        }
    },
    grid: {
        top:-5,
        bottom:5,
        left: '110',
        right: '90'
    },
    xAxis: {
        show: false,
    },
    yAxis: {
        type: 'category',
        axisLabel: {
            margin:30,
            show: true,
            color: '#4DCEF8',
            fontSize: 14
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        data: option2data.grade
    },
    series: [{
        type: 'bar',
        barGap: '-65%',
        label: {
            normal: {
                show: true,
                position: 'right',
                padding: [0, 0, 0, 20],
                color: '#fff',
                fontSize: 14,
                formatter:
                    function(param) {
                        return option2data.visits[param.dataIndex] ;
                        // return option2data.visits[param.dataIndex] +'%';
                    },
            }
        },
        barWidth: '30%',
        itemStyle: {
            normal: {
                borderColor: '#4DCEF8',
                borderWidth: 2,
                barBorderRadius: 15,
                color: 'rgba(102, 102, 102,0)'
            },
        },
        z: 1,
        data: option2data.totalCost,
        // data: da
    }, {
        type: 'bar',
        barGap: '-85%',
        barWidth: '21%',
        itemStyle: {
            normal: {
                barBorderRadius: 16,
                color: function(params) {
                    var num = myColor.length;
                    return myColor[params.dataIndex % num]
                },
            }
        },
        max: 1,
        label: {
            normal: {
                show: false,
                position: 'inside',
                formatter: '{c}%'
            }
        },
        labelLine: {
            show: true,
        },
        z: 2,
        data: option2data.cost,
    }]
}

//////////////////////交通工具流量 end
//当月优良天数总和
var placeHolderStyle = {
    normal: {
        color: 'rgba(124,228,245,0.2)',
    },
};
option13 = {
    // backgroundColor:'rgba(2, 120, 200, 1)',
    title: {
        text: '销量对比',
        textStyle: {
            fontWeight: 'bold',
            fontSize: 14,
            color: '#0ab7ff'
        },
        left: '5%',
        top: '25'
    },
    tooltip: {
        show: true,
        formatter: "{a}：{d}%"
    },
    legend: {
        orient: '',
        itemGap: 12,
        left:'5%',
        top:'center',
        textStyle: {
            color: "#fff",
        },
        data: ['销量1', '销量2', '销量3']
    },

    series: [{
        name: '销量3',
        type: 'pie',
        hoverAnimation: false, //鼠标移入变大
        clockWise: false,
        radius: ['55%', '60%'],
        itemStyle: {
            normal: {
                color: '#4cabfe',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        data: [{
            value:50,
            name: 'invisible',
            itemStyle: placeHolderStyle
        },
            {
                value:50,
                name: '销量3'
            }

        ],

    },
        {
            name: '销量2',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false, //鼠标移入变大
            radius: ['45%', '50%'],
            itemStyle: {
                normal: {
                    color: '#ffaf00',
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },

            data: [{
                value: 60,
                name: 'invisible',
                itemStyle: placeHolderStyle
            },
                {
                    value: 40,
                    name: '销量2'
                }
            ]
        },
        {
            name: '销量1',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false, //鼠标移入变大
            radius: ['35%', '40%'],
            itemStyle: {
                normal: {
                    color: '#01ebb9',
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },

            data: [{
                value: 70,
                name: 'invisible',
                itemStyle: placeHolderStyle
            },
                {
                    value: 30,
                    name: '销量1'
                }
            ]
        }

    ]
};

//天气预报折线图
option22 = {
    // backgroundColor: '#080b30',
    // title: {
    //     show: false,
    //     text: '多线图',
    //     textStyle: {
    //         align: 'center',
    //         color: '#fff',
    //         fontSize: 20,
    //     },
    //     top: '8%',
    //     left: 'center',
    // },

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    // colorStops: [{
                    //     offset: 0,
                    //     color: 'rgba(0, 255, 233,0)'
                    // }, {
                    //     offset: 0.5,
                    //     color: 'rgba(255, 255, 255,1)',
                    // }, {
                    //     offset: 1,
                    //     color: 'rgba(0, 255, 233,0)'
                    // }],
                    global: false
                }
            },
        },
    },
    grid: {
        top: '25%',
        left: '5%',
        right: '5%',
        bottom: '8%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        axisLine: {
            show: true
        },
        splitArea: {
            // show: true,
            color: '#f00',
            lineStyle: {
                color: '#f00'
            },
        },
        axisLabel: {
            color: '#fff'
        },
        splitLine: {
            show: false,

        },
        boundaryGap: false,
        data: [1,2,3,4,5,6],

    }],

    yAxis: [{
        type: 'value',
        min: 0,
        // max: 140,
        splitNumber: 4,
        splitLine: {
            show: false,
            lineStyle: {
                color: ['#fff'],
                opacity: 0.06
            }
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: false,
            margin: 10,
            textStyle: {
                fontSize: 10,
                color: 'rgba(255,255,255,0.5)'
            }
        },
        axisTick: {
            show: false,
        },
    }],
    series: [{
        name: '注册总量',
        type: 'line',
        smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
            normal: {
                color: "#5CDBE5",
                // shadowColor: 'rgba(0, 0, 0, 0)',
                // shadowBlur: 0,
                // shadowOffsetY: 5,
                // shadowOffsetX: 5,
            },
        },
        label: {
            show: true,
            formatter: '{@data}℃',
            position: 'top',
            textStyle: {
                color: 'rgb(218 255 232)',
                fontSize: 10
            }
        },
        itemStyle: {
            color: "#5CDBE5",
            // borderColor: "rgb(108,78,0)",
            // borderWidth: 5,
            // shadowColor: 'rgba(0, 0, 0, 0)',
            // shadowBlur: 0,
            // shadowOffsetY: 2,
            // shadowOffsetX: 2,
        },
        tooltip: {
            show: false
        },
        // areaStyle: {
        //   color: {
        //     type: 'linear',
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 1,
        //     // colorStops: [
        //     //   {
        //     //     offset: 0,
        //     //     color: 'rgba(255,188,13, 0.4)'
        //     //   },
        //     //   {
        //     //     offset: 1,
        //     //     color: 'rgba(255,188,13, 0)'
        //     //   }
        //     // ],
        //     global: false // 缺省为 false
        //   }
        // },
        data: [20, 25, 33, 28, 19, 21, ]
    }
    ]
};
//本月发生事件1
var color = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131'];
var data = [{
        "name": "超速",
        "value": 30
    },
    {
        "name": "闯红灯",
        "value": 30
    },
    {
        "name": "闯禁行",
        "value": 42
    },
    {
        "name": "违停",
        "value": 50
    },
    {
        "name": "逆行",
        "value": 34
    }
];

var max = data[0].value;
data.forEach(function(d) {
    max = d.value > max ? d.value : max;
});

var renderData = [{
    value: [],
    name: "告警类型TOP5",
    symbol: 'none',
    lineStyle: {
        normal: {
            color: '#ecc03e',
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
                [{
                    offset: 0,
                    color: 'rgba(203, 158, 24, 0.8)'
                }, {
                    offset: 1,
                    color: 'rgba(190, 96, 20, 0.8)'
                }],
                false)
        }
    }
}];


data.forEach(function(d, i) {
    var value = ['', '', '', '', ''];
    value[i] = max,
    renderData[0].value[i] = d.value;
    renderData.push({
        value: value,
        symbol: 'circle',
        symbolSize: 12,
        lineStyle: {
            normal: {
                color: 'transparent'
            }
        },
        itemStyle: {
            normal: {
                color: color[i],
            }
        }
    })
})
var indicator = [];

data.forEach(function(d) {
    indicator.push({
        name: d.name,
        max: max,
        color: '#fff'
    })
})


const colorList = ['#02d6fc', '#367bec', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF']
option3 = {
    // backgroundColor: '#fff',
    title: [{
        text: '魏都区',
        x: '9%',
        y: '26%',
        textStyle: {
            fontSize: 14,
            fontFamily: "Microsoft YaHei",
            color: '#8CF1F4'
        }
    }, {
        text: '东城区',
        x: '39%',
        y: '26%',
        textStyle: {
            fontSize: 14,
            color: '#8CF1F4'
        }
    }, {
        text: '建安区',
        x: '69%',
        y: '26%',
        textStyle: {
            fontSize: 14,
            color: '#8CF1F4'
        }
    }, {
        text: '芙蓉广场',
        x: '38%',
        y: '70%',
        textStyle: {
            fontSize: 14,
            color: '#8CF1F4'
        }
    }, {
        text: '许昌学院',
        x: '7%',
        y: '70%',
        textStyle: {
            fontSize: 14,
            color: '#8CF1F4'
        }
    }, {
        text: '兴业大厦',
        x: '68%',
        y: '70%',
        textStyle: {
            fontSize: 14,
            color: '#8CF1F4'
        }
    }],
    tooltip: {
        trigger: 'item'
    },
    legend: {
        left: '0',
        //   y:'center',
        //   orient:'vertical',
        textStyle:{
            fontSize: 14,
            color: '#8CF1F4'
        },
        data: [
            "AQI",
            "SO",
            "NO",
            "PM2.5"
        ]
    },
    series: [
        {
            name: '魏都区',
            type: 'pie',
            center: ['15%', '32%'],
            radius: ['30%','35%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 7,
            itemStyle: {
                normal: {
                    label: {
                        show: false   //隐藏文字
                    },
                    labelLine: {
                        show: false   //隐藏指示线
                    },
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            /*    label: {
                    show: true,
                    position: 'outside',
                    formatter: '{a|{b}：{d}%}\n{hr|}',
                    rich: {
                        hr: {
                            backgroundColor: 't',
                            borderRadius: 3,
                            width: 3,
                            height: 3,
                            padding: [3, 3, 0, -12]
                        },
                        a: {
                            fontSize: 16,
                            color: '#000',
                            padding: [-30, 15, -20, 15]
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        length2: 30,
                        lineStyle: {
                            width: 1
                        }
                    }
                },*/
            data: [{
                name: 'AQI',
                value: 36
            },
                {
                    name: 'SO',
                    value: 10
                },
                {
                    name: 'NO',
                    value: 16
                },
                {
                    name: 'PM2.5',
                    value: 75
                }
            ]
        }, {
            name: '东城区',
            type: 'pie',
            center: ['45%', '32%'],
            radius: ['30%','35%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 7,
            itemStyle: {
                normal: {
                    label: {
                        show: false   //隐藏文字
                    },
                    labelLine: {
                        show: false   //隐藏指示线
                    },
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    hr: {
                        backgroundColor: 't',
                        borderRadius: 3,
                        width: 3,
                        height: 3,
                        padding: [3, 3, 0, -12]
                    },
                    a: {
                        fontSize: 16,
                        color: '#000',
                        padding: [-30, 15, -20, 15]
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    length2: 30,
                    lineStyle: {
                        width: 1
                    }
                }
            },
            data: [{
                name: 'AQI',
                value: 66
            },
                {
                    name: 'SO',
                    value: 10
                },
                {
                    name: 'NO',
                    value: 16
                },
                {
                    name: 'PM2.5',
                    value: 75
                }
            ]
        }, {
            name: '建安区',
            type: 'pie',
            center: ['75%', '32%'],
            radius: ['30%','35%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 7,
            itemStyle: {
                normal: {
                    label: {
                        show: false   //隐藏文字
                    },
                    labelLine: {
                        show: false   //隐藏指示线
                    },
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    hr: {
                        backgroundColor: 't',
                        borderRadius: 3,
                        width: 3,
                        height: 3,
                        padding: [3, 3, 0, -12]
                    },
                    a: {
                        fontSize: 16,
                        color: '#000',
                        padding: [-30, 15, -20, 15]
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    length2: 30,
                    lineStyle: {
                        width: 1
                    }
                }
            },
            data: [{
                name: 'AQI',
                value: 66
            },
                {
                    name: 'SO',
                    value: 10
                },
                {
                    name: 'NO',
                    value: 16
                },
                {
                    name: 'PM2.5',
                    value: 75
                }
            ]
        }, {
            name: '许昌学院',
            type: 'pie',
            center: ['15%', '75%'],
            radius: ['30%','35%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 7,
            itemStyle: {
                normal: {
                    label: {
                        show: false   //隐藏文字
                    },
                    labelLine: {
                        show: false   //隐藏指示线
                    },
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    hr: {
                        backgroundColor: 't',
                        borderRadius: 3,
                        width: 3,
                        height: 3,
                        padding: [3, 3, 0, -12]
                    },
                    a: {
                        fontSize: 16,
                        color: '#000',
                        padding: [-30, 15, -20, 15]
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    length2: 30,
                    lineStyle: {
                        width: 1
                    }
                }
            },
            data: [{
                name: 'AQI',
                value: 66
            },
                {
                    name: 'SO',
                    value: 10
                },
                {
                    name: 'NO',
                    value: 16
                },
                {
                    name: 'PM2.5',
                    value: 75
                }
            ]
        }, {
            name: '芙蓉广场',
            type: 'pie',
            center: ['45%', '75%'],
            radius: ['30%','35%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 7,
            itemStyle: {
                normal: {
                    label: {
                        show: false   //隐藏文字
                    },
                    labelLine: {
                        show: false   //隐藏指示线
                    },
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    hr: {
                        backgroundColor: 't',
                        borderRadius: 3,
                        width: 3,
                        height: 3,
                        padding: [3, 3, 0, -12]
                    },
                    a: {
                        fontSize: 16,
                        color: '#000',
                        padding: [-30, 15, -20, 15]
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    length2: 30,
                    lineStyle: {
                        width: 1
                    }
                }
            },
            data: [{
                name: 'AQI',
                value: 66
            },
                {
                    name: 'SO',
                    value: 10
                },
                {
                    name: 'NO',
                    value: 16
                },
                {
                    name: 'PM2.5',
                    value: 75
                }
            ]
        }, {
            name: '兴业大厦',
            type: 'pie',
            center: ['75%', '75%'],
            radius: ['30%','35%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 7,
            itemStyle: {
                normal: {
                    label: {
                        show: false   //隐藏文字
                    },
                    labelLine: {
                        show: false   //隐藏指示线
                    },
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                show: true,
                position: 'outside',
                formatter: '{a|{b}：{d}%}\n{hr|}',
                rich: {
                    hr: {
                        backgroundColor: 't',
                        borderRadius: 3,
                        width: 3,
                        height: 3,
                        padding: [3, 3, 0, -12]
                    },
                    a: {
                        fontSize: 16,
                        color: '#000',
                        padding: [-30, 15, -20, 15]
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    length2: 30,
                    lineStyle: {
                        width: 1
                    }
                }
            },
            data: [{
                name: 'AQI',
                value: 66
            },
                {
                    name: 'SO',
                    value: 10
                },
                {
                    name: 'NO',
                    value: 16
                },
                {
                    name: 'PM2.5',
                    value: 75
                }
            ]
        }]
}
//////////////////////本月发生事件1 end
//本月发生事件2
var color = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131'];
var data = [{
        "name": "超速",
        "value": 15
    },
    {
        "name": "闯红灯",
        "value": 14
    },
    {
        "name": "闯禁行",
        "value": 23
    },
    {
        "name": "违停",
        "value": 2
    },
    {
        "name": "逆行",
        "value": 50
    }
];

var max = data[0].value;
data.forEach(function(d) {
    max = d.value > max ? d.value : max;
});

var renderData = [{
    value: [],
    name: "告警类型TOP5",
    symbol: 'none',
    lineStyle: {
        normal: {
            color: '#ecc03e',
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
                [{
                    offset: 0,
                    color: 'rgba(203, 158, 24, 0.8)'
                }, {
                    offset: 1,
                    color: 'rgba(190, 96, 20, 0.8)'
                }],
                false)
        }
    }
}];


data.forEach(function(d, i) {
    var value = ['', '', '', '', ''];
    value[i] = max,
    renderData[0].value[i] = d.value;
    renderData.push({
        value: value,
        symbol: 'circle',
        symbolSize: 12,
        lineStyle: {
            normal: {
                color: 'transparent'
            }
        },
        itemStyle: {
            normal: {
                color: color[i],
            }
        }
    })
})
var indicator = [];

data.forEach(function(d) {
    indicator.push({
        name: d.name,
        max: max,
        color: '#fff'
    })
})

//本市AQI统计

const machine = [];
for (let i = 65; i < 96; i++) {
    machine.push( String.fromCharCode(i))
}
const xData = machine.slice();
const yData = [];
for(let i = 0;i<12;i++){
    yData.push(i)
}
const rowData = [];

machine.forEach(function(item, index) {
    const current = item;
    yData.forEach(function(item, index) {
        rowData.push({
            target: item,
            source: current,
            value: Math.floor(Math.random() * 150),
        })
    })
})

const seriesData = rowData.map(function(item) {
    return [item.source, item.target, item.value]
})
optionBottom2 = {
    /*title: {
        text: '平面图',
        subtext: '展示各机器间的网络情况',
        left: 'center'
    },
    toolbox: {
        feature: {
            saveAsImage: {},
            dataZoom: {}
        }
    },*/
    grid:{
        x:20,
        y:28,
        x2:5,
        y2:35,
        // borderWidth:1
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        },
        formatter: function(params) {
            var value = params.value
            var source = value[0]
            var target = value[1]
            var status = value[2]
            return [source + ':' + status
            ].join('<br/>')
        }
    },
    xAxis: {
        type: 'category',
        data: xData,
        // axisLabel: {
        //     interval: 'auto',
        //     rotate: 30
        // },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        data: yData,
        axisLabel: {
            interval: 'auto',
            rotate: 0
        },
        axisTick: {
            show: false
        }
    },
    series: {
        type: 'heatmap',
        data: seriesData,
        label:{
            // show:true
        },
        // itemStyle: {
        //     emphasis: {
        //         shadowBlur: 10,
        //         shadowColor: 'rgba(0, 0, 0, 0.5)'
        //     },
        //     borderWidth: 1,
        //     borderColor: '#fff'
        // }
    },
    visualMap: {
        show: true,
        right: '0',
        top:'0',
        // bottom: '50',
        orient: 'horizontal',
        pieces: [{
            gt: 100,
            color: 'rgba(237, 89, 76, 1)',
            label: '拥堵'
        },{
            lt: 100,
            color: 'rgba(214, 170, 77, 1)',
            label: '缓行',
        },
            {
                lt: 50,
                color: 'rgba(39, 246, 177, 1)',
                label: '畅通'
            },
        ]
    }
};
//////////////////////本月发生事件2 end



//收费站收费排行1
var spirit = '../images.ksh45.png';

var maxData = 200;

option4 = {
   "title": {
      "text": " ",
      "left": "center",
      "y": "10",
      "textStyle": {
        "color": "#fff"
      }
    },

    "grid": {
      "left": 30,
      "top": 0,
      "bottom": 10
    },
    "tooltip": {
      "trigger": "item",
      "textStyle": {
        "fontSize": 12
      },
      "formatter": "{b0}:{c0}"
    },
    "xAxis": {
      "max": 100,
      "splitLine": {
        "show": false
      },
      "axisLine": {
        "show": false
      },
      "axisLabel": {
        "show": false
      },
      "axisTick": {
        "show": false
      }
    },
    "yAxis": [
      {
        "type": "category",
        "inverse": false,
        "data": [
          "晋城",
          "太旧",
          "太原",
          "吕梁",
          "长治",
        ],
        "axisLine": {
          "show": false
        },
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "margin": -4,
          "textStyle": {
            "color": "#fff",
            "fontSize": 16.25
          }
        }
      },

    ],
    "series": [
      {
        "type": "pictorialBar",
        "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
        "symbolRepeat": "fixed",
        "symbolMargin": "5%",
        "symbolClip": true,
        "symbolSize": 22.5,
        "symbolPosition": "start",
        "symbolOffset": [
          20,
          0
        ],
        "symbolBoundingData": 300,
        "data": [
          13,
          42,
          67,
          81,
          86,

        ],
        "z": 10
      },
      {
        "type": "pictorialBar",
        "itemStyle": {
          "normal": {
            "opacity": 0.3
          }
        },
        "label": {
          "normal": {
            "show": false
          }
        },
        "animationDuration": 0,
        "symbolRepeat": "fixed",
        "symbolMargin": "5%",
        "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
        "symbolSize": 22.5,
        "symbolBoundingData": 300,
        "symbolPosition": "start",
        "symbolOffset": [
          20,
          0
        ],
        "data": [
          13,
          42,
          67,
          81,
          86,

        ],
        "z": 5
      }
    ]
};


// Make dynamic data.
/*function random() {
    return +(Math.random() * (maxData - 10)).toFixed(1);
}
setInterval(function () {
    var dynamicData = [random(), random(), random(), random(),random(), random(), random(), random(),random(),random()];
    myChart.setOption({
        series: [{
            data: dynamicData.slice()
        }, {
            data: dynamicData.slice()
        }]
    })
}, 3000)*/
//////////////////////收费站收费排行2 end

//收费站收费排行2
var spirit = '../images.ksh45.png';

var maxData = 200;
var data41 = [
    {
        value: 100,
        name: '未执行',
    },
    {
        value: 100,
        name: '已执行',
    },
    {
        value: 90,
        name: '执行中',
    },
],
    option41 = {
        backgroundColor: '#022457',
        color: ['#1fe5ea', '#1daeff', '#f4e051'],
        legend: {
            x:'300px',
            y:'100px',
            // top: '10%',
            // left: 50,
            // right: '1%',
            // bottom: 10,
            // width: 1700,
            icon: 'circle',
            // orient: 'vertical',
            itemGap: 30,
            formatter: (name) => {
                const item = data41.filter((item) => item.name === name)[0];
                if (name === '未执行') {
                    option41.legend.textStyle.rich.value.color = '#1fe5ea';
                    return '{title|' + name + '}\n{value|' + item.value + '}{title|条}';
                }
                if (name === '已执行') {
                    option41.legend.textStyle.rich.value.color = '#1fe5ea';
                    return '{title|' + name + '}\n{value1|' + item.value + '}{title|条}';
                }
                if (name === '执行中') {
                    option41.legend.textStyle.rich.value.color = '#1fe5ea';
                    return '{title|' + name + '}\n{value2|' + item.value + '}{title|条}';
                }
            },
            textStyle: {
                rich: {
                    title: {
                        color: '#fff',
                        fontSize: 20,
                        padding:[3,0]
                    },
                    value: {
                        fontSize: 22,
                        lineHeight: 20,
                        color: '#1fe5ea',
                    },
                    value1: {
                        fontSize: 22,
                        lineHeight: 20,
                        color: '#1daeff',
                    },
                    value2: {
                        fontSize: 22,
                        lineHeight: 20,
                        color: '#f4e051',
                    },
                },
            },
            data: data41,
        },
        title: [
            {
                text: 290,
                subtext: '计划总数',
                top: '42%',
                left: '49%',
                textAlign: 'center',
                itemGap: 30,
                subtextStyle: {
                    color: '#fff',
                    fontSize: 42,
                    align: 'center',
                },
                textStyle: {
                    color: '#f4e051',
                    fontSize: 44,
                },
            },
        ],
        series: [
            //环形
            {
                name: '基础饼图',
                type: 'pie',
                radius: ['45%', '52%'],
                center: ['50%', '50%'],
                hoverAnimation: false,
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                    },
                },
                zlevel: 1,
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: data41,
            },
            //环形分割线
            {
                name: '分割线',
                type: 'gauge',
                radius: '55%',
                clockwise: true,
                startAngle: '90',
                center: ['50%', '50%'],
                endAngle: '-269.9999',
                splitNumber: 22,
                zlevel: 2,
                detail: {
                    offsetCenter: [10, 20],
                    formatter: ' ',
                },
                axisLine: {
                    lineStyle: {
                        width: 0,
                        opacity: 0,
                    },
                },
                axisTick: {
                    show: false,
                },
                markArea: {
                    itemStyle: {
                        color: '#0f0',
                    },
                },
                splitLine: {
                    show: true,
                    length: 32,
                    padding: [0, 0, 0],
                    lineStyle: {
                        color: '#022457',
                        width: 3,
                    },
                },
                axisLabel: {
                    show: false,
                },
            },
            {
                type: 'pie',
                name: '内层细圆环',
                radius: ['40%', '41%'],
                center: ['50%', '50%'],
                hoverAnimation: false,
                clockWise: false,
                itemStyle: {
                    normal: {
                        color: '#fff',
                    },
                },
                label: {
                    show: false,
                },
                data: [100],
            },
        ],
    };

option4141 = {
   "title": {
      "text": " ",
      "left": "center",
      "y": "10",
      "textStyle": {
        "color": "#fff"
      }
    },

    "grid": {
      "left": 30,
      "top": 0,
      "bottom": 10
    },
    "tooltip": {
      "trigger": "item",
      "textStyle": {
        "fontSize": 12
      },
      "formatter": "{b0}:{c0}"
    },
    "xAxis": {
      "max": 100,
      "splitLine": {
        "show": false
      },
      "axisLine": {
        "show": false
      },
      "axisLabel": {
        "show": false
      },
      "axisTick": {
        "show": false
      }
    },
    "yAxis": [
      {
        "type": "category",
        "inverse": false,
        "data": [
          "朔州",
          "大同",
          "运城222",
          "忻州",
          "临1",
        ],
        "axisLine": {
          "show": false
        },
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "margin": -4,
          "textStyle": {
            "color": "#fff",
            "fontSize": 16.25
          }
        }
      },

    ],
    "series": [
      {
        "type": "pictorialBar",
        "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
        "symbolRepeat": "fixed",
        "symbolMargin": "5%",
        "symbolClip": true,
        "symbolSize": 22.5,
        "symbolPosition": "start",
        "symbolOffset": [
          20,
          0
        ],
        "symbolBoundingData": 300,
        "data": [
          51,
          32,
          82,
          42,
          81,

        ],
        "z": 10
      },
      {
        "type": "pictorialBar",
        "itemStyle": {
          "normal": {
            "opacity": 0.3
          }
        },
        "label": {
          "normal": {
            "show": false
          }
        },
        "animationDuration": 0,
        "symbolRepeat": "fixed",
        "symbolMargin": "5%",
        "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
        "symbolSize": 22.5,
        "symbolBoundingData": 300,
        "symbolPosition": "start",
        "symbolOffset": [
          20,
          0
        ],
        "data": [
          51,
          32,
          82,
          42,
          81,

        ],
        "z": 5
      }
    ]
};


// Make dynamic data.
/*function random() {
    return +(Math.random() * (maxData - 10)).toFixed(1);
}
setInterval(function () {
    var dynamicData = [random(), random(), random(), random(),random(), random(), random(), random(),random(),random()];
    myChart.setOption({
        series: [{
            data: dynamicData.slice()
        }, {
            data: dynamicData.slice()
        }]
    })
}, 3000)*/
//////////////////////收费站收费排行2 end

//今日实时收费

var shadowColor = '#374b86';
var value = 80;
option5 = {

    title: {
        //text: `${value}万辆`,
        text: `车辆总数`,
        subtext: '',
        left: 'center',
        top: 'center',//top待调整
        textStyle: {
            color: '#fff',
            fontSize: 16,
            fontFamily: 'PingFangSC-Regular'
        },
        subtextStyle: {
            color: '#ff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular',
            top: 'center'
        },
        itemGap: -1//主副标题间距
    },

    series: [{
        name: 'pie1',
        type: 'pie',
        clockWise: true,
        radius: ['65%', '70%'],
        itemStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        hoverAnimation: false,
        data: [{
            value: value,
            name: 'completed',
            itemStyle: {
                normal: {
                    borderWidth: 8,
                    borderColor: {
                        colorStops: [{
                            offset: 0,
                            color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#68eaf9' || '#367bec' // 100% 处的颜色
                        }]
                    },
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#68eaf9' || '#367bec' // 100% 处的颜色
                        }]
                    },
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            }
        }, {
            name: 'gap',
            value: 100 - value,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            }
        }]
    }]
}

var shadowColor = '#374b86';
var value = 85;
option6 = {

    title: {
        //text: `${value}万辆`,
        text: `今日上线`,
        subtext: '',
        left: 'center',
        top: 'center',//top待调整
        textStyle: {
            color: '#fff',
            fontSize: 16,
            fontFamily: 'PingFangSC-Regular'
        },
        subtextStyle: {
            color: '#ff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular',
            top: 'center'
        },
        itemGap: -1//主副标题间距
    },

    series: [{
        name: 'pie1',
        type: 'pie',
        clockWise: true,
        radius: ['65%', '70%'],
        itemStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        hoverAnimation: false,
        data: [{
            value: value,
            name: 'completed',
            itemStyle: {
                normal: {
                    borderWidth: 8,
                    borderColor: {
                        colorStops: [{
                            offset: 0,
                            color: '#02df94' || '#25d6bc' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#28d3d0' || '#14dbaa' // 100% 处的颜色
                        }]
                    },
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#02df94' || '#25d6bc' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#28d3d0' || '#14dbaa' // 100% 处的颜色
                        }]
                    },
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            }
        }, {
            name: 'gap',
            value: 100 - value,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            }
        }]
    }]
}

var shadowColor = '#374b86';
var value = 46;
option7 = {

    title: {
        //text: `${value}万辆`,
        text: `今日报警`,
        subtext: '',
        left: 'center',
        top: 'center',//top待调整
        textStyle: {
            color: '#fff',
            fontSize: 16,
            fontFamily: 'PingFangSC-Regular'
        },
        subtextStyle: {
            color: '#ff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular',
            top: 'center'
        },
        itemGap: -1//主副标题间距
    },

    series: [{
        name: 'pie1',
        type: 'pie',
        clockWise: true,
        radius: ['65%', '70%'],
        itemStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        hoverAnimation: false,
        data: [{
            value: value,
            name: 'completed',
            itemStyle: {
                normal: {
                    borderWidth: 8,
                    borderColor: {
                    colorStops: [{
                            offset: 0,
                            color: '#eb3600' || '#cc9a00' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#d0a00e' || '#d0570e' // 100% 处的颜色
                        }]
                    },
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#eb3600' || '#cc9a00' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#d0a00e' || '#d0570e' // 100% 处的颜色
                        }]
                    },
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            }
        }, {
            name: 'gap',
            value: 100 - value,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            }
        }]
    }]
}
//////////////////////今日实时收费 end

















