







/**************算数公式********************/
/**
 * 
 * @param {Object} xy 当前元素坐标
 * @param {Object} x_y 当前鼠标点击坐标
 * @param {Object} speed
 */
function countRoute(xy,x_y,speed){
	var loc_x = Math.abs(xy.x-x_y.x);
	var loc_y = Math.abs(xy.y-x_y.y);
	var c = Math.floor(Math.sqrt(loc_x*loc_x+loc_y*loc_y));
	var a = Math.floor(speed*loc_x/c);
	var b = Math.floor(speed*loc_y/c);
	return {
		// x轴
		a : a,
		// y轴
		b : b,
		// 斜边
		c : c
	};
	
}

/**************点击，移动********************/
/**
 * 
 * @param {Object} spore 孢子对象
 * @param {Object} x_y	 鼠标点击坐标
 */
function move(spore,x_y,arr,len){
	var ele = spore.create();
	clearInterval(window.inter);
	window.inter = setInterval(constant,50,true);
	var weight_div = document.getElementById("weight");
	function constant(){
		var type = 0;
		var style_c = window.getComputedStyle(ele,null);
		var x_c = parseInt(style_c.left);
		var y_c = parseInt(style_c.top);
		var abc = countRoute({x : x_c,y : y_c},x_y,spore.speed);
		var l = 0;
		///////////////////////EAT////////////////////////////
		var xy = spore.getCenter();
		for(var i = 0; i < arr.length; i++){
			if(arr[i] != null){
				var x_ = Math.pow(Math.abs(xy.x - arr[i].x),2);
				var y_ = Math.pow(Math.abs(xy.y - arr[i].y),2);
				var Dvalue = Math.floor(Math.sqrt(x_+y_));
				if(Dvalue < (spore.length/2-5)){
					/**
					 * 该元素消失，
					 * mySpore 体重加一
					 */
					document.documentElement.removeChild(arr[i].ele);
					arr[i] = null;
					spore.weight = spore.weight+1;
					--len.l;
 					weight_div.innerHTML = spore.weight + "kg | " + len.l;
// 					if(spore.juess.a && spore.weight >= 30){
// 						spore.juess.a = false;
// 						spore.speed -= 1;
// 						spore.width += 100;
// 						spore.height += 100;
// 					}
				}
			}
		}
		//////////////////////////////////////////////
		if(spore.juess.a && spore.weight >=30){
			spore.speed = spore.speed - 1;
			spore.juess.a = false;
			var style_ = window.getComputedStyle(spore.ele,null);
			document.documentElement.removeChild(spore.ele);
			spore.ele = null;
			
			spore.change = false;
		}
		
		
		////////////////////////////////////////////////////
		
		if(parseInt(style_c.left) > x_y.x){
			if(parseInt(style_c.top) > x_y.y){
				type = 0;
				ele.style.left = parseInt(style_c.left) - abc.a + "px" ;
				ele.style.top = parseInt(style_c.top) - abc.b + "px";
			}else{
				type = 1;
				ele.style.left = parseInt(style_c.left) - abc.a + "px";
				ele.style.top = parseInt(style_c.top) + abc.b + "px";
			}
		}else{
			if(parseInt(style_c.top) > x_y.y){
				type = 2;
				ele.style.left = parseInt(style_c.left) + abc.a + "px";
				ele.style.top = parseInt(style_c.top) - abc.b + "px";
			}else{
				type = 3;
				ele.style.left = parseInt(style_c.left) + abc.a + "px";
				ele.style.top = parseInt(style_c.top) + abc.b + "px";
			}
		}
		l=l+spore.speed;
		if(type == 0){
			if(l+spore.speed >= abc.c){
				ele.style.left = x_y.x + "px";
				ele.style.top = x_y.y + "px";
				clearInterval(window.inter);
				return;
			}
		}else if(type == 1){
			if(l+spore.speed >= abc.c){
				ele.style.left = x_y.x + "px";
				ele.style.top = x_y.y + "px";
				clearInterval(window.inter);
				return;
			}
		}else if(type == 2){
			if(l+spore.speed >= abc.c){
				ele.style.left = x_y.x + "px";
				ele.style.top = x_y.y + "px";
				clearInterval(window.inter);
				return;
			}
		}else if(type == 3){
			if(l+spore.speed >= abc.c){
				ele.style.left = x_y.x + "px";
				ele.style.top = x_y.y + "px";
				clearInterval(window.inter);
				return;
			}
		}
	}
	
}
/*********************获取视口大小*************************/

function getWH(){
	
	var windowHeight = 0;
	var windowWidth = 0;
	if(window.innerHeight){
		windowHeight = window.innerHeight;
		
	}else if(document.body && document.body.clientHeight){
		windowHeight= document.body.clientHeight;
	}
	
	
	if(window.innerWidth){
		windowWidth = window.innerWidth;		
	}else if(document.body && document.body.clientWidth){
		windowWidth = document.body.clientWidth;
	}
	////////////////////////////////////////////////////////
	if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	}
	
	return {
		cw : windowWidth,
		ch : windowHeight
	};
}

/*********************地图配置*************************/
/**
 * 防止spore越边界
 * @param {Object} spore
 * @param {Object} xy --x_y
 */
function avoidOverBorder(spore,xy){
	var wh = getWH();
	//右
	if(xy.x+spore.length > wh.cw){
		xy.x = wh.cw - spore.length;
	}
	//左
	if(xy.x < 0 ){
		xy.x = 0;
	}
	//上
	if(xy.y < 0){
		xy.y = 0;
	}
	//下
	if(xy.y + spore.height > wh.ch){
		xy.y = wh.ch - spore.height;
	}
	return xy;
}
/*******************原材料发散*************************/
/**
 * 随机一个原料坐标
 */
function randomPosition(){
	var wh = getWH();
	return {
		x : Math.floor(Math.random() * (wh.cw - 60) ) + 30,
		y : Math.floor(Math.random() * (wh.ch - 60) ) + 30
	};
}
/**
 * 返回存储原料的数组
 * @param {Object} colors
 */
function createMeteria(colors){
	var size = colors.length;
	var arr = [];
	var n = Math.floor(Math.random() * 100 + 80);
	for(var i =0; i < n; i++){
		var xy = randomPosition();
		var meteria = new Meteria({
			x : xy.x,
			y : xy.y
		});
		var index = Math.floor(Math.random()*size);
		var ele = document.createElement("div");
		ele.style.position = "absolute";
		ele.style.backgroundColor = colors[index];
		ele.style.width = "10px";
		ele.style.height = "10px";
		ele.style.left = xy.x + "px";
		ele.style.top = xy.y + "px";
		ele.style.borderRadius = "50%";
		document.documentElement.appendChild(ele);
		meteria.ele = ele;
		arr[i] = meteria;
	}
	return arr;
}




