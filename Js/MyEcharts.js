/**
 * 封装echarts 工具
 */
/**
 * 数组是否存在
 */

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};
/**
 * 数组中最大值 最小值
 * @param array
 * @returns
 */
Array.prototype.max = function () {
    return Math.max.apply({}, this);
};
Array.prototype.min = function () {
    return Math.min.apply({}, this);
};

/**
 * 判断是否为整数
 * @param obj
 * @returns {Boolean}
 */
function isInteger(obj) {
    return obj % 1 === 0
}

var MyEcharts = {
    EchartsDataFormate: {

        /**
         * @param data : json数据<br>
         * @param type : 图表类型<br>
         */
        GroupFormate: function (data, type) {
            //用于存储类型名称
            var groups = new Array();
            //用于存储data.name数据
            var names = new Array();
            //存储返回series数据 （一个或者多个）
            var series = new Array();

            for (var i = 0; i < data.length; i++) {
                //判断data[i].group是否存在数租groups中
                if (!groups.contains(data[i].group)) {
                    //不存在则跳进 存放
                    groups.push(data[i].group);
                }

                //判断name数据是否存在 数组names中
                if (!names.contains(data[i].name)) {
                    //不存在则跳进 存放
                    names.push(data[i].name);
                }
            }

            //遍历分类
            for (var i = 0; i < groups.length; i++) {
                //定义一个series中间变量
                var temp_series = {};
                //定义data.value数据存储
                var temp_data = new Array();
                //遍历所有数据
                for (var j = 0; j < data.length; j++) {
                    //遍历data.name数据
                    for (var k = 0; k < names.length; k++) {
                        //判断所有分类中的所有数据含name数据分开
                        if (groups[i] == data[j].group && names[k] == data[j].name) {
                            temp_data.push(data[j].value);
                        }
                    }
                }
                temp_series = {name: groups[i], type: type, data: temp_data};
                series.push(temp_series);

            }
            return {groups: groups, category: names, series: series};
        },


    },
    //生成图形option
    EchartsOption: {
        /**
         * 柱形图
         * @param title ： 标题<br>
         * @param subtext ：副标题<br>
         * @param data : json 数据
         */
        bar: function (title, subtext, data) {
            // var datas = MyEcharts.EchartsDataFormate.GroupFormate(data, 'bar');
       var     xData = ["信访工作机构", "行政机关受理", "行政机关答复",'行政机关办结'];
        var    yData = [2342, 1230, 425,900];
         var   option = {
                backgroundColor: '#061326',
                "grid": {
                    "top": "25%",
                    "left": "-5%",
                    "bottom": "5%",
                    "right": "5%",
                    "containLabel": true
                },
                tooltip:{
                    show:true
                },
                animation: false,
                "xAxis": [{
                    "type": "category",
                    "data": xData,
                    "axisTick": {
                        "alignWithLabel": true
                    },
                    "nameTextStyle": {
                        "color": "#82b0ec"
                    },
                    "axisLine": {
                        show: false,
                        "lineStyle": {
                            "color": "#82b0ec"
                        }
                    },
                    "axisLabel": {
                        "textStyle": {
                            "color": "#fff"
                        },
                        margin: 30
                    }
                }],
                "yAxis": [{
                    show: false,
                    "type": "value",
                    "axisLabel": {
                        "textStyle": {
                            "color": "#fff"
                        },
                    },
                    "splitLine": {
                        "lineStyle": {
                            "color": "#0c2c5a"
                        }
                    },
                    "axisLine": {
                        "show": false
                    }
                }],
                "series": [{
                    "name": "",
                    type: 'pictorialBar',
                    symbolSize: [40, 10],
                    symbolOffset: [0, -6],
                    symbolPosition: 'end',
                    z: 12,
                    // "barWidth": "0",
                    "label": {
                        "normal": {
                            "show": true,
                            "position": "top",
                            // "formatter": "{c}%"
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: '#34DCFF'
                        }
                    },
                    color: "#2DB1EF",
                    data: yData
                },
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [40, 10],
                        symbolOffset: [0, 7],
                        // "barWidth": "20",
                        z: 12,
                        "color": "#2DB1EF",
                        "data": yData
                    },
                    {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [50, 15],
                        symbolOffset: [0, 12],
                        z: 10,
                        itemStyle: {
                            normal: {
                                color: 'transparent',
                                borderColor: '#2EA9E5',
                                borderType: 'solid',
                                borderWidth: 1
                            }
                        },
                        data: yData
                    },        {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [50, 15],
                        symbolOffset: [0, 12],
                        z: 10,
                        itemStyle: {
                            normal: {
                                color: 'transparent',
                                borderColor: '#2EA9E5',
                                borderType: 'solid',
                                borderWidth: 1
                            }
                        },
                        data: yData
                    },

                    {
                        name: '',
                        type: 'pictorialBar',
                        symbolSize: [70, 20],
                        symbolOffset: [0, 18],
                        z: 10,
                        itemStyle: {
                            normal: {
                                color: 'transparent',
                                borderColor: '#19465D',
                                borderType: 'solid',
                                borderWidth: 2
                            }
                        },
                        data: yData
                    },
                    {
                        type: 'bar',
                        //silent: true,
                        "barWidth": "40",
                        barGap: '10%', // Make series be overlap
                        barCateGoryGap: '10%',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                                    offset: 0,
                                    color: "#38B2E6"
                                },
                                    {
                                        offset: 1,
                                        color: "#0B3147"
                                    }
                                ]),
                                opacity: .8
                            },
                        },
                        data: yData
                    },{
                        name: '信访事项受理或答复率',
                        type: 'line',
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: 'circle',
                        symbolSize: 25,
                        lineStyle: {
                            normal: {
                                color: "#6c50f3",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#6c50f3',
                            }
                        },
                        itemStyle: {
                            color: "#6c50f3",
                            borderColor: "#fff",
                            borderWidth: 3,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        tooltip: {
                            show: true
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(108,80,243,0.3)'
                                },
                                    {
                                        offset: 1,
                                        color: 'rgba(108,80,243,0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(108,80,243, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: [2330, 205.97,2340,900 ]
                    },
                ]
            };
            return option;
        },
        pie:function(title,color,data) {
            let setLabel = (data)=>{
                let opts = [];
                for(let i=0;i<data.length;i++){
                    let item = {};
                    item.name = data[i].name;
                    item.value = data[i].value;
                    item.label = {
                        normal:{
                            //控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
                            show:true,
                            //a和b来识别不同的文字区域
                            formatter:[
                                '{a|{d}%  {b}}',//引导线上面文字
                                '{b|}' //引导线下面文字
                            ].join('\n'), //用\n来换行
                            rich:{
                                a:{
                                    left:20,
                                    padding:[0,-80,-15,-80]
                                },
                                b:{
                                    height:5,
                                    width:5,
                                    lineHeight: 5,
                                    marginBottom: 10,
                                    padding:[0,-5],
                                    borderRadius:5,
                                    backgroundColor:color[i], // 圆点颜色和饼图块状颜色一致
                                }
                            },

                        }
                    }

                    opts.push(item)
                }
                return opts;
            }
            var option = {

                legend: {
                    type:"scroll",
                    orient: 'vertical',
                    right:'5%',
                    align:'left',
                    top:'middle',
                    textStyle: {
                        color:'#8C8C8C'
                    },
                    height:150
                },
                animation: true,
                series: [
                    {
                        color:color,
                        name: '饼图圆点',
                        type: 'pie',
                        radius: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        labelLine: {
                            normal: {
                                show: true,
                                length: 15, // 第一段线 长度
                                length2: 100, // 第二段线 长度
                                align: 'right'
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:setLabel(data)
                    }
                ]
            }
          return option
        },
        /*
        * 信访案件总量分析*/
        totalpie:function(title,data) {
            var myColor = ['#81E7ED'];
            var dataLine = [Math.round(data.townshiplevel/100), Math.round(data.countrylevel/100), Math.round(data.prefecturelevel/100), Math.round(data.provincelevel/100),  Math.round(data.nationallevel/100)];//[40, 56, 23, 15, 15];//[40, 46, 53, 55, 65];
            var positionLeft = 20,
                max = 100 + positionLeft;

            var g_cellBar0_y = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAoCAYAAAAhf6DEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA6SURBVEhLY2x8/vY/A4mg3zwcTDOBSTLBqGYSwahmEsGoZhLBqGYSwahmEsGoZhLBqGYSwZDUzMAAAJldBMF2UASmAAAAAElFTkSuQmCC';
            var g_cellBarImg0_y = new Image();
            g_cellBarImg0_y.src = g_cellBar0_y;
            var option = {
                backgroundColor: '#101E44',
                grid: [{
                    left: '25%',
                    top: '12%',
                    right: '0%',
                    bottom: '8%',
                    containLabel: true
                },
                    {
                        left: '10%',
                        top: '12%',
                        right: '5%',
                        bottom: '8%',
                        containLabel: true
                    }
                ],
                xAxis: [{
                    //   max:max,
                    show: false
                }],
                yAxis: [{
                    axisTick: 'none',
                    axisLine: 'none',
                    axisLabel: {
                        inside: true,
                        align: 'left',
                        textStyle: {
                            color: '#81E7ED',
                            fontSize: '14'
                        }
                    },
                    z: 10,
                    data: ['乡信访量', '县信访量', '市信访量', '省信访量', '国家信访量']
                    // data: ['全国信访案件', '省信访案件', '市信访案件', '县信访案件', '乡信访案件']
                }, {
                    axisTick: 'none',
                    axisLine: 'none',
                    show: true,
                    axisLabel: {
                        inside: true,
                        align: 'right',
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '14'
                        }
                    },
                    z: 12,
                    data: [data.townshiplevel, data.countrylevel, data.prefecturelevel, data.provincelevel, data.nationallevel]
                    //[Math.round(data.townshiplevel/100), Math.round(data.countrylevel/100), Math.round(data.prefecturelevel/100), Math.round(data.provincelevel/100),  Math.round(data.nationallevel/100)];//[4
                }, {

                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    data: []
                }],
                series: [

                    { //间距
                        type: 'bar',
                        barWidth: 20,
                        stack: 'b',
                        legendHoverLink: false,
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        z: 3,
                        data: [positionLeft, positionLeft, positionLeft, positionLeft, positionLeft]
                    }, {
                        name: '条',
                        type: 'bar',
                        stack: 'b',
                        yAxisIndex: 0,
                        data: dataLine,
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                distance: 10,
                                formatter: function(param) {
                                    return param.value + '%'
                                },
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '16'
                                }
                            }
                        },
                        barWidth: 30,
                        itemStyle: {
                            color: {
                                image: g_cellBarImg0_y,
                                repeat: 'repeat'
                            }
                            /*normal: {
                                color: function(params) {
                                    var num = myColor.length
                                    return myColor[params.dataIndex % num]
                                }
                            }*/
                        },
                        z: 2
                    }, {
                        name: '白框',
                        type: 'bar',
                        yAxisIndex: 1,
                        barGap: '-100%',
                        data: [99.8, 99.9, 99.9, 99.9, 99.9],
                        barWidth: 57,
                        itemStyle: {
                            normal: {
                                color: '#0e2147',
                                barBorderRadius: 2
                            }
                        },
                        z: 1
                    },
                    {
                        name: '外框',
                        type: 'bar',
                        yAxisIndex: 2,
                        barGap: '-100%',
                        data: [100, 100, 100, 100, 100],
                        barWidth: 59,
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                distance: 10,
                                formatter: function(data) {
                                    return dataLine[data.dataIndex] + "%";
                                },
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: '16'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var num = myColor.length
                                    return myColor[params.dataIndex % num]
                                },
                                barBorderRadius: [0, 7, 0, 7]
                            }
                        },
                        z: 0
                    },
                ]
            }
            return option
        },
        /*
        * 变形柱状图*/
        pictorialBar: function (title, subtext, data) {
            var datas = MyEcharts.EchartsDataFormate.GroupFormate(data, 'pictorialBar');
            var os_title = "";
            var os_subtext = "" //团号
            var os_bgc = "#050E11";

            var os_age = [data[0].area,data[1].area, data[2].area, data[3].area, data[4].area, data[5].area, data[6].area, data[7].area, data[8].area,data[9].area];
            var os_agevalue = [data[0].number,data[1].number, data[2].number, data[3].number, data[4].number, data[5].number, data[6].number, data[7].number, data[8].number,data[9].number];
            var option = {
                backgroundColor: os_bgc,
                "title": {
                    "text": os_title,
                    "subtext": os_subtext,
                    x: "2%",
                    y: "2%",
                    textStyle: {
                        color: '#fff',
                        fontSize: '20'
                    },
                    subtextStyle: {
                        color: '#ddd',
                        fontSize: '12'
                    },
                },
                grid: {
                    left: '9%',
                    top: '5%',
                    bottom: '7%',
                    right: '5%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    formatter: "{a} :<br/>{b}，共 {c}"
                    /*formatter: function(params) {
                        return params[0].name + ': ' + params[0].value;
                    }*/
                },
                xAxis: {
                    data: os_age,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(45, 140, 240, 0.1)',
                            width: 1 //这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999',
                            fontSize: 12
                        }
                    }
                },
                yAxis: [{
                    splitNumber: 2,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(45, 140, 240, 0.1)',
                            width: 1 //这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999',
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: 'rgba(255,255,255,.5)'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255, 129, 109, 0.1)',
                            width: 0.5,
                            type: 'dashed'
                        }
                    }
                }],
                series: [{
                    name: '信访数量',
                    type: 'pictorialBar',
                    barCategoryGap: '0%',
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                    label: {
                        show: true,
                        position: 'top',
                        distance: 15,
                        // color: [
                        //     "#FF6A6A",//255 106 106
                        //     "#CD5555",//	205 85 85
                        //     "#FF8247",//	255 130 71
                        //     "#E9967A",//	233 150 122
                        //     "#FFA07A",// 	255 160 122
                        //     "#EEDD82",//238 221 130
                        //     "#EEE8AA",//	238 232 170
                        //     "#32CD32",//50 205 50
                        //     "#98FB98",//152 251 152
                        //     "#7CCD7C"//124 205 124
                        // ],
                        color: '#2D8CF0',
                        fontWeight: 'bolder',
                        fontSize: 10,
                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                //45, 140, 240  #2D8CF0   OTAS蓝
                                //232, 94, 106  #DB5E6A   暗红
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(45, 140, 240, .8)' //  0%  处的颜色
                                },
                                    {
                                        offset: 1,
                                        color: 'rgba(45, 140, 240, .1)' //  100%  处的颜色
                                    }
                                ],
                                global: false //  缺省为  false
                            }
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: os_agevalue,
                    z: 10
                }]
            }
            return option;
        },
        /*
        * 前10街道*/
        newcolorBar: function (title, subtext, data) {
            var option = {

                title: {
                    x: 'center',
                    text: title + '案件总数'+ subtext,
                    textStyle: {
                        color: '#fff',
                        fontSize: '20'
                    },
                    //subtext: '20170811:14pm-20170813:15pm',//'Rainbow bar example',
                    //link: 'http://echarts.baidu.com/doc/example.html'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },


                grid: {
                    left: '1%',
                    top:'10%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'value',
                    position:'bottom',
                    splitLine: {show: false},
                    boundaryGap: [0, 0.01],
                    axisLabel: {
                        textStyle: {
                            color: '#ffa800',
                            fontSize: 16,
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#2386D3'

                        }
                    },
                    axisTick:{
                        show:false
                    },
                },

                yAxis: {
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: '#ffa800',
                            fontSize: 16,
                        }
                    },
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    data: [data[8].area, data[7].area, data[6].area, data[5].area, data[4].area, data[3].area, data[2].area, data[1].area,data[0].area]
                },
                series: [
                    {
                        name: '案件数',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    // build a color map as your need.
                                    var colorList = [];
                                    for(var i=0;i<10;i++){
                                        if(i==6){
                                            colorList.push( new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                                offset: 0,
                                                color: '#173B6C'}, {offset: 1,color: '#4ABBE8'
                                            }]))
                                        }else if(i==7){
                                            colorList.push( new echarts.graphic.LinearGradient(0,1, 0,  0, [{
                                                offset: 0,
                                                color: '#173B6C'}, {offset: 1,color: '#F7BC2D'
                                            }]))

                                        }else if(i==8){
                                            colorList.push( new echarts.graphic.LinearGradient(0,1, 0,  0, [{
                                                offset: 0,
                                                color: '#173B6C'}, {offset: 1,color: '#F06648'
                                            }]))

                                        }else {
                                            colorList.push( new echarts.graphic.LinearGradient(0,1, 0,  0, [{
                                                offset: 0,
                                                color: '#173B6C'}, {offset: 1,color: '#235890'
                                            }]))
                                        }

                                    }

                                    return colorList[params.dataIndex]
                                },
                                // color:'#ffa800',
                                barBorderRadius:[0,10,10,15],

                                shadowBlur: 2,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },

                        },
                        barWidth: '50%',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                color:'#ffa800'
                            }
                        },
                        data: [data[8].number, data[7].number, data[6].number, data[5].number, data[4].number, data[3].number, data[2].number, data[1].number,data[0].number]
                    }
                ]
            };
            return option;
        },
        /*
        * 词云*/
        graph: function (name) {
            let min = 8,
                max = 40;
            let data = (() => {
                let count = 50;
                let set = new Set();
                while (count--) {
                    set.add(Math.floor(Math.random() * (max - min)) + min);
                }
                return [...set].map((v) => ({
                    value: v,
                    name: `${v}`
                }))
            })();

// 获取比例尺,domain: 输入域，range 输出域
            function getScale([d1, d2], [r1, r2]) {
                return function(val) {
                    return (val - d1) / (d2 - d1) * (r2 - r1) + r1;
                };
            }

// value 对应的比例尺
// 泡泡大小
            let scale = getScale([min, max], [32, 50]);
// label字体大小
            let scaleFontSize = getScale([min, max], [20, 28]);
// 对应类别categories根据value 值对应5种
            let scaleCategory = getScale([min, max], [0, 4.99]);

            data = data.map((item, index) => {
                let {
                    value
                } = item;
                return Object.assign(item, {
                    symbolSize: scale(value),
                    category: Math.floor(scaleCategory(value)),
                    label: {
                        fontSize: parseInt(scaleFontSize(value))
                    }
                });
            });
            var option = {
                // backgroundColor: '#101736',
                series: [{
                    type: 'graph',
                    layout: 'force',
                    legendHoverLink: false,
                    force: {
                        repulsion: 30,
                        edgeLength: 35
                    },
                    categories: [{
                        itemStyle: {
                            color: '#409EFF'
                        }
                    },
                        {
                            itemStyle: {
                                color: '#67C23A'
                            }
                        },
                        {
                            itemStyle: {
                                color: '#E6A23C'
                            }
                        },
                        {
                            itemStyle: {
                                color: '#F56C6C'
                            }
                        },
                        {
                            itemStyle: {
                                color: '#ff7edb'
                            }
                        }
                    ],
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data
                }]
            };
            return option;
        },
        /*
        * 重点人员*/
        scatter: function (name) {
            var plantCap = [{
                name: '樊要中',
                value: '',

            }, {
                name: '刘桂花',
                value: '',

            }, {
                name: '刘爱英',
                value: '',

            }, {
                name: '朱红霞',
                value: '',

            }, {
                name: '张晓明',
                value: '',

            }, {
                name: '黄小可',
                value: '',

            }, {
                name: '谢冰莹',
                value: '',

            }, {
                name: '张红香',
                value: '',

            }]

            var datalist = [{
                offset: [55, 50],
                symbolSize: 64,
                opacity: .95,
                fontSize: '15'
            }, {
                offset: [30, 30],
                symbolSize: 60,
                opacity: .6,
                fontSize: '15.1'
            }, {
                offset: [28, 50],
                symbolSize: 71,
                opacity: .6,
                fontSize: '13.2'
            }, {
                offset: [50, 70],
                symbolSize: 60,
                opacity: .8,
                fontSize: '12.85'
            }, {
                offset: [70, 30],
                symbolSize: 58,
                opacity: .75,
                fontSize: '12.43'
            }, {
                offset: [80, 60],
                symbolSize: 55,
                opacity: .7,
                fontSize: '11.8'
            }, {
                offset: [50, 20.5],
                symbolSize: 50,
                opacity: .6,
                fontSize: '15.7'
            }, {
                offset: [88, 45],
                symbolSize: 45,
                opacity: .6,
                fontSize: '14.57'
            }]
            var datas = [];
            for (var i = 0; i < plantCap.length; i++) {
                var item = plantCap[i];
                var itemToStyle = datalist[i];
                datas.push({
                    name: item.name ,
                    value: itemToStyle.offset,
                    symbolSize: itemToStyle.symbolSize,
                    label: {
                        normal: {
                            textStyle: {
                                fontSize: itemToStyle.fontSize
                            }
                        },

                    },
                    itemStyle: {
                        normal: {
                            opacity: itemToStyle.opacity
                        }
                    },
                })
            }
            var option = {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#999'
                    },
                    formatter: (item) => {
                        if (item.data[2]) {
                            return `${item.data[2]}<br/>  坐标: x ${item.data[0]}  y ${item.data[1]}`;
                        }
                    }
                },
                xAxis: [{
                    gridIndex: 0,
                    type: 'value',
                    show: false,
                    min: 0,
                    max: 100,
                    nameLocation: 'middle',
                    nameGap: 30


                }],
                yAxis: [{
                    gridIndex: 0,
                    min: 0,
                    show: false,
                    max: 100,
                    nameLocation: 'middle',
                    nameGap: 30,
                }],
                series: [{
                    type: 'scatter',
                    symbol: 'circle',
                    symbolSize: 120,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}',
                            color: '#fff',
                            textStyle: {
                                fontSize: '20'
                            }
                        },

                    },

                    itemStyle: {
                        normal: {
                            color: '#00acea'
                        },
                        emphasis: {
                            color: '#eea631',
                            opacity: 1
                        }
                    },
                    data: datas
                }

                ]
            };
            return option;
        },
        /*
        * 国家、省、市*/
        piepie: function (name,data) {
            let totalData = data.total;
            let dashedPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC';
            let color = ['#FF8700', '#ffc300', '#00e473', '#009DFF', '#0034ff'];
            let chartData = [

                {
                    name: "国家级案件数",
                    value: data.nationallevel,
                    unit: '列',
                    probability: data.natitionalrate,
                },
                {
                    name: "省级案件数",
                    value: data.provincelevel,
                    unit: '列',
                    probability: data.provincerate,
                },
                {
                    name: "市级案件数",
                    value: data.prefecturelevel,
                    unit: '列',
                    probability: data.prefecturerate,
                },
                {
                    name: "县级案件数",
                    value: data.countrylevel,
                    unit: '列',
                    probability: data.countryrate,
                },
                {
                    name: "乡级案件数",
                    value: data.townshiplevel,
                    unit: '列',
                    probability: data.townshiprate,
                },
            ];
            let arrName = [];
            let arrValue = [];
            let sum = 0;
            let pieSeries = [],
                lineYAxis = [];

// 数据处理
            chartData.forEach((v, i) => {
                arrName.push(v.name);
                arrValue.push(v.value);
                sum = sum + v.value;
            })

// 图表option整理
            chartData.forEach((v, i) => {
                pieSeries.push({
                    name: '沪昆线到达晚点情况',
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: [75 - i * 15 + '%', 67 - i * 15 + '%'],
                    center: ["40%", "50%"],
                    label: {
                        show: false
                    },
                    data: [{
                        value: v.value,
                        name: v.name
                    }, {
                        value: sum - v.value,
                        name: '',
                        itemStyle: {
                            color: "rgba(0,0,0,0)"
                        }
                    }]
                });
                pieSeries.push({
                    name: '',
                    type: 'pie',
                    silent: true,
                    z: 1,
                    clockWise: false, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
                    radius: [75 - i * 15 + '%',67 - i * 15 + '%'],
                    center: ["40%", "50%"],
                    label: {
                        show: false
                    },
                    data: [{
                        value: 7.5,
                        itemStyle: {
                            color: "#101736"
                        }
                    }, {
                        value: 2.5,
                        name: '',
                        itemStyle: {
                            color: "rgba(0,0,0,0)"
                        }
                    }]
                });
                v.percent = (v.value / sum * 100).toFixed(1) + "%";
                lineYAxis.push({
                    value: i,
                    textStyle: {
                        rich: {
                            circle: {
                                color: color[i],
                                padding: [0, 5]
                            }
                        }
                    }
                });
            })
            var option = {
                // backgroundColor: '#101736',101736//050E11
                title: {
                    x: '480',
                    y:'280',
                    text: '总案件数:'+totalData,
                    textStyle: {
                        color: '#fff',
                        fontSize: '20'
                    },
                    //subtext: '20170811:14pm-20170813:15pm',//'Rainbow bar example',
                    //link: 'http://echarts.baidu.com/doc/example.html'
                },
                color: color,
                grid: {
                    top: '12%',
                    bottom: '54%',
                    left: "40%",
                    containLabel: false
                },
                yAxis: [{
                    type: 'category',
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function(params) {
                            let item = chartData[params];
                            if(item.name === '总信访量'){
                                return '{line|}{circle|●}{name|'+ item.name +'}{bd|}{value|'+ item.value+'}{unit|个}'
                            }else{
                                return '{line|}{circle|●}{name|'+ item.name +'}{bd||}{percent|'+item.probability+'}{value|'+ item.value+'}{unit|个}'
                            }

                        },
                        interval: 0,
                        inside: true,
                        textStyle: {
                            color: "#333",
                            fontSize: 14,
                            rich: {
                                line: {
                                    width: 170,
                                    height: 1,
                                    backgroundColor: {image: dashedPic}
                                },
                                name: {
                                    color: '#ccc',
                                    fontSize: 14,
                                },
                                bd: {
                                    color: '#666',
                                    padding: [0, 5],
                                    fontSize: 14,
                                },
                                percent:{
                                    color: '#ccc',
                                    fontSize: 14,
                                },
                                value: {
                                    color: '#ccc',
                                    fontSize: 16,
                                    fontWeight: 500,
                                    padding: [0, 0, 0, 20]
                                },
                                unit: {
                                    color: '#666',
                                    fontSize: 14,
                                }
                            }
                        },
                        show: true
                    },
                    data: lineYAxis
                }],
                xAxis: [{
                    show: false
                }],
                series: pieSeries
            };
            return option;
        },
        /*
        * 大数据分析*/
        datapie: function (data1,data2,data3,data4) {
            var circleRadius = ['30%','20%'];
            var centers = [['15%','30%'],['60%','30%'],['15%','75%'],['60%','75%'],]
            titleTextObject = {
                color: '#fff',
                rich: { //富文本
                    white: {
                        color: '#fff',
                        fontSize: 12,
                        padding:[12,0,0,4]
                    },
                    newyellow: {
                        color: '#f9f48e',
                        fontSize: 12,
                        padding:[8,0,0,4]
                    },
                    newgreen:{
                        color: '#51ebb3',
                        fontSize: 12,
                        padding:[8,0,0,4]
                    }
                },
            };
            labelTextObject = {
                normal: {
                    formatter: function(params, i) {
                        // console.log('88888888888888',i)
                        return params.percent.toFixed(1)+"%";
                        // return 10+"%";
                    },
                    position: 'center',
                    show: true,
                    textStyle: {
                        fontSize: 8,
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                }
            }
            var option = {
                grid:{
                    left:'13%',
                    right:"13%",
                    bottom:"10%",
                    top:"20%",
                },
                // backgroundColor:"#015c8a",
                title: [{
                    text: '{newgreen| 责任单位\n}{newgreen|及时受理数 | 应受理总数}{white|\n'+ data1.acceptnumbertimely+' | '+ data1.total+'}',
                    left: '22%',
                    top: '18%',
                    textAlign: 'left',
                    textStyle: titleTextObject
                }, {
                    text: '{newgreen| 责任单位\n}{newgreen|满意量 | 评价总数}{white|\n'+ (parseInt(data2.satisfied) + parseInt(data2.satisfiedbasically)) +' | '+ data2.total+'}',
                    left: '67%',
                    top: '18%',
                    textAlign: 'left',
                    textStyle: titleTextObject
                },
                    {
                        text: '{newyellow| 信访部门\n}{newyellow|及时受理数 | 应受理总数}{white|\n'+ data3.acceptnumbertimely+' | '+ data3.total+'}',
                        left: '23%',
                        top: '65%',
                        textAlign: 'left',
                        textStyle: titleTextObject
                    }, {
                        text: '{newyellow| 信访部门\n}{newyellow|满意量 | 评价总数}{white|\n'+ (parseInt(data4.satisfied) + parseInt(data4.satisfiedbasically))+'  |  '+ data4.total+'}',
                        left: '68%',
                        top: '65%',
                        textAlign: 'left',
                        textStyle: titleTextObject
                    }, ],
                series: [{
                    name: '正常',
                    center: centers[0],
                    radius: circleRadius,
                    type: 'pie',
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        itemStyle: {
                            normal: {
                                color: '#51ebb3'
                            }
                        },
                        value: data1.acceptnumbertimely,
                        label: labelTextObject
                    }, {
                        value: data1.total - data1.acceptnumbertimely,
                        itemStyle: {
                            normal: {
                                color: '#01547e'
                            }
                        }
                    }]
                }, {
                    center: centers[1],
                    radius: circleRadius,
                    type: 'pie',
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        itemStyle: {
                            normal: {
                                color: '#51ebb3'
                            }
                        },
                        value: data2.evaluatenumber,
                        label: labelTextObject
                    }, {
                        value: data2.total - data2.evaluatenumber,
                        itemStyle: {
                            normal: {
                                color: '#01547e'
                            }
                        }
                    }]
                },{
                    center: centers[2],
                    radius: circleRadius,
                    type: 'pie',
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        value: data3.acceptnumbertimely,
                        itemStyle: {
                            normal: {
                                color: '#f9f48e'
                            }
                        },
                        label: labelTextObject
                    }, {
                        value: data3.total - data3.acceptnumbertimely,
                        itemStyle: {
                            normal: {
                                color: '#01547e'
                            }
                        },
                    }]
                },{
                    center: centers[3],
                    radius: circleRadius,
                    type: 'pie',
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        value: data4.evaluatenumber,
                        itemStyle: {
                            normal: {
                                color: '#f9f48e'
                            }
                        },
                        label: labelTextObject
                    }, {
                        value: data4.total - data4.evaluatenumber,
                        itemStyle: {
                            normal: {
                                color: '#01547e'
                            }
                        }
                    }]
                },]

            };
            return option;
        },
        /*
        * 大数据分析结果*/
        dataspie: function (data1,data2,data3) {
            var arr1=data1.completeratetimely.split("%");
            var pie1 = arr1[0].split(".");
            var arr2=data2.replayratetimely.split("%");
            var pie2 = arr2[0].split(".");
            var arr3=data3.participationrate.split("%");
            var pie3 = arr3[0].split(".");
            var option = {
                title: [{
                    text: ['{a|按期办结 | 总案件数}', '{b|     '+ data1.completenumbertimely +'  |  '+ data1.total +'}'].join('\n\n'),
                    subtext: ['{a|  占比}', '{b|'+data1.completeratetimely +'}', '{c|}'].join('\t\t'),
                    x: '53',
                    y: '50',
                    textStyle: {
                        rich: {
                            a: {
                                fontFamily: 'SourceHanSansCN-Regular',
                                fontWeight: '400',
                                color: "rgba(76, 177, 255, 1)",
                                fontSize: 11,
                                align: 'center',
                                textAlign: 'left'
                            },
                            b: {
                                fontFamily: 'SourceHanSansCN-Medium',
                                fontWeight: '500',
                                color: "rgba(229, 244, 255, 1)",
                                fontSize: 11,

                            }
                        }
                    },
                    subtextStyle: {
                        rich: {
                            a: {
                                fontFamily: 'SourceHanSansCN-Regular',
                                fontWeight: '400',
                                color: "rgba(76, 177, 255, 1)",
                                fontSize: 15,
                            },
                            b: {
                                fontFamily: 'SourceHanSansCN-Medium',
                                fontWeight: '500',
                                color: "RGBA(197, 69, 130, 1)",
                                fontSize: 15,
                            },
                            c: {
                                fontFamily: 'SourceHanSansCN-Medium',
                                fontWeight: '500',
                                color: "RGBA(197, 69, 130, 1)",
                                fontSize: 20,
                                // backgroundColor: {
                                //     // image: 'https://www.echartsjs.com/examples/data/asset/img/weather/sunny_128.png',

                                // },
                                width: 15
                            }
                        }
                    }
                },{
                    text: ['{a|按期答复 | 总案件数}', '{b|     '+ data2.replaynumbertimely +'  |  '+ data2.shouldtotal +'}'].join('\n\n'),
                    subtext: ['{a|   占比}', '{b|'+ data2.replayratetimely +'}', '{c|}'].join('\t\t'),
                    x: '240',
                    y: '50',
                    textStyle: {
                        rich: {
                            a: {
                                fontFamily: 'SourceHanSansCN-Regular',
                                fontWeight: '400',
                                color: "rgba(76, 177, 255, 1)",
                                fontSize: 11,
                                align: 'center',
                                textAlign: 'left'
                            },
                            b: {
                                fontFamily: 'SourceHanSansCN-Medium',
                                fontWeight: '500',
                                color: "rgba(229, 244, 255, 1)",
                                fontSize: 11,

                            }
                        }
                    },
                    subtextStyle: {
                        rich: {
                            a: {
                                fontFamily: 'SourceHanSansCN-Regular',
                                fontWeight: '400',
                                color: "rgba(76, 177, 255, 1)",
                                fontSize: 15,
                            },
                            b: {
                                fontFamily: 'SourceHanSansCN-Medium',
                                fontWeight: '500',
                                color: "RGBA(197, 69, 130, 1)",
                                fontSize: 15,
                            },
                            c: {
                                fontFamily: 'SourceHanSansCN-Medium',
                                fontWeight: '500',
                                color: "RGBA(197, 69, 130, 1)",
                                fontSize: 20,
                                // backgroundColor: {
                                //     // image: 'https://www.echartsjs.com/examples/data/asset/img/weather/sunny_128.png',

                                // },
                                width: 15
                            }
                        }
                    }
                },{
                    text: ['{a|   评价数 | 参评数}', '{b|    '+ data3.evaluatenumber +'  |  '+ data3.total +'}'].join('\n\n'),
                    subtext: ['{a|  占比}', '{b|'+ data3.participationrate +'}', '{c|}'].join('\t\t'),
                    x: '425',
                    y: '50',
                    textStyle: {
                        rich: {
                            a: {
                                fontFamily: 'SourceHanSansCN-Regular',
                                fontWeight: '400',
                                color: "rgba(76, 177, 255, 1)",
                                fontSize: 11,
                                align: 'center',
                                textAlign: 'left'
                            },
                            b: {
                                fontFamily: 'SourceHanSansCN-Medium',
                                fontWeight: '500',
                                color: "rgba(229, 244, 255, 1)",
                                fontSize: 11,

                            }
                        }
                    },
                    subtextStyle: {
                        rich: {
                            a: {
                                fontFamily: 'SourceHanSansCN-Regular',
                                fontWeight: '400',
                                color: "rgba(76, 177, 255, 1)",
                                fontSize: 15,
                            },
                            b: {
                                fontFamily: 'SourceHanSansCN-Medium',
                                fontWeight: '500',
                                color: "RGBA(197, 69, 130, 1)",
                                fontSize: 15,
                            },
                            c: {
                                fontFamily: 'SourceHanSansCN-Medium',
                                fontWeight: '500',
                                color: "RGBA(197, 69, 130, 1)",
                                fontSize: 20,
                                // backgroundColor: {
                                //     // image: 'https://www.echartsjs.com/examples/data/asset/img/weather/sunny_128.png',

                                // },
                                width: 15
                            }
                        }
                    }
                }],
                // backgroundColor: '#011128',
                series: [{
                    name: '按期办结',
                    type: 'pie',
                    center: ["18%", "54%"],
                    clockWise: true,
                    radius: [65, 61],
                    startAngle: 90,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(14, 252, 255, 1)'
                            }, {
                                offset: 1,
                                color: 'rgba(54, 107, 231, 1)'
                            }])
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        value: pie1[0],
                        name: '01'
                    }, {
                        value: 100 - pie1[0],
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: 'none', //未完成的圆环的颜色
                            }
                        }
                    }

                    ]
                }, {
                    name: '外框',
                    type: 'pie',
                    center: ["18%", "54%"],
                    animation: false,
                    clockWise: false,
                    radius:  [70, 68],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: 'RGBA(30, 68, 96, 1)'
                        }
                    },
                    hoverAnimation: false,
                    tooltip: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '02',
                    }, {
                        value: 0,
                        name: 'invisible',
                    }

                    ]
                },{
                    name: '及时受理',
                    type: 'pie',
                    center: ["49.5%", "54%"],
                    clockWise: true,
                    radius: [65, 61],
                    startAngle: 90,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(14, 252, 255, 1)'
                            }, {
                                offset: 1,
                                color: 'rgba(54, 107, 231, 1)'
                            }])
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        value: pie2[0],
                        name: '01'
                    }, {
                        value: 100 - pie2[0],
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: 'none', //未完成的圆环的颜色
                            }
                        }
                    }

                    ]
                },{
                    name: '外框',
                    type: 'pie',
                    center: ["49.5%", "54%"],
                    animation: false,
                    clockWise: false,
                    radius:  [70, 68],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: 'RGBA(30, 68, 96, 1)'
                        }
                    },
                    hoverAnimation: false,
                    tooltip: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '02',
                    }, {
                        value: 0,
                        name: 'invisible',
                    }

                    ]
                },{
                    name: '及时受理',
                    type: 'pie',
                    center: ["80%", "54%"],
                    clockWise: true,
                    radius: [65, 61],
                    startAngle: 90,
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(14, 252, 255, 1)'
                            }, {
                                offset: 1,
                                color: 'rgba(54, 107, 231, 1)'
                            }])
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        value: pie3[0],
                        name: '01'
                    }, {
                        value: 100 - pie3[0],
                        name: 'invisible',
                        itemStyle: {
                            normal: {
                                color: 'none', //未完成的圆环的颜色
                            }
                        }
                    }

                    ]
                },{
                    name: '外框',
                    type: 'pie',
                    center: ["80%", "54%"],
                    animation: false,
                    clockWise: false,
                    radius:  [70, 68],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            },
                            color: 'RGBA(30, 68, 96, 1)'
                        }
                    },
                    hoverAnimation: false,
                    tooltip: {
                        show: false
                    },
                    data: [{
                        value: 100,
                        name: '02',
                    }, {
                        value: 0,
                        name: 'invisible',
                    }

                    ]
                },


                ]
            };
            return option;
        },
        /*县市区排名*/
        rankEchart: function(name,data){
            /*var dataArr = [
                { name: "天府新区", value: 100 },
                { name: "高新区", value: 99 },
                { name: "龙泉驿区", value: 98.5 },
                { name: "锦江区", value: 95 },
                { name: "青羊区", value: 84 },
                { name: "金牛区", value: 57 },
                { name: "武侯区", value: 35 },
                { name: "成华区", value: 25 },
                { name: "青白江区", value: 20 },
                { name: "东部新区", value: 20 },
                { name: "新都区", value: 15 },
                { name: "温江区", value: 13 },
                { name: "双流区", value: 10 },
                { name: "郫都区", value: 8 },
                { name: "彭州市", value: 5 },
                { name: "简阳市", value: 3 },
                { name: "都江堰市", value: 1 }
            ]*/
            var dataArr = data;
            var dataAxis = dataArr.map(obj => obj.area);
            var TData = dataArr.map(item => Number(item.aqi));
            var max = Math.max(...TData);
            var maxArr = new Array(TData.length).fill(max);

             option = {
                // backgroundColor: '#080b30',
                title: {
                    // text: '区县占比排行榜',
                    textStyle: {
                        align: 'center',
                        color: '#fff',
                        fontSize: 20,
                    },
                    top: '1%',
                    left: 'center'
                },
                grid: {
                    // left: '5%',
                    // right: '3%',
                    top: '2%',
                    bottom: 25,
                    containLabel: true
                },
                xAxis: {
                    show: false,
                    xAxisIndex: 1,
                    splitNumber: 3,
                    type: "value",
                    nameGap: 30,
                    axisTick: {
                        show: true
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                            fontSize: 10
                        }
                    },
                    min: function(value) {
                        return value.min > 2 ? value.min - 2 : value.min;
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(58,78,105,.8)"
                        }
                    }
                },
                yAxis: {
                    type: "category",
                    data: dataAxis,
                    axisTick: {
                        show: false
                    },
                    inverse: true,
                    z: 10,
                    axisLabel: {
                        show: true,
                        color: "#fff",
                        fontSize: dataAxis.length > 10 ? 18 : 22,
                        interval: 0,
                        // formatter: function(value) {
                        //     var idx = dataAxis.indexOf(value);
                        //     return (
                        //         "{label|" +
                        //         value +
                        //         "}" +
                        //         "{sort" +
                        //         (idx < 3 ? idx : "Default") +
                        //         "|" +
                        //         (idx + 1) +
                        //         "}"
                        //     );
                        // },
                        rich: {
                            label: {
                                color: "#fff",
                                fontSize: dataAxis.length > 10 ? 18 : 22,
                                padding: [0, 10, 2, 0],
                                fontWeigth: "normal"
                            },
                            sort0: {
                                color: "#fff",
                                fontSize: 16,
                                width: 20,
                                height: 20,
                                textShadowColor: "rgba(0,0,0,.4)",
                                textShadowBlur: 2,
                                textShadowOffsetX: -1,
                                textShadowOffsetY: 1,
                                shadowColor: "rgba(255,102,31,.26)",
                                verticalAlign: "middle",
                                shadowBlur: 8,
                                shadowOffsetY: 4,
                                fontStyle: "italic",
                                align: "center",
                                backgroundColor: "#ff562e"
                            },
                            sort1: {
                                color: "#fff",
                                fontSize: 16,
                                width: 20,
                                height: 20,
                                textShadowColor: "rgba(0,0,0,.4)",
                                fontStyle: "italic",
                                textShadowBlur: 2,
                                textShadowOffsetX: -1,
                                textShadowOffsetY: 1,
                                shadowColor: "rgba(255,171,41,.26)",
                                verticalAlign: "middle",
                                shadowBlur: 8,
                                shadowOffsetY: 4,
                                align: "center",
                                backgroundColor: "#ff900e"
                            },
                            sort2: {
                                color: "#fff",
                                fontSize: 16,
                                width: 20,
                                height: 20,
                                fontStyle: "italic",
                                textShadowColor: "rgba(0,0,0,.4)",
                                textShadowBlur: 2,
                                textShadowOffsetX: -1,
                                textShadowOffsetY: 1,
                                shadowColor: "rgba(11,175,237,.26)",
                                verticalAlign: "middle",
                                shadowBlur: 8,
                                shadowOffsetY: 4,
                                align: "center",
                                backgroundColor: "#0599de"
                            },
                            sortDefault: {
                                color: "#fff",
                                fontSize: 16,
                                width: 17,
                                padding: [0, 3, 0, 0],
                                height: 20,
                                fontStyle: "italic",
                                textShadowColor: "rgba(0,0,0,.4)",
                                textShadowBlur: 2,
                                textShadowOffsetX: -1,
                                textShadowOffsetY: 1,
                                shadowColor: "rgba(15,191,129,.26)",
                                verticalAlign: "middle",
                                shadowBlur: 8,
                                shadowOffsetY: 4,
                                align: "center",
                                backgroundColor: "#0bbe63"
                            }
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#e4e4e4"
                        }
                    }
                },
                color: ["#ff562e", "#ff900e", "#0599de", "#0bbe63"],
                series: [
                    {
                        type: "bar",
                        barGap: "-100%",
                        barWidth: 6,
                        z: 0,
                        label: {
                            normal: {
                                show: true,
                                position: "right",
                                formatter: function(params) {
                                    var idy = params.dataIndex > 3 ? 3 : params.dataIndex;
                                    return (
                                        /*"{color" + idy + "|" + TData[params.dataIndex] +
                                        "}{u" + idy + "|" + "%}"*/
                                        "{color" + idy + "|" + TData[params.dataIndex] +
                                        "}{u" + idy + "|" + "}"
                                    );
                                },
                                rich: {
                                    color0: {
                                        color: "#ff562e",
                                        fontSize: 24,
                                        verticalAlign: "bottom"
                                    },
                                    color1: {
                                        color: "#ff900e",
                                        fontSize: 24,
                                        verticalAlign: "bottom"
                                    },
                                    color2: {
                                        color: "#0599de",
                                        fontSize: 24,
                                        verticalAlign: "bottom"
                                    },
                                    color3: {
                                        color: "#0bbe63",
                                        fontSize: 24,
                                        verticalAlign: "bottom"
                                    },
                                    u0: {
                                        fontSize: 14,
                                        color: "#ff562e",
                                        padding: 2,
                                        verticalAlign: "bottom"
                                    },
                                    u1: {
                                        color: "#ff900e",
                                        fontSize: 14,
                                        padding: 2,
                                        verticalAlign: "bottom"
                                    },
                                    u2: {
                                        color: "#0599de",
                                        fontSize: 14,
                                        padding: 2,
                                        verticalAlign: "bottom"
                                    },
                                    u3: {
                                        color: "#0bbe63",
                                        fontSize: 14,
                                        padding: 2,
                                        verticalAlign: "bottom"
                                    }
                                }
                            }
                        },
                        tooltip: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5,
                                color: "#e1e7eb"
                            }
                        },
                        data: maxArr
                    },
                    {
                        type: "bar",
                        barGap: "-100%",
                        barWidth: 6,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        z: 8,
                        itemStyle: {
                            barBorderRadius: 5,
                            shadowColor: "rgba(0, 0, 0, 0.1)",
                            shadowBlur: 8,
                            shadowOffsetY: 8,
                            color: params => {
                                // build a color map as your need.
                                //定义一个颜色集合
                                var colorList = ["#ff7a0e", "#ffcb48", "#12c9fe", "#13c1a3"];
                                var colorList2 = ["#ff562e", "#ff900e", "#0599de", "#0bbe63"];
                                //对每个bar显示一种颜色
                                var idx = params.dataIndex < 3 ? params.dataIndex : 3;
                                var colorS = colorList[idx];
                                var colorS2 = colorList2[idx];
                                return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                    { offset: 0, color: colorS },
                                    { offset: 1, color: colorS2 }
                                ]);
                            },
                            emphasis: {
                                barBorderRadius: 5,
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                    { offset: 1, color: "#00ff90" },
                                    { offset: 0, color: "#0084f3" }
                                ])
                            }
                        },
                        data: TData
                    }
                ]
            };
            return option;
        },
        /*
        * 右下角网格图*/
        bargraph: function (name,resData) {//['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
            // app.title = '笛卡尔坐标系上的热力图';

            // var hours = resData['天'];
            // var days = resData['月份'];
            //
            // var data = resData.aqi;
            // data = data.map(function (item) {
            //     return [item[1], item[0], item[2] || '-'];
            // });

            var yNames = resData.month
            var xNames = resData.day;

            var data = resData.aqi;

            option = {
                tooltip: {
                    position: 'top',
                    formatter: function(params) {
                        return  yNames[params.data[1]] +'-' + params.name +' '+ "aqi值:" + params.value[2];
                    },
                },
                // animation: false,
                grid: {
                    height: '50%',
                    // right: '3%',
                },
                // backgroundColor: "black",
                xAxis: {
                    type: 'category',
                    data: xNames,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#A3C7E7",
                        fontSize: 8
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "black", //同背景色
                            width: 1,
                        },
                    },
                },
                yAxis: {
                    type: 'category',
                    data: yNames,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#A3C7E7",
                        fontSize: 8
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "black", //同背景色
                            width: 2,
                        },
                    },
                },
                visualMap: {
                    min: 1,
                    max: 350,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '10%',
                    inRange: {
                        color: ["black",'#7CFC00','#FAFAD2', '#FFA500', '#FF0000', '#DDA0DD','#F4606C'],
                    },
                    textStyle: {
                        color: "#A3C7E7"
                    }
                },
                series: [{
                    name: 'aqi值',
                    type: 'heatmap',
                    data: data,
                    // markPoint: {
                    //     symbol:'pin',
                    //     symbolSize:[20,30],

                    // },
                    // itemStyle: {
                    //     borderColor: "#14313B",
                    //     borderWidth: 4,

                    // },
                    zlevel:-1
                }]
            };
            return option;
        },
        /**
         * 折线图
         * @param title ： 标题<br>
         * @param subtext ：副标题<br>
         * @param data : json 数据
         */
        Line: function (title,data) {
            var option = {
                // backgroundColor: '#394056',
               /* title: {
                    text: '24小时空气质量趋势',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 26,
                        color: '#F1F1F3'
                    },
                    left: '1%',
                    top: '3%',
                    // bottom:'2%'
                },*/
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                legend: {
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: ['AQI', 'CO', 'NO2','O3','PM10','PM25','SO2'],
                    right: '4%',
                    textStyle: {
                        fontSize: 12,
                        color: '#F1F1F3'
                    },
                    selectedMode: 'single',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#F1F1F3'
                        }
                    },
                    data: data.x
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#F1F1F3'
                        }
                    },
                    axisLabel: {
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: [{
                    name: 'AQI',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(137, 189, 27, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(137, 189, 27, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(137,189,27)',
                            label : {show: true}
                        }
                    },
                    data: data.AQI
                }, {
                    name: 'CO',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(0,136,212)',
                            label : {show: true}
                        }
                    },
                    data: data.CO
                }, {
                    name: 'O3',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(219, 50, 51, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(219, 50, 51, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(219,50,51)',
                            label : {show: true}
                        }
                    },
                    data: data.O3
                }, {
                    name: 'PM10',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255,165,0, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(255,165,0, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(255,165,0)',
                            label : {show: true}
                        }
                    },
                    data: data.PM10
                }, {
                    name: 'PM25',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(138,43,226, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(138,43,226, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(138,43,226)',
                            label : {show: true}
                        }
                    },
                    data: data.PM25
                },  {
                    name: 'SO2',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255,99,71, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(255,99,71, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(255,99,71)',
                            label : {show: true}
                        }
                    },
                    data: data.SO2
                },]
            };
            return option;
        },
        test:function(){
            var option ={
                title:{
                    text:"我是胖子"
                }
            }
            return option;
        },
        /*
   * 污染物分析*/
        radar:function(title,data) {
                var option = {
                    // backgroundColor: '#32374d',
                    title: [{
                        // text: 'infographic chart✍',
                        x: '50%',
                        y: 30,
                        textAlign: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: '100',
                            color: '#FFF',
                            textAlign: 'center',
                        },
                    }, ],
                    legend: {
                        top: '16%',
                        textStyle: {
                            color: '#a4a8b4'
                        },
                    },
                    grid: {
                        left: '1%',
                        top: '32%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.3)'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            // margin: 10,
                            color: '#a4a8b4',
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: ['建安区兴业大厦','芙蓉广场', '许昌学院', '市一中', '开发区', '监测站'],
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(255,255,255,0.3)'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            // margin: 10,
                            color: '#a4a8b4',
                        }
                    },
                    color: [
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgba(178,255,204,.8)'
                        },
                            // {
                            //     offset: 0.8,
                            //     color: 'rgba(77,75,221,.8)'
                            // },
                            // {
                            //     offset: 1,
                            //     color: 'rgba(77,75,221,0)'
                            // }
                        ]),
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgba(196,205,255,.8)'
                        },
                            // {
                            //     offset: 0.8,
                            //     color: 'rgba(246,84,157,.8)'
                            // },
                            // {
                            //     offset: 1,
                            //     color: 'rgba(246,84,157,0)'
                            // }
                        ]),
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgba(128,255,169,.8)'
                        },
                            // {
                            //     offset: 0.8,
                            //     color: 'rgba(106,185,242,.8)'
                            // },
                            // {
                            //     offset: 1,
                            //     color: 'rgba(106,185,242,0)'
                            // }
                        ]),
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgba(255,225,193,.8)'
                        },
                            // {
                            //     offset: 0.8,
                            //     color: 'rgba(106,185,242,.8)'
                            // },
                            // {
                            //     offset: 1,
                            //     color: 'rgba(106,185,242,0)'
                            // }
                        ]),
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgba(86,214,255,.8)'
                        },
                            // {
                            //     offset: 0.8,
                            //     color: 'rgba(106,185,242,.8)'
                            // },
                            // {
                            //     offset: 1,
                            //     color: 'rgba(106,185,242,0)'
                            // }
                        ]),
                        new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                            offset: 0,
                            color: 'rgba(177,206,31,.8)'
                        },
                        ]),
                    ],
                    series: [{
                        name: '',
                        type: 'bar',
                        xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
                        yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
                        data: [100, 100, 100, 100, 100, 100],
                        barWidth: 5,
                        itemStyle: {
                            normal: {
                                color: 'rgba(255, 255, 255, .1)',
                            },
                        },
                        z: 1
                    },
                        {
                            name: 'CO',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 25,
                            itemStyle: {
                                shadowColor: '#000',
                                shadowBlur: 10,
                                shadowOffsetY: 0,
                                shadowOffsetX: 0,
                                borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(102,255,124,.8)'
                                    },
                                        {
                                            offset: 0.8,
                                            color: 'rgba(106,185,242,.8)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(106,185,242,0)'
                                        }
                                    ],
                                    false
                                ),
                                borderWidth: 1,
                            },
                            /*label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    offset: [-20, 0],
                                    // formatter: '{c}%',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor:'#000',
                                        textShadowBlur:'0',
                                        textShadowOffsetX:1,
                                        textShadowOffsetY:1,
                                    }
                                },
                            },*/
                            data: data.co
                        },
                        {
                            name: 'O3',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 25,
                            itemStyle: {
                                shadowColor: '#000',
                                shadowBlur: 10,
                                shadowOffsetY: 0,
                                shadowOffsetX: 0,
                                borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(102,255,124,.8)'
                                    },
                                        {
                                            offset: 0.8,
                                            color: 'rgba(106,185,242,.8)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(106,185,242,0)'
                                        }
                                    ],
                                    false
                                ),
                                borderWidth: 1,
                            },
                           /* label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    offset: [-20, 0],
                                    // formatter: '{c}%',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor:'#000',
                                        textShadowBlur:'0',
                                        textShadowOffsetX:1,
                                        textShadowOffsetY:1,
                                    }
                                },
                            },*/
                            data: data.o3
                        },
                        {
                            name: 'PM10',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 25,
                            itemStyle: {
                                shadowColor: '#000',
                                shadowBlur: 10,
                                shadowOffsetY: 0,
                                shadowOffsetX: 0,
                                borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(102,255,124,.8)'
                                    },
                                        {
                                            offset: 0.8,
                                            color: 'rgba(106,185,242,.8)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(106,185,242,0)'
                                        }
                                    ],
                                    false
                                ),
                                borderWidth: 1,
                            },
                            /*label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    offset: [-20, 0],
                                    // formatter: '{c}%',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor:'#000',
                                        textShadowBlur:'0',
                                        textShadowOffsetX:1,
                                        textShadowOffsetY:1,
                                    }
                                },
                            },*/
                            data: data.pm10
                        },
                        {
                            name: 'PM2.5',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 15,
                            itemStyle: {
                                // shadowColor: '#000',
                                // shadowBlur: 10,
                                shadowOffsetY: 0,
                                shadowOffsetX: 0,
                                borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(240,82,255,1)'
                                    },
                                        {
                                            offset: 0.8,
                                            color: 'rgba(77,75,221,1)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(77,75,221,0)'
                                        }
                                    ],
                                    false
                                ),
                                borderWidth: 1,
                            },
                            /*label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    offset: [-20, 0],
                                    formatter: '{c}%',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor:'#000',
                                        textShadowBlur:'0',
                                        textShadowOffsetX:1,
                                        textShadowOffsetY:1,
                                    }
                                },
                            },*/
                            data: data.pm25
                        },
                        {
                            name: 'SO2',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 25,
                            itemStyle: {
                                shadowColor: '#000',
                                shadowBlur: 10,
                                shadowOffsetY: 0,
                                shadowOffsetX: 0,
                                borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(255,151,60,.8)'
                                    },
                                        {
                                            offset: 0.8,
                                            color: 'rgba(246,84,157,.8)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(246,84,157,0)'
                                        }
                                    ],
                                    false
                                ),
                                borderWidth: 1,
                            },
                            /*label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    offset: [-20, 0],
                                    // formatter: '{c}%',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor:'#000',
                                        textShadowBlur:'0',
                                        textShadowOffsetX:1,
                                        textShadowOffsetY:1,
                                    }
                                },
                            },*/
                            data: data.so2
                        },
                        {
                            name: 'NO2',
                            type: 'bar',
                            stack: 'Tik Tok',
                            barWidth: 25,
                            itemStyle: {
                                shadowColor: '#000',
                                shadowBlur: 10,
                                shadowOffsetY: 0,
                                shadowOffsetX: 0,
                                borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                        offset: 0,
                                        color: 'rgba(102,255,124,.8)'
                                    },
                                        {
                                            offset: 0.8,
                                            color: 'rgba(106,185,242,.8)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(106,185,242,0)'
                                        }
                                    ],
                                    false
                                ),
                                borderWidth: 1,
                            },
                            /*label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight',
                                    offset: [-20, 0],
                                    // formatter: '{c}%',
                                    textStyle: {
                                        align: 'center',
                                        baseline: 'middle',
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: '#fff',
                                        textShadowColor:'#000',
                                        textShadowBlur:'0',
                                        textShadowOffsetX:1,
                                        textShadowOffsetY:1,
                                    }
                                },
                            },*/
                            data: data.no2
                        },
                        {
                            name: '',
                            type: 'bar',
                            data: [100, 100, 100, 100, 100, ],
                            barWidth: 10,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(255, 255, 255, .1)',
                                },
                            },
                            z: 1
                        },
                    ]
                };
            return option;
        },
        /*
        * 右边第二个*/
        radarpie:function(data) {
            var xData = function() {
                var data = [];
                for (var i = 1; i < 13; i++) {
                    data.push(i + "月份");
                }
                return data;
            }();

            option = {
                // "backgroundColor":'#152439',
                "tooltip": {
                    "axisPointer": {
                        "type": "shadow",
                        textStyle: {
                            color: "#fff"
                        }
                    },
                },
                "grid": {
                    "borderWidth": 0,
                    "top": 40,
                    "bottom": 20,
                    "left": 60,
                    textStyle: {
                        color: "#fff"
                    }
                },
                "legend": {
                    icon: 'circle',
                    right: '4%',
                    top: '8%',
                    textStyle: {
                        color: '#90979c',
                    },
                    "data": ['SO2', 'NO2', 'PM2.5'],
                    selectedMode: 'single',
                },
                "calculable": true,
                "yAxis": [{
                    "type": "value",
                    "trigger": "axis",
                    "axisLine": {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,
                    },
                    "data": xData,
                }],
                "xAxis": [{
                    "type": "category",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,

                    },
                    "splitArea": {
                        "show": false
                    },
                    data: ['华能电气', '宏伟热力', '君元发业', '泓旭电气', '三叶印务'],
                }],
                "series": [{
                    "name": "SO2",
                    "type": "bar",
                    "stack": "总量",
                    "barMaxWidth": 15,
                    "barGap": "10%",
                    "itemStyle": {
                        "normal": {
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: 'rgba(245,221,111,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(245,221,111,0)'
                            }]),
                            borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: 'rgba(245,221,111,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(245,221,111,0)'
                            }]),
                        }
                    },
                    "data": [709, 1917, 2455, 2610, 1719],
                },
                    {
                        "name": "NO2",
                        "type": "bar",
                        "stack": "总量",
                        "barMaxWidth": 15,
                        "barGap": "10%",
                        "itemStyle": {
                            "normal": {
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(24,191,207,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(24,191,207,0)'
                                }]),
                                borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(24,191,207,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(24,191,207,0)'
                                }]),
                            }
                        },
                        "data": [327, 1776, 507, 1200, 800]
                    },
                    {
                        "name": "PM2.5",
                        "type": "bar",
                        "stack": "总量",
                        "barMaxWidth": 15,
                        "barGap": "10%",
                        "itemStyle": {
                            "normal": {
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(98,113,228,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(40,54,117,0)'
                                }]),
                                borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(98,113,228,1)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(40,54,117,0)'
                                }]),
                                "barBorderRadius": 0,
                            }
                        },
                        "data": [327, 1776, 507, 1200, 800]
                    }
                ]
            }
            return option;
        },
        /*
     * 右边第三个*/
        radarBottomPie:function(data1) {
            var data = [
                {
                    value: 100,
                    name: '重度',
                },
                {
                    value: 100,
                    name: '中度',
                },
                {
                    value: 90,
                    name: '轻度',
                },
                {
                    value: 90,
                    name: '优秀',
                },
                {
                    value: 100,
                    name: '良好',
                },
            ],
                option = {
                    // backgroundColor: '#022457',
                    color: ['#D63838', '#EF6F59', '#F2E38C','#5CDBE5','#5DE27C'],
                    "legend": {
                        width: "70%",
                        left: "center",
                        top:"64%",
                        icon: "circle",
                        textStyle: {
                            fontSize: 12,
                            color: '#F1F1F3'
                        },
                        // "data": ['未执行', '已执行', '执行中'],
                        data: data,
                    },
                    title: [
                        {
                            text: '占比',
                            subtext: 'PERCENT',
                            top: '24%',
                            left: '49%',
                            textAlign: 'center',
                            itemGap: 5,
                            subtextStyle: {
                                color: '#fff',
                                fontSize: 16,
                                align: 'center',
                            },
                            textStyle: {
                                color: '#f4e051',
                                fontSize: 26,
                            },
                        },
                    ],
                    series: [
                        //环形
                        {
                            name: '基础饼图',
                            type: 'pie',
                            radius: ['45%', '52%'],
                            center: ['50%', '28%'],
                            hoverAnimation: false,
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
                                        padding: [-30, 15, -20, 15]
                                    }
                                }
                            },
                            /*label: {
                                normal: {
                                    show: true,
                                },
                                emphasis: {
                                    show: true,
                                },
                            },*/
                            zlevel: 1,
                            labelLine: {
                                normal: {
                                    show: true,
                                },
                            },
                            data: data,
                        },
                        //环形分割线
                        {
                            name: '分割线',
                            type: 'gauge',
                            radius: '55%',
                            clockwise: true,
                            startAngle: '90',
                            center: ['50%', '28%'],
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
                                length: 15,
                                padding: [0, 0, 0],
                                lineStyle: {
                                    color: '#061436',
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
                            radius: ['41%', '41.5%'],
                            center: ['50%', '28%'],
                            hoverAnimation: false,
                            clockWise: false,
                            itemStyle: {
                                normal: {
                                    color: '#358CAA',
                                },
                            },
                            label: {
                                show: false,
                            },
                            data: [100],
                        },
                        {
                            type: 'pie',
                            name: '外层细圆环',
                            radius: ['55%', '55.5%'],
                            center: ['50%', '28%'],
                            hoverAnimation: false,
                            clockWise: false,
                            itemStyle: {
                                normal: {
                                    color: '#358CAA',
                                },
                            },
                            label: {
                                show: false,
                            },
                            data: [100],
                        },
                    ],
                };
            return option;
        }
    },

    /**
     *添加Id
     * @param option : option
     * @param echartId : string 需要加引号
     */
    initChart: function (option, echartId) {
        var container = eval("document.getElementById('" + echartId + "')");
        var myChart = echarts.init(container);
        myChart.setOption(option, true);	// 为echarts对象加载数据
        return myChart;
    }


};
function translateColor(index) {
    if (index > 5) {
        return translateColor(index - 5)
    }
    return index
}
