///********************原料数组***************************/
//var meterias = [
//		{
//			x : 0,
//			y : 0,
//			w : 19,
//			h : 18
//		},
//		{
//			x : 19,
//			y : 0,
//			w : 20,
//			h : 18
//		},
//		{
//			x : 40,
//			y : 0,
//			w : 18,
//			h : 18
//		},
//		{
//			x : 58,
//			y : 0,
//			w : 17,
//			h : 16
//		},
//		{
//			x : 76,
//			y : 0,
//			w : 15,
//			h : 13
//		},
//		{
//			x : 90,
//			y : 0,
//			w : 13,
//			h : 16
//		},
//		{
//			x : 104,
//			y : 0,
//			w : 17,
//			h : 16
//		},
//		{
//			x : 121,
//			y : 0,
//			w : 17,
//			h : 16
//		},
//		{
//			x : 138,
//			y : 0,
//			w : 18,
//			h : 16
//		},
//		{
//			x : 156,
//			y : 0,
//			w : 17,
//			h : 15
//		},
//		{
//			x : 175,
//			y : 0,
//			w : 16,
//			h : 17
//		},
//		{
//			x : 193,
//			y : 0,
//			w : 17,
//			h : 14
//		},
//		{
//			x : 209,
//			y : 0,
//			w : 17,
//			h : 17
//		}
//];
var colors = [
	"red","blue","green","yellow","brown","seaGreen","seaShell","sienna","silver","skyBlue","slateBlue"
	,"Wheat","turquoise","tomato","thistle","teal","tan","steelBlue","springGreen","snow","slateGray"
	,"White","WhiteSmoke","Yellow","YellowGreen"
];



/**************创建孢子的构造函数********************/
/**
 * 创建孢子--自己
 */
function Spore(spore){
	this.name = spore.name;
	this.length = spore.length;
	this.height = spore.height;
	this.xy = spore.xy;	
	this.speed = spore.speed;
	this.ele = null;
	this.fontSize = spore.fontSize;
	this.level = spore.level-1;
	this.weight = spore.weight;
	this.juess = {
		a : true,
		b : true,
		c : true,
		d : true,
		e : true,
		f : true,
		g : true
	};
	this.change = true;
};
if(typeof this.create != 'function'){
	Spore.prototype = {
		constructor : Spore,
		//共享方法
		//可以与构造函数通信
		/**
		 * 创建或获取spore标签元素
		 */
		create : function(){
			if(this.ele != null && this.change){
				return this.ele;
			}
			var div = document.createElement("div");
			div.style.position = "absolute";
			div.style.width = this.length + "px";
			div.style.height = this.height + "px";
			div.style.borderRadius = "50%";
			div.style.left = this.xy.x + "px";
			div.style.top = this.xy.y + "px";
			div.style.background = "yellow";
			div.style.zIndex = 9998;
			document.documentElement.appendChild(div);
			this.ele = div;
			
			document.getElementById("weight").innerHTML = this.weight + "kg";
			return div;
		},
		/**
		 * 获取spore中心点坐标
		 */
		getCenter : function (){
			if(this.ele == null){
				throw new Error("spore的标签未创建！");
			}
			var style_c = window.getComputedStyle(this.ele,null);
			return {
				x : parseInt(style_c.left) + this.length/2,
				y : parseInt(style_c.top) + this.height/2
			};
		},
		/**
		 * 创建一个spore标签的内不标签，用于存储name
		 */
		createInnerEle : function(){
			var name = document.createElement("div");
			name.style.width = this.length*0.5 + "px";
			name.style.height = this.height*0.5 + "px";
			name.innerHTML = this.name;
			this.ele.appendChild(name);
			name.style.marginTop = this.height*0.25+"px";
			name.style.marginLeft = this.length*0.25+"px";
			name.style.fontSize = this.fontSize[this.level] + "px";
		}
	}
}

/****************原料对象*****************/
function Meteria(meteria){
	this.x = meteria.x;
	this.y = meteria.y;
	this.ele = meteria.ele;
}








