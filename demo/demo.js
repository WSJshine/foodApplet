var stationList=[];
var cityList=[];
var marker;
var myGroup;

function initDemoMap(){
    var Esri_WorldImagery = L.tileLayer(
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // var Esri_DarkGreyCanvas = L.tileLayer(
    //     "http://{s}.sm.mapstack.stamen.com/" +
    //     "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
    //     "{z}/{x}/{y}.png",
    //     {
    //         attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
    //         'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    //     }
    // );

    var Esri_DarkGreyCanvas = L.tileLayer(
        // 'https://api.mapbox.com/styles/v1/wsjyztx123/ckp20z1mp3c5517pg43x4gzwg.html?fresh=true&title=view&access_token=pk.eyJ1Ijoid3NqeXp0eDEyMyIsImEiOiJja3AxeHBlZGoxZmlhMm9td2J5dmg1cHRuIn0.qBQjzkyqmfYY2p--az8QaA',
        // 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {

        })

	/**
	 * 高德地图
	 */
	var Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
		maxZoom: 26,
		minZoom: 3
	});
	var Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
		maxZoom: 26,
		minZoom: 3
	});
	var Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
		maxZoom: 26,
		minZoom: 3
	});
	var Gaodimage = L.layerGroup([Gaodimgem, Gaodimga]);


    var baseLayers = {
		"高德地图": Gaode,
		"高德影像": Gaodimage,
        "卫星图": Esri_WorldImagery,
        "智能地图": Esri_DarkGreyCanvas,
		"GeoQ ": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'),
		"GeoQ 藏蓝": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'),
		"GeoQ 灰": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}')

	};
    // var corner1 =  L.latLng(latitude, longitude); //设置左上角经纬度
    // var corner2 = L.latLng(latitude, longitude);	//设置右下点经纬度
    // var bounds = L.latLngBounds(corner1, corner2); //构建视图限制范围
    // var map = L.map('map',{
    //     crs: L.CRS.EPSG3857, //wgs1984坐标系
    //     maxBounds: bounds
    // });
    var map = L.map('map', {
        layers: [ Gaodimage ],
        zoomDelta: 0.25,
        zoomSnap: 0,
        minZoom: 4.5,
        maxZoom: 18.371227759554305,
		zoom: 4,
		center: [30.050709,113.870062],
		// zoomControl: false
        // crs: L.CRS.EPSG3857, //wgs1984坐标系
        // maxBounds: bounds

    });

	map.on('zoomend ', function (e) {
		let zoom = map.getZoom();

		if (zoom > 8) {
			myGroup.clearLayers();
			// map.removeLayer(marker)
			console.log('大于8级了',zoom)

			/*for(let i = 0;i<stationList.length;i++){
				L.marker([stationList[i].latitude,stationList[i].longitude]).addTo(map)
					.bindPopup("stationList[i].latitude<br>").openPopup();
			}*/
			var layers=[];

			for(let i = 0;i<stationList.length;i++){
				var className = '';

					if(stationList[i].aqi > 0 && stationList[i].aqi<50){
						className = 'highlight-div-icon_zk-one';
					}else if(stationList[i].aqi >= 50 && stationList[i].aqi<100){
						className = 'highlight-div-icon_zk-two';
					}else if(stationList[i].aqi >= 100 && stationList[i].aqi<150){
						className = 'highlight-div-icon_zk-three';
					}else if(stationList[i].aqi >= 150 && stationList[i].aqi<200){
						className = 'highlight-div-icon_zk-four';
					}else if(stationList[i].aqi >= 200 && stationList[i].aqi<300){
						className = 'highlight-div-icon_zk-five';
					}else if(stationList[i].aqi >= 300){
						className = 'highlight-div-icon_zk-six';
					}else {
						className = 'highlight-div-icon_zk-seven';
					}



				var layer = new L.marker([ stationList[i].latitude,stationList[i].longitude ],{
					icon: L.divIcon({
						className: className,
						html: stationList[i].aqi,
						iconSize: [45, 38],
					})
				}).addTo(map).bindPopup("<span>"+stationList[i].city+"·"+stationList[i].station+'　'+stationList[i].pubtime+"</span><br>"+
					"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+stationList[i].pm25Color+";padding: 2px'>PM2.5</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+stationList[i].pm10Color+";padding: 2px'>PM10</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+stationList[i].so2Color+";padding: 2px'>SO2</span>"+
					"<span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+stationList[i].no2Color+";padding: 2px'>NO2</span></div>"+
					"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+stationList[i].pm25+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+stationList[i].pm10+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+stationList[i].so2+"</span>"+
					"<span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+stationList[i].no2+"</span></div>"+
					"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+stationList[i].coColor+";padding: 2px'>CO</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+stationList[i].o3Color+";padding: 2px'>O3</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+stationList[i].aqiColor+";padding: 2px'>AQI</span>"+
					"</div>"+
					"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+stationList[i].co+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+stationList[i].o3+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+stationList[i].aqi+"</span>"+
					"</div>");
				layers.push(layer);
			}
			myGroup=L.layerGroup(layers);
			map.addLayer(myGroup);

		}
		else if (zoom <= 8) {
			console.log('小于10级了',zoom)
			myGroup.clearLayers();
			var layers=[];
			for(let i = 0;i<cityList.length;i++){
				var className = '';
				if(cityList[i].aqi<50){
					className = 'highlight-div-icon_zk-one';
				}else if(cityList[i].aqi >= 50 && cityList[i].aqi<100){
					className = 'highlight-div-icon_zk-two';
				}else if(cityList[i].aqi >= 100 && cityList[i].aqi<150){
					className = 'highlight-div-icon_zk-three';
				}else if(cityList[i].aqi >= 150 && cityList[i].aqi<200){
					className = 'highlight-div-icon_zk-four';
				}else if(cityList[i].aqi >= 200 && cityList[i].aqi<300){
					className = 'highlight-div-icon_zk-five';
				}else {
					className = 'highlight-div-icon_zk-six';
				}

					var layer = new L.marker([ cityList[i].latitude,cityList[i].longitude ],{
						icon: L.divIcon({
							className: className,
							html: '' + cityList[i].aqi,
							iconSize: [45, 38],
						})
					}).addTo(map).bindPopup("<span>"+cityList[i].city+""+cityList[i].pubtime+"</span><br>"+
						"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+cityList[i].pm25Color+";padding: 2px'>PM2.5</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+cityList[i].pm10Color+";padding: 2px'>PM10</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+cityList[i].so2Color+";padding: 2px'>SO2</span>"+
						"<span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+cityList[i].no2Color+";padding: 2px'>NO2</span></div>"+
						"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+cityList[i].pm25+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+cityList[i].pm10+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+cityList[i].so2+"</span>"+
						"<span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+cityList[i].no2+"</span></div>"+
						"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+cityList[i].coColor+";padding: 2px'>CO</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+cityList[i].o3Color+";padding: 2px'>O3</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color:"+cityList[i].aqiColor+";padding: 2px'>AQI</span>"+
						"</div>"+
						"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+cityList[i].co+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+cityList[i].o3+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+cityList[i].aqi+"</span>"+
						"</div>");
					layers.push(layer);


			}
			myGroup=L.layerGroup(layers);
			map.addLayer(myGroup);
		}
	});
	var layerControl = L.control.layers(baseLayers);
    layerControl.addTo(map);

    map.setView([39.00, 114.44], 3);


    return {
        map: map,
        layerControl: layerControl
    };
}

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
var handleError = function(err){
    console.log('handleError...');
    console.log(err);
};

WindJSLeaflet.init({
	localMode: true,
	map: map,
	layerControl: layerControl,
	useNearest: false,
	timeISO: null,
	nearestDaysLimit: 7,
	displayValues: true,
	displayOptions: {
		displayPosition: 'bottomleft',
		displayEmptyString: 'No wind data'
	},
	overlayName: 'wind11',

	// https://github.com/danwild/wind-js-server
	pingUrl: 'http://localhost:7000/alive',
	latestUrl: 'http://localhost:7000/latest',
	nearestUrl: 'http://localhost:7000/nearest',
	errorCallback: handleError
});

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
	ws.close();
}

function reconnect(url) {
	if(lockReconnect) return;
	lockReconnect = true;
	setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
		createWebSocket(url);
		lockReconnect = false;
	}, 2000);
}

/*
* @name：WebSocket实时获取数据
* */
var lockReconnect = false;  //避免ws重复连接
var ws = null;          // 判断当前浏览器是否支持WebSocket
var wsUrl = "ws://222.143.158.168:9294/Environment/socket/webSocket/"+new Date().getTime();
// var wsUrl = "ws://172.168.10.109:9294/socket/webSocket/"+new Date().getTime();
// createWebSocket(wsUrl);   //连接ws

function createWebSocket() {
	try{
		if('WebSocket' in window){
			ws = new WebSocket(wsUrl);
		}
		initEventHandle();
	}catch(e){
		reconnect(wsUrl);
		console.log(e);
	}
}
let aaa = [];//旧的
let bbb = [];//新的
let ccc = [];//组合到一起的
function initEventHandle() {
	ws.onclose = function () {
		reconnect(wsUrl);
		console.log("llws连接关闭!"+new Date().toLocaleString());
	};
	ws.onerror = function () {
		reconnect(wsUrl);
		console.log("llws连接错误!");
	};
	ws.onopen = function () {
		heartCheck.reset().start();      //心跳检测重置
		console.log("llws连接成功!"+new Date().toLocaleString());
	};
	ws.onmessage = function (event) {    //如果获取到消息，心跳检测重置
 	// console.log("llws收到消息啦11:" +event.data);
		heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的

		if(event.data!=='pong'){

			let data=JSON.parse(event.data);
			// ShowWeather(7,data.weather)
			// MyEcharts.initChart(MyEcharts.EchartsOption.Line('name',data.city24), "SmallEChartsbottom1")
			MyEcharts.initChart(MyEcharts.EchartsOption.Line('name',data.city24), "bottomLeft")
			/*县市区排名 */
			MyEcharts.initChart(MyEcharts.EchartsOption.rankEchart('name',data.AQIRanking), "myRank")
			cityList = data.cityList;
			stationList = data.stationList;


			var layers=[];
			for(let i = 0;i<data.cityList.length;i++){
				// let html = i>-1?'<div>'+(i+1)+'<div>':'<div><div>'
				// var myIcon = L.divIcon({
				// 	html: html,
				// 	className: className,
				// 	//图标大小
				// 	iconSize: [16, 16],
				// });
				var className = '';
				if(data.cityList[i].aqi<50){
					 className = 'highlight-div-icon_zk-one';
				}else if(data.cityList[i].aqi >= 50 && data.cityList[i].aqi<100){
					 className = 'highlight-div-icon_zk-two';
				}else if(data.cityList[i].aqi >= 100 && data.cityList[i].aqi<150){
					 className = 'highlight-div-icon_zk-three';
				}else if(data.cityList[i].aqi >= 150 && data.cityList[i].aqi<200){
					 className = 'highlight-div-icon_zk-four';
				}else if(data.cityList[i].aqi >= 200 && data.cityList[i].aqi<300){
					 className = 'highlight-div-icon_zk-five';
				}else {
					 className = 'highlight-div-icon_zk-six';
				}
				// var className = 'highlight-div-icon_zk';

					var layer = new L.marker([ data.cityList[i].latitude,data.cityList[i].longitude ],{
						icon: L.divIcon({
							className: className,
							html: '' + data.cityList[i].aqi,
							iconSize: [45, 38],
						})
					}).addTo(map).bindPopup("<span>"+data.cityList[i].city+""+data.cityList[i].pubtime+"</span><br>"+
						"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+data.cityList[i].pm25Color+";padding: 2px'>PM2.5</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+data.cityList[i].pm10Color+";padding: 2px'>PM10</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color:"+data.cityList[i].so2Color+";padding: 2px'>SO2</span>"+
						"<span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color:  "+data.cityList[i].no2Color+";padding: 2px'>NO2</span></div>"+
						"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+data.cityList[i].pm25+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+data.cityList[i].pm10+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+data.cityList[i].so2+"</span>"+
						"<span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+data.cityList[i].no2+"</span></div>"+
						"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+data.cityList[i].coColor+";padding: 2px'>CO</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+data.cityList[i].o3Color+";padding: 2px'>O3</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;background-color: "+data.cityList[i].aqiColor+";padding: 2px'>AQI</span>"+
						"</div>"+
						"<div style='margin-top: 5px'><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+data.cityList[i].co+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+data.cityList[i].o3+"</span><span style='display:inline-block;width:40px;text-align:center;margin-left: 2px;padding: 2px'>"+data.cityList[i].aqi+"</span>"+
						"</div>");
					layers.push(layer);


			}
			myGroup=L.layerGroup(layers);
			map.addLayer(myGroup);
			document.getElementById("weather-left-name").innerText = data.city[0].quality;
			document.getElementById("weather-left-name1").innerText = 'AQI指数：' + data.city[0].aqi;
			document.getElementById("weather-left-name2").innerText =  data.city[0].pollutions;
			document.getElementById("weather-left-name3").innerText =  data.city[0].concentration+'μg/m³';
			document.getElementById("myPM25").innerText =  data.city[0].pm25;
			document.getElementById("weather-left-name11").innerText =  '更新时间：'+data.city[0].pubtime;


		}
	};
}

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
	ws.close();
}

function reconnect(url) {
	if(lockReconnect) return;
	lockReconnect = true;
	setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
		createWebSocket(url);
		lockReconnect = false;
	}, 2000);
}
//心跳检测
var heartCheck = {
	timeout: 60000,        //1分钟发一次心跳
	timeoutObj: null,
	serverTimeoutObj: null,
	reset: function(){
		clearTimeout(this.timeoutObj);
		clearTimeout(this.serverTimeoutObj);
		return this;
	},
	start: function(){
		var self = this;
		this.timeoutObj = setTimeout(function(){
			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			//onmessage拿到返回的心跳就说明连接正常
			ws.send("ping");
			console.log("ping!")
			self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
				ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
			}, self.timeout)
		}, this.timeout)
	}
}
$(".chose_enter").click(function () {
	console.log('要切换百度')
	// $('#visual_chart_map').css('visibility','hidden');
	// $("#main8").show();
	// $("#map").hide();
	$(".visual_chart_bdMap").show();
	$(".visual_chart_leafMap").hide();
	//
	// $("#visual_chart_map").css("display", "none");
});
$(".chose_enter_map").click(function () {

	// $("#map").show();
	// $("#main8").hide();
	$(".visual_chart_bdMap").hide();
	$(".visual_chart_leafMap").show();
});
/*function showBDMap() {
	console.log('要切换百度')
	$("#visual_chart_bdMap").show();
	$("#visual_chart_map").hide();
	/!*map.eachLayer(layer=>{
		console.log(layer)
	})
	map.eachLayer(function (layer) {
		if (!layer._container || ('' + jQuery(layer._container).attr('class')).replace(/\s/g, '') != 'leaflet-layer') {
			layer.remove();
		}
	});*!/

}*/
