


window.onload = function (){
	//设置布局
	setTitleCenter();
	var tab = document.getElementById("tab");
	var title = document.getElementById("title");
	setCenter(tab,title);
	var start = document.getElementById("start");
	setCenter(start);
	
	
	start.addEventListener('click',function (){
		start.style.display = 'none';
		cont();
	},false);
	
	function cont(){
		//共享数据
		window.count = 1;
		window.score = 0;
		window.grade = 0;
		window.isEnd = false;
		setAllTd(window.event);
		
		
		var again = document.getElementById("again");
		again.addEventListener("click",function (evt){
			again.style.display = 'none';
			//init();
			//alert("window.count:"+window.count + ", window.grade:" + window.grade + ", window.score:" + window.score + ", window.isEnd:" + window.isEnd);
//			setAllTd(evt);
			window.location.href="";
		},false);
	}
	
}
	
//设置全局格子
function setAllTd(evt){
//	for(var i = 0; i < tds.length; i++){
//		//设置随机背景色
//		tds[i].onclick = function (evt){
//			//////
//		}
//	}
	var tds = document.getElementsByTagName("td");
	var obj = randomColor();
	for(var i = 0; i < tds.length; i++){
		tds[i].style.background = obj.c_color;
	}
	var currentNode = tds[Math.floor(Math.random()*tds.length)];
	currentNode.style.background = obj.s_color;
	var table = document.getElementById("tab");
	//设置随机背景色
	table.style.background = obj.bg_color;
	
	for(var i = 0; i < tds.length; i++){
		//鼠标单击启动
		tds[i].addEventListener('click',carryOut,false);
		function carryOut (evt){
			if(evt.srcElement === currentNode){
				//alert("right");
				window.count++;
				if(window.count == 5 || window.count == 10 || window.count == 20 || window.count == 30 || window.count == 40 || window.count == 20 || window.count == 50){
					createTd(table);
					show();
				}
				//分数递增
				if(window.count <=5){
					window.score += 5;
					window.grade = 0;
				}else if(window.count <=10){
					window.score += 10;
					window.grade = 1;
				}else if(window.count <=20){
					window.score += 30;
					window.grade = 2;
				}else{
					window.score += 60;
					window.grade = 3;
				}
				//写入分数
				writeScore();
			}else{
				show("失败！")
				window.isEnd = true;	
				var again = document.getElementById("again");
				again.style.display = 'block';
				//alert("window.count:"+window.count + ", window.grade:" + window.grade + ", window.score:" + window.score + ", window.isEnd:" + window.isEnd);
			}
			//在完成该次循环后，在进入下一次循环入口之前，将事件移除
			for(var i = 0; i < tds.length; i++){
					tds[i].removeEventListener('click',carryOut,false);
			}
			if(!window.isEnd){
				setAllTd.call(this,evt);
			}
		};
	}
	
}

	function init(){
		window.isEnd = false;
		window.count=0;
		window.grade =0;
		window.score = 0;
		show();
		writeScore();
		initTable();
	}
	
	//初始化table
	function initTable(){
//		var table = document.createElement("table");
//		table.width = '700px';
//		table.height = '500px';
//		table.border = '1px';
//		table.className = 'tab';
//		
//		var tBody = table.createTBody();
//		for(var i = 0; i < 2; i++){
//			var tr = tBody.insertRow(i);
//			for(var j = 0; j < 2; j++){
//				tr.insertCell(j);
//			}
//		}
//		document.body.removeChild(document.getElementById("tab"));
//		document.body.appendChild(table);

		//刷新
	}
	
	//作出回应
	function show(errorText){
		var show = document.getElementById("show");
		if(arguments.length == 0){
			if(window.count ==0){
				show.innerText = '';
			}else if(window.count == 10){
				show.innerText = '嗯，不错，继续努力！ 下一等级，分数翻倍!';
			}else if(window.count == 20){
				show.innerText = '哇，眼力真棒！ 下一等级，分数翻爽(双)倍！';
			}else if(window.count ==30){
				show.innerText = '^_^，竟然如此之强！ 下一等级，分数翻倍！';
			}else if(window.count ==50){
				show.innerText = '>_<，您已攀登到了世界的终极,加油！';
			}	
		}else{
			show.style.fontSize = 40 + 'px';
			show.style.color = 'yellow';
			show.innerText = errorText;
		}
		
	}
	

	//写入分数
	function writeScore(){
		var sc = window.score;
		var node = document.getElementById("score").children[0];
		node.innerText = sc;
	}
	
	
	//创建td:
	//第一次添加td：row(0)+1,row(1)+1,insertRow(2)+3
	function createTd(tab){
		//行集合
		var rs = tab.tBodies[0].rows;
		//列集合
		var cs = rs[0].cells;
		var cl = rs[0].cells.length;
		for(var i = 0; i < rs.length; i++){
			rs[i].insertCell(cl);
		}
		var tr = tab.insertRow(rs.length);
		for(var j = 0; j < cs.length; j++){
			tr.insertCell(j);
		}
	}

	
//获取视口宽高
function getWH(){
	return {
		width : document.documentElement.clientWidth,
		height : document.documentElement.clientHeight
	};
}

//设置title居中
function setTitleCenter(){
	var title = document.getElementById("title");
	var style = getMyCompytedStyle(title);
	var obj = getWH();
	var tab = document.getElementById("tab");
	title.style.left = (obj.width - parseInt(style.width))/2 + 'px';
	title.style.top = (tab.top - parseInt(style.height))/2 + 'px';
}

function getMyCompytedStyle(ele){
	var style = window.getComputedStyle(ele,null);
	return style;
}


//元素所在box居中
function setCenter(ele,title){
	var style = window.getComputedStyle(ele,null);
	var obj = getWH();
	if(arguments.length == 2){
		var comStyle = getMyCompytedStyle(title);
		ele.style.top = (obj.height - parseInt(style.height))/2 + 'px'; 
	}else{
		ele.style.top = (obj.height - parseInt(style.height))/2 + 'px';
	}
	ele.style.left = (obj.width - parseInt(style.width))/2 + 'px'; 
	 
	
}


window.addEventListener('resize',function (){
	setTitleCenter();
	var tab = document.getElementById("tab");
	var title = document.getElementById("title");
	setCenter(tab,title);
	var start = document.getElementById("start");
	setCenter(start);
	
},false);


//随机颜色
function randomColor(){
	
	var r = Math.floor(Math.random()*255);
	var g = Math.floor(Math.random()*255);
	var b = Math.floor(Math.random()*255);
	var s = 40;
	if(window.grade == 0){
		s=35;
	}else if(window.grade == 1){
		s=30;
	}else if(window.grade ==2){
		s=20;
	}else if(window.grade == 3){
		s=10;
	}
	
	var n = Math.floor(Math.random()*10)+s;
	
	var c_color = checkRGB(r,g,b);
	var s_color = checkRGB(r,g,b,n);
	var bg_color = checkRGB(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255));
	return {
		c_color : c_color,
		s_color : s_color,
		bg_color : bg_color
	};
}

//randomColor 的支持方法，用于检验r,g,b
function checkRGB(r,g,b,n){
	
	if(arguments.length == 4){
		if(r+n<255){
			r+=n;
		}else{
			r-=n;
		}
		if(g+n<255){
			g+=n;
		}else{
			g-=n;
		}
		if(b+n<255){
			b+=n;
		}else{
			b-=n;
		}
	}
 	var aa = r.toString(16);
	var bb = g.toString(16);
	var cc = b.toString(16);
	if(r <= 15){
		aa = "0" + r.toString(16);
	}
	if(g <= 15){
		bb = "0" + g.toString(16);
	}
	if(b <= 15){
		cc = "0" + b.toString(16);
	}
	return "#" + aa + bb + cc;
}



//随机格子
function randomTd(){
	var color = randomColor();
	var tds = document.getElementsByTagName("td");
	tds[Math.floor(Math.random()*tds.length)].style.background = color;
}


var getRandomColor = function (){
	
	return "#" + (function (color){
		return (color += '0123456789abcdef'[Math.floor(Math.random()*16)]) && (color.length == 6) ? color : arguments.callee(color);
	})("");
};


function colorFilter(){
	var s_color = getRandomColor();
	var c_color = getRandomColor(); 
	var s_str = s_color.substring(1);
	var c_str = c_color.substring(1);
	alert(s_str + ", " + c_str);
}











