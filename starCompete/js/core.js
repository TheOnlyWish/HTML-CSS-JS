window.addEventListener("load",load,false);
//大区
function load(){
	////////////////////////////////////////////////////////////////
	var x_y = {};
	//获取孢子对象
	var spore = new Spore({
		name : "king",
		length : 50,
		height : 50,
		// 初始位置
		xy : {
			x : 500,
			y : 300
		},
		fontSize : [10,16,22,28,34,38,44,50],
		speed : 7,
		level : 1,
		weight : 20
	});
	
	//得到孢子元素
	var spore_ = spore.create(); 
	spore.createInnerEle();
	var arr = createMeteria(colors);
	// 原材料总量---装饰成引用类型
	var len = {
		l : arr.length
	};
	/*--------------------鼠标点击获取位置--------------------*/
	document.addEventListener("mousedown",mClick,false);
	/*******************事件方法*************************/
	function mClick(evt){
		if(len.l <= 20){
			arr = clearArr(arr);
			arr = createMeteria(colors);
			len.l = arr.length;
		}
		x_y = {
			x : evt.clientX - spore.length/2,
			y : evt.clientY - spore.height/2
		};
		x_y = avoidOverBorder(spore,x_y);
		var spore_ = spore.create();
		move(spore,x_y,arr,len);
		document.removeEventListener("mousedown",mClick,false);
		document.addEventListener("mousedown",mClick,false);
	};

//	arr = updateMeteria(colors);
	////////////////////////////////////////////////////////////////
}

/**
 * 每2分钟更新一次原材料
 */
function updateMeteria(colors){
	clearInterval(int);
	var arr = [];
	var int = setInterval(function (arr){
		arr = createMeteria(colors);
	},30000);
	
	
	
	return arr;
}
	
/**
 * 清理arr
 */
function clearArr(arr){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] != null){
			document.documentElement.removeChild(arr[i].ele);
		}
	}
	arr = [];
}

