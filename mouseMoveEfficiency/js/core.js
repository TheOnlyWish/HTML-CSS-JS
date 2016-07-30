
window.addEventListener("load",load,false);
//文档加在后就会执行
function load(){
	
	//测试鼠标时刻坐标
	mouse_move();
	
	
	
};

	

	
	
	/**
	 * 任务：鼠标划过屏幕，会些许星星。
	 * 1.获取当前鼠标所在坐标，
	 * 2.将星星定位在该坐标位置及下方附近
	 * 3.隔段时间触发一次
	 * 4.星星在触发地出现后，下滑并慢慢透明，最后删除该元素
	 */
	var mouse_move = function (){
		var div_xy = document.getElementById("xy");
		
		//定义图片路径数组
		var urls = ['images/subball1.png','images/subball2.png',
		'images/subball3.png','images/subball4.png',
		'images/subball5.png','images/subball6.png',
		'images/subball7.png','images/subball8.png'];
		
		document.addEventListener("mousemove",function (evt){
			var x = evt.clientX;
			var y = evt.clientY;
			//创建星星
			createStarts(urls,x,y);
			div_xy.innerHTML = "(" + x + ", " + y + ")";
			
		},false);
		
	}
	
	/**
	 * 创建星星元素
	 * @param {Object} urls
	 */
	function createStart(urls,x,y){
/**
 * 看看是否需要setInteral()函数来控制间隔
 * 看看是否需要setOutTime()函数来控制星星出现延迟间隔
 * 
 */
		/**
		 * 1.先固定创建星星左下角
		 *  * 令每一颗星都在鼠标右下角固定位置出现（延迟一段时间随机出现在鼠标附近） 
		 * 2.令创建下来的星星都拥有自动下落的动作
		 *  * 自定义随机初始位置 OK
		 *  * 星星不能越界
		 * 3.删除过期事件
		 */
		//创建星星元素-空
		var star = document.createElement("img");
		//绝对定位
		star.style.position = 'absolute';
		//随机图片路径urls的索引
		var num = randomNumber();
		//设置backgroundImage
		star.setAttribute("src",urls[num]);
		document.getElementsByTagName("body")[0].appendChild(star);
		//设置随即坐标位置
		setRandomPosition(star,x,y);
		//设置star下落参数
		starFall(star);
	};
	
	//功能组建区
	/*****************************************************************************************/
	/**
	 * 随机图片选择器
	 */
	function randomNumber(){
		return Math.floor(Math.random() * 8);
	}
	
	/**
	 * 创建随机星星下落的路程
	 * 范围暂定：20px~40px
	 */
	function fallSpace(){
		return Math.floor(Math.random() * 20) + 20;
	}
	
	/**
	 * 创建随机星星下落的延迟时间
	 * 时间范围暂定：300mm~800mm
	 */
	function delayTime(){
		return Math.floor(Math.random() * 100) + 300;
	}
	
	
	/**
	 * 创建随机坐标对象
	 * 参数范围暂定:x-(0px,15px),y-(0px,15px)
	 */
	function randomPosition(){
		return {
			'X' : Math.ceil(Math.random() * 20),
			'Y' : Math.ceil(Math.random() * 20)
		};
	}
	
	
	/**
	 * 随机星星数
	 * 数量暂定:3~4
	 */
	function starsNumber(){
		return Math.ceil(Math.random() * 6) + 4;
	}
	
	
	/**
	 * 负责鼠标移动一次就创建多个star，
	 */
	function createStarts(urls,x,y){
		for(var i = 0; i < 2; i++){
			createStart(urls,x,y);
		}
	}
	
	/**
	 * 获取视口大小
	 */
		
	function getWH(){
		
		var windowHeight = 0;
		var windowWidth = 0;
		
		if(window.innerHeight){
			windowHeight = window.innerHeight;
			
		}else if(document.body && document.body.clientHeight){
			windowHeight = document.body.clientHeight;
		}
		
		
		if(window.innerWidth){
			windowWidth = window.innerWidth;		
		}else if(document.body && document.body.clientWidth){
			windowWidth = document.body.clientWidth;
		}
		
		if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		}
		var obj = {
			cw : windowWidth,
			ch : windowHeight
		};
		return obj;
	}
	
	/**
	 * 星星不能越边界
	 */
	function filterBorder(ele,o){
		//获取星星的坐标
		var wh = getWH();
		//alert(wh.cw);
		if(o.rx> wh.cw){
			ele.style.left = wh.cw + "px";
		}else if(o.rx < 0){
			ele.style.left = 0 + "px";
		}else {
			ele.style.left = o.rx + "px";
		}
		
		
		if(o.ry + 16> wh.ch){
			ele.style.top = wh.ch + "px";
		}else if(o.ry < 0){
			ele.style.top = 0 + "px";
		}else{
			ele.style.top = o.ry + "px";
		}
	};
		
	/*****************************************************************************************/
	
	
	
	/**
	 * 设置星星的位置
	 */
	function setRandomPosition(ele,x,y){
		var p = randomPosition();
		var rx = (p.X%2==0?x + p.X: x - p.X);
		var ry = (p.Y%2==0?y + p.Y : y - p.Y);
		
		/*********************/
		document.getElementById("xy").innerHTML = rx +", " + ry ;
		/*********************/
	
		
		var obj = {
			'rx' : rx,
			'ry' : ry
		};
		filterBorder(ele,obj);
	};
	
	
	/**
	 * 定义星星下落
	 * 1.出现之后延迟100
	 * 2.开始下落
	 * 3.下落途中开始透明
	 * 4.透明度到了10%则消失
	 */
	function starFall(ele){
		var star = ele;
		var op = 1.0;
		var sty = window.getComputedStyle(ele,null);
		setTimeout(function (){
			var inter = setInterval(function (){
				//move down
				star.style.top = parseInt(sty.top) + 5 + "px";
				//opacity
				star.style.opacity = op;
				op = op - 0.1;
				if(op < 0.1){
					star.style.opacity = op;
					document.getElementsByTagName("body")[0].removeChild(star);
					clearInterval(inter);
				}
			},100);
		},70);
	}
