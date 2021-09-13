var map = new AMap.Map('container', {
    zoom: 11.43,
    center: [120.2446746826172, 30.199146446037616],
    pitch: 55,
    rotation: 20,
    // showLabel: true,
    viewMode: '3D',
    mapStyle: 'amap://styles/62552e0c6e791d4374f1072c702a6787',
});
var loca = new Loca.Container({
    map
});

loca.ambLight = {
    intensity: 0.4,
    color: '#ced5ed',
};
loca.dirLight = {
    intensity: 0.02,
    color: '#666',
    target: [10, 10, 10],
    position: [0, -1, 0.1],
};
loca.pointLight = {
    color: 'rgb(155,173,80)',
    position: [120.14133, 30.246611, 20000],
    intensity: 2.2,
    // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
    distance: 40000,
};

var geo = new Loca.GeoJSONSource({
    url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_road_level.json',
});

var ll = new Loca.HexagonLayer({
    // loca,
    zIndex: 10,
    opacity: 1,
    visible: true,
    zooms: [2, 22],
    acceptLight: true,
});

var colors = ['#F4FFB3', '#BFDDA8', '#96CA8D', '#75BA89', '#5EAC86', '#4D9A96', '#3F748F', '#1D3748'].reverse();
var heights = [100, 200, 300, 900, 1000, 1200, 1500, 3000];
ll.setSource(geo);

// 计算路口rank之和
function sum(arr) {
    var sum = 0;
    arr.forEach(a => {
        sum += a.properties.rank;
    });
    return sum;
}

ll.setStyle({
    unit: 'meter',
    radius: 120,
    gap: 0,
    altitude: 0,
    height: function (index, feature) {
        var ranks = sum(feature.coordinates);
        // return ranks < 60 ? heights[2] : heights[6];
        return ranks < 20 ?
            heights[0] : ranks < 40 ?
                heights[1] : ranks < 60 ?
                    heights[2] : ranks < 80 ?
                        heights[3] : ranks < 100 ?
                            heights[4] : ranks < 120 ?
                                heights[5] : ranks < 130 ?
                                    heights[6] : heights[7];
    },
    topColor: function (index, feature) {
        var ranks = sum(feature.coordinates);
        // return ranks < 60 ? colors[1] : colors[6];
        return ranks < 20 ?
            colors[0] : ranks < 40 ?
                colors[1] : ranks < 60 ?
                    colors[2] : ranks < 80 ?
                        colors[3] : ranks < 100 ?
                            colors[4] : ranks < 120 ?
                                colors[5] : ranks < 130 ?
                                    colors[6] : colors[7];
    },
    sideColor: function (index, feature) {
        var ranks = sum(feature.coordinates);
        // return ranks < 60 ? colors[1] : colors[6];
        return ranks < 20 ?
            colors[0] : ranks < 40 ?
                colors[1] : ranks < 60 ?
                    colors[2] : ranks < 80 ?
                        colors[3] : ranks < 100 ?
                            colors[4] : ranks < 120 ?
                                colors[5] : ranks < 130 ?
                                    colors[6] : colors[7];
    }
})
loca.add(ll);

// 图例
var lengend = new Loca.Legend({
    loca: loca,
    title: {
        label: '延误指数',
        fontColor: 'rgba(255,255,255,0.4)',
        fontSize: '16px'
    },
    style: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        left: '20px',
        bottom: '40px',
        fontSize: '12px'
    },
    dataMap: [
        { label: '> 130', color: colors[7] },
        { label: '< 130', color: colors[6] },
        { label: '< 120', color: colors[5] },
        { label: '< 100', color: colors[4] },
        { label: '< 80', color: colors[3] },
        { label: '< 60', color: colors[2] },
        { label: '< 40', color: colors[1] },
        { label: '< 20', color: colors[0] },
    ],
});

var dat = new Loca.Dat();
dat.addLight(loca.ambLight, loca, '环境光');
dat.addLight(loca.dirLight, loca, '平行光');
dat.addLight(loca.pointLight, loca, '点光');
