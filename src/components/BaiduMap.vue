<template>
	<div id="map" :style="{height:mapHeight}">
		<div id="allmap" ref="allmap"></div>
	</div>
</template>
<script>
	import {defineAsyncComponent} from 'vue'
	export default {
		name: "BaiduMap", 
		methods: {
			map() {
				let map = new window.BMap.Map(this.$refs.allmap); // 创建Map实例
				map.centerAndZoom(new window.BMap.Point(113.58255479, 22.27656465), 11); // 初始化地图,设置中心点坐标和地图级别
				map.addControl(
					new window.BMap.MapTypeControl({
						// 添加地图类型控件
						mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP],
					})
				);
				// map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
				map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
			},
			initMapHeight() {
				var main = document.getElementById("map");
				main.style.height = window.innerHeight + "px";
			},
		},
		data() {
			return {
				mapHeight: 800 + "px",
			};
		},
		mounted() {
			this.initMapHeight();
			this.map();
			window.onresize = () => {
				return (() => {
					this.mapHeight = window.innerHeight + 'px';
				})();
			};
		},
	};
</script>
<style>
	#allmap {
		height: 100%;
		overflow: hidden;
	}
</style>