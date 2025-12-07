(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"isep_game_atlas_1", frames: [[0,0,1360,784]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Gemini_Generated_Image_yumvowyumvowyumv = function() {
	this.initialize(ss["isep_game_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.ui_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ui
	this.sustain_txt = new cjs.Text("SUS", "61px 'Bebas Neue'", "#CCCCCC");
	this.sustain_txt.name = "sustain_txt";
	this.sustain_txt.textAlign = "center";
	this.sustain_txt.lineHeight = 75;
	this.sustain_txt.lineWidth = 184;
	this.sustain_txt.parent = this;
	this.sustain_txt.setTransform(565.7,4.5);

	this.students_txt = new cjs.Text("ALUNOS", "61px 'Bebas Neue'", "#CCCCCC");
	this.students_txt.name = "students_txt";
	this.students_txt.textAlign = "center";
	this.students_txt.lineHeight = 75;
	this.students_txt.lineWidth = 184;
	this.students_txt.parent = this;
	this.students_txt.setTransform(344.55,6.55);

	this.money_txt = new cjs.Text("dinheiro", "61px 'Bebas Neue'", "#CCCCCC");
	this.money_txt.name = "money_txt";
	this.money_txt.textAlign = "center";
	this.money_txt.lineHeight = 75;
	this.money_txt.lineWidth = 184;
	this.money_txt.parent = this;
	this.money_txt.setTransform(109.5,4.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#4A362C").ss(5,1,1).p("EgulgEbMBdLAAAIAAI4MhdLAAAg");
	this.shape.setTransform(331.0195,37.1989,1.1019,1.2189);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6C4438").s().p("EgulAEdIAAo5MBdLAAAIAAI5g");
	this.shape_1.setTransform(331.0195,37.1989,1.1019,1.2189);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.money_txt},{t:this.students_txt},{t:this.sustain_txt}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ui_mc, new cjs.Rectangle(0,0,662.1,81.8), null);


(lib.sustain_upgrade_button_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#009900").ss(5,1,1).p("Amol+INRAAIAAL9ItRAAg");
	this.shape.setTransform(42.475,38.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009900").s().p("AmoF/IAAr9INRAAIAAL9g");
	this.shape_1.setTransform(42.475,38.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sustain_upgrade_button_mc, new cjs.Rectangle(-2.5,-2.5,90,81.7), null);


(lib.secretaria_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// secretaria
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,0,3).p("AOWELMgn2AINQCBnHGwnSQHqnLLbifQLbigLfFsIkSBq");
	this.shape.setTransform(165.4055,81.1763);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#525252").ss(3,1,1).p("AZZqlIAACTIkHAVIADAMQAAACAAADQAvECAwEBQkCA1kCA2QgDAAgCABIgMACIAACbMgnnAICIgQiPAVGo7IAMA+AseC/IaIlfIAAhgIhqoSQnJg7mnCuIAABOIhuAmIAAhLQl3CjknEUAseC/IAAhjAseC/Ihel+IBeEbIaIlc");
	this.shape_1.setTransform(164.6,94.5185);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5C5C5A").s().p("A5XJVMAn1gIOIAACbMgnmAICgAseAeIaIlcIAABgI6IFfgAVGp5IEThqIAACTIkHAVg");
	this.shape_2.setTransform(164.6,100.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6E6E6E").s().p("Awnh/QHqnKLbigQLbifLgFrIkTBqIAMA+IACAMIABAFIBfIDIoFBrIgEABIgNACMgn1AIOQCAnIGwnSgAseFHIaIlfIAAhgIhqoSIgJgBIgCAAIgFgBIgEAAQhqgNhoAAIAAAAIgBAAQlBAAkwB4IgLAEIgEACIgEACIgFACIAABOIhtAmIAAhLQl3CjkoEUQEokUF3ijIAABLIBtgmIAAhOIAFgCIAEgCIAEgCIALgEQEwh4FBAAIABAAIAAAAQBoAABqANIAEAAIAFABIACAAIAJABIBqISI6IFcIhekbg");
	this.shape_3.setTransform(164.6,80.9429);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#4A362C").ss(3,1,0,3).p("AOWELMgn2AINQCBnHGwnSQHqnLLbifQLbigLfFsIkSBq");
	this.shape_4.setTransform(165.4055,81.1763);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#4A362C").ss(3,1,1).p("AZZqlIAACTIkHAVIADAMQAAACAAADQAvECAwEBQkCA1kCA2QgDAAgCABIgMACIAACbMgnnAICIgQiPAVGo7IAMA+AseC/IaIlfIAAhgIhqoSQnJg7mnCuIAABOIhuAmIAAhLQl3CjknEUAseC/IAAhjAseC/Ihel+IBeEbIaIlc");
	this.shape_5.setTransform(164.6,94.5185);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#8C6252").s().p("Awnh/QHqnKLbigQLbifLgFrIkTBqIAMA+IACAMIABAFIBfIDIoFBrIgEABIgNACMgn1AIOQCAnIGwnSgAseFHIaIlfIAAhgIhqoSIgJgBIgCAAIgFgBIgEAAQhqgNhoAAIAAAAIgBAAQlBAAkwB4IgLAEIgEACIgEACIgFACIAABOIhtAmIAAhLQl3CjkoEUQEokUF3ijIAABLIBtgmIAAhOIAFgCIAEgCIAEgCIALgEQEwh4FBAAIABAAIAAAAQBoAABqANIAEAAIAFABIACAAIAJABIBqISI6IFcIhekbg");
	this.shape_6.setTransform(164.6,80.9429);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#6C4438").s().p("A5XJVMAn1gIOIAACbMgnmAICgAseAeIaIlcIAABgI6IFfgAVGp5IEThqIAACTIkHAVg");
	this.shape_7.setTransform(164.6,100.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,330.8,176.2);


(lib.j_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// j
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("AO7hKIhXh4IEXi1AO7hKIDAhzIAAi6Im/roI82SEIFZI3IAAECIC0ECIYovtgAshJcIC7E0IYhva");
	this.shape.setTransform(116.2,113.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5C5C5A").s().p("AvNHqIAAkCIC7EzIYgvZIAAC+I4nPsgAK4o3IEXi0IAAC6IjBBzg");
	this.shape_1.setTransform(133.45,150.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E6E6E").s().p("AshLEIlZo3Ic2yEIG/LpIkXC0IBXB4I4hPag");
	this.shape_2.setTransform(116.2,103.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#4A362C").ss(3,1,1).p("AO7hKIhXh4IEXi1AO7hKIDAhzIAAi6Im/roI82SEIFZI3IAAECIC0ECIYovtgAshJcIC7E0IYhva");
	this.shape_3.setTransform(116.2,113.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6C4438").s().p("AvNHqIAAkCIC7EzIYgvZIAAC+I4nPsgAK4o3IEXi0IAAC6IjBBzg");
	this.shape_4.setTransform(133.45,150.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8C6252").s().p("AshLEIlZo3Ic2yEIG/LpIkXC0IBXB4I4hPag");
	this.shape_5.setTransform(116.2,103.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,232.4,227);


(lib.infra_upgrade_button_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#009900").ss(5,1,1).p("Amol+INRAAIAAL9ItRAAg");
	this.shape.setTransform(42.475,38.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009900").s().p("AmoF/IAAr9INRAAIAAL9g");
	this.shape_1.setTransform(42.475,38.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.infra_upgrade_button_mc, new cjs.Rectangle(-2.5,-2.5,90,81.7), null);


(lib.i_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// i
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("AzjyLICUhgIiUjogA2owGIDFiFAWpIDIAAD8I1zN7MgXegltIAAkTMAXWAmBgAzj3TIDtimMAU0Ag/IMSn/IFZI8");
	this.shape.setTransform(146.425,167.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5C5C5A").s().p("A2owtIAAkSMAXWAmAIV7t3IAAD8I1zN7g");
	this.shape_1.setTransform(146.425,198.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E6E6E").s().p("A2ouGIDFiFICUhgIiUjoIDtimMAU0Ag+IMSoAIFZI+I17N4g");
	this.shape_2.setTransform(146.425,154.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5F5F5D").s().p("AhJijICTDnIiTBgg");
	this.shape_3.setTransform(28.625,34.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#4A362C").ss(3,1,1).p("AzjyLICUhgIiUjogA2owGIDFiFAWpIDIAAD8I1zN7MgXegltIAAkTMAXWAmBgAzj3TIDtimMAU0Ag/IMSn/IFZI8");
	this.shape_4.setTransform(146.425,167.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8C6252").s().p("A2ouGIDFiFICUhgIiUjoIDtimMAU0Ag+IMSoAIFZI+I17N4g");
	this.shape_5.setTransform(146.425,154.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#6C4438").s().p("A2otGIAAkTMAXWAmBIV7t4IAAD8I1zN7gAzj4mICUDoIiUBgg");
	this.shape_6.setTransform(146.425,175.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,292.9,334.7);


(lib.h_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// h
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("AaVnJIAjDbMgpEAZyIjGkiIBjg/IA5B4gA63FhIAACHICZEGIBxhEIDYFeIA2giIkOmxIhxBFIiZkZMAsNgbkII/O6A2tKqIAAh1A4eLuIAAh0AxSRiIhNh8");
	this.shape.setTransform(173.45,142.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5C5C5A").s().p("AxRKFIBig/IA5B4MApLgZkIAjDbMgpEAZygA2tDNIAAh1IEOGxIg2AigA62ALIAAiGICYEYIAAB1gA4eCdIBxhFIAAB1IhxBFg");
	this.shape_1.setTransform(173.45,190.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E6E6E").s().p("AveSXIhiA/IhNh7IkOmxIhyBEIiYkZMAsMgbjII/O5MgpLAZkg");
	this.shape_2.setTransform(171.725,131);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#4A362C").ss(3,1,1).p("AaVnJIAjDbMgpEAZyIjGkiIBjg/IA5B4gA63FhIAACHICZEGIBxhEIDYFeIA2giIkOmxIhxBFIiZkZMAsNgbkII/O6A2tKqIAAh1A4eLuIAAh0AxSRiIhNh8");
	this.shape_3.setTransform(173.45,142.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8C6252").s().p("AveSXIhiA/IhNh7IkOmxIhyBEIiYkZMAsMgbjII/O5MgpLAZkg");
	this.shape_4.setTransform(171.725,131);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6C4438").s().p("AxRKFIBig/IA5B4MApLgZkIAjDbMgpEAZygA2tDNIAAh1IEOGxIg2AigA62ALIAAiGICYEYIAAB1gA4eCdIBxhFIAAB1IhxBFg");
	this.shape_5.setTransform(173.45,190.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,346.9,285.3);


(lib.g_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// g
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("Ay+xgIMEnuICxENIBnhVMAVZAiwAy+xgIAAEHMAX5AmoIOEpBIgIj0It1JNg");
	this.shape.setTransform(122.95,163.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5C5C5A").s().p("Ay9xQIAAkHMAX/AnHIN1pNIAID0IuEJBg");
	this.shape_1.setTransform(122.95,187.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E6E6E").s().p("Ay6vsIMEnuICxENIBnhUMAVZAiwIt1JMg");
	this.shape_2.setTransform(122.575,151.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#4A362C").ss(3,1,1).p("Ay+xgIMEnuICxENIBnhVMAVZAiwAy+xgIAAEHMAX5AmoIOEpBIgIj0It1JNg");
	this.shape_3.setTransform(122.95,163.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6C4438").s().p("Ay9xQIAAkHMAX/AnHIN1pNIAID0IuEJBg");
	this.shape_4.setTransform(122.95,187.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8C6252").s().p("Ay6vsIMEnuICxENIBnhUMAVZAiwIt1JMg");
	this.shape_5.setTransform(122.575,151.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,245.9,326.1);


(lib.f_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// f
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("ActtbIjKB5IBCBfActtbIAACQIiIBIIHXKiQExG2CbJZIAAHKIqEArIAACAIKEgrIAAiAEgpHALvMA9rgnDIIJN5AfEVVIAAhtIwcB8IicjsIg+AyIpWvaMgigAVqIoftLIAACsIIIM6MAiwgVqIJGPTIBSgzICIDOgAfEYjIAAjO");
	this.shape.setTransform(264.725,176.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5C5C5A").s().p("EgpHAHeIAAirIIfNKMAiggVpIJWPaIA+gzICcDtIQch8IAABtIwzCEIiIjOIhSAyIpGvRMgiwAVpgAfERmIKEgrIAACBIqEAqgAZjyfIDKh5IAACQIiIBJg");
	this.shape_1.setTransform(264.725,220.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E6E6E").s().p("EgpHAM9MA9rgnDIIJN4IjKB6IBCBfIHXKhQExG2CbJaIAAHKIqEArIAAjOIAAhtIwcB8IicjtIg+AzIpWvbMgigAVqg");
	this.shape_2.setTransform(264.725,168.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#4A362C").ss(3,1,1).p("ActtbIjKB5IBCBfActtbIAACQIiIBIIHXKiQExG2CbJZIAAHKIqEArIAACAIKEgrIAAiAEgpHALvMA9rgnDIIJN5AfEVVIAAhtIwcB8IicjsIg+AyIpWvaMgigAVqIoftLIAACsIIIM6MAiwgVqIJGPTIBSgzICIDOgAfEYjIAAjO");
	this.shape_3.setTransform(264.725,176.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8C6252").s().p("EgpHAM9MA9rgnDIIJN4IjKB6IBCBfIHXKhQExG2CbJaIAAHKIqEArIAAjOIAAhtIwcB8IicjtIg+AzIpWvbMgigAVqg");
	this.shape_4.setTransform(264.725,168.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6C4438").s().p("EgpHAHeIAAirIIfNKMAiggVpIJWPaIA+gzICcDtIQch8IAABtIwzCEIiIjOIhSAyIpGvRMgiwAVpgAfERmIKEgrIAACBIqEAqgAZjyfIDKh5IAACQIiIBJg");
	this.shape_5.setTransform(264.725,220.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,529.5,352.9);


(lib.estacionamento_sec_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// estacionamento_sec
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(3,1,1).p("EBIWgJKIAVAAEBIWgJKIgFHGMgv4AAkIqclQMgmcAWHIukDDI93AAQlwiGDDlZQLWnUMcmwIB8DQIoNFEIDZFXQQmp5Qdq0QG/knH0jgIUZAAIAAA1IEGAAIEog8MAsVAAAIAAH3I01AAIAABYgEAstgKYIAABbI0fAAIAAkzIgHhUIA3AAIAAEsg");
	this.shape.setTransform(466.6617,119.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EhEvASaQlwiGDDlZQLWnUMcmwIB8DQIoNFEIDZFXQQmp5Qdq0QG/knH0jgIUZAAIAAA1IEGAAIEog8MAsVAAAIAAH3I01AAIAABYIWmAAIgFHGMgv4AAkIqclQMgmcAWHIukDDgAYZtwIAAEzIUfAAIAAhbIzvAAIAAksIg3AAg");
	this.shape_1.setTransform(465.5867,119.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.estacionamento_sec_mc, new cjs.Rectangle(0,0,933.3,238.6), null);


(lib.estacionamento_h_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// estacionamento_h
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(3,2,0,3).p("EgjnANLIHdNRIQWqLIKYPtIB3hSICWD7IBzhPIHmNnIiAGOICNDtIHrk5MgXXgmKILCmnIO9YWMANBg6tIyD9yIuNIkIQpZoI2ENog");
	this.shape.setTransform(230.0524,366.3195);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EAKJA1NIB/mNInmtoIhzBQIiWj7Ih3BSIqXvuIwXKMIndtSMAhngWPIWEtpIwp5oIONokISDdyMgNBA6tIu94WIrBGnMAXWAmKInqE5g");
	this.shape_1.setTransform(230.25,366.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.estacionamento_h_mc, new cjs.Rectangle(0,0,460.5,732.6), null);


(lib.estacionamento_f_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// estacionamento_f
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(3,2,0,3).p("EguUAQ2IkDnJMAhOgUaIiXkNIYJvOIMgAoIN6RTIK3VgIIfM9Il5FKImmCqIkSuOIvg4WIzBiGMgq3Abzg");
	this.shape.setTransform(324.5496,194.9414);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EAhnAP5Ivf4WIzBiHMgq4AbzIijgXIkEnJMAhPgUZIiYkOIYJvNIMhAnIN5RTIK4VgIIfM9Il5FLImnCqg");
	this.shape_1.setTransform(324.575,194.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.estacionamento_f_mc, new cjs.Rectangle(0,0,649.2,389.4), null);


(lib.estacionamento_eng_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3,2,0,3).p("AOAoXIiVjPIhfBIIhoBPIhfBJAOAoXIBchHIiTjRIheBJAMlnPIBbhIAMlnPIiZjPALBmBIBkhOAJakxIiVjVIhxBWIhhBKIhpBRAkGAcIhlBNIhqBRAqaFQIhlBOIhjBLApdJ/IiijhArJLTIBshUIBfhLIBjhNIBmhQIBohRIiejdArJLTIiZjqIh5BcICcDqgAmbHnIiejhAk1GXIigjdIhkBMIhhBKAn+I0IicjkAGViXIBfhKIBmhQIBnhQIidjOAEohBIBthWIiijPAg/h7IhoBQIhfBHABdBcIBjhNIidjWIhiBMAgICsIifjXAgICsIBlhQIicjXADAAPIBohQIiejUIhnBOAhuD8IBmhQAH0jhIigjPAhuD8IiYjgAjNFGIBfhK");
	this.shape.setTransform(100.8853,124.0195);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(1));

	// estacionamento_engenheiros
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#333333").ss(3,2,0,3).p("A7CDDIOrWEIcmx2IBtCdIJHmAIw78yInSFfIjhCKg");
	this.shape_1.setTransform(175.1722,162.6918);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("A7CDCIaX0eIDhiKIHSlfIQ7cyIpHGAIhtidI8mR2g");
	this.shape_2.setTransform(175.175,162.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,350.4,325.5);


(lib.estacionamento_baixo_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// estacionamento_baixo
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(3,2,0,3).p("AynbvMAlQgXdIy3+5Im2hVg");
	this.shape.setTransform(121.3588,180.621);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AnF71IG2BVIS3e5MglPAXdg");
	this.shape_1.setTransform(121.425,179.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.estacionamento_baixo_mc, new cjs.Rectangle(0,0,242.8,361.4), null);


(lib.estacionamento_b_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// estacionamento_b
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#333333").ss(3,2,0,3).p("Anp3FQi8CSjHBTIh1BkMAIoAkbIDnDTIRhBZIivlTID/ixg");
	this.shape.setTransform(101.5205,149.9957);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AjQVwIjnjUMgIpgkbIB1hkQDIhTC7iSMAXJAmMIj/CyICvFSg");
	this.shape_1.setTransform(101.35,150.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.estacionamento_b_mc, new cjs.Rectangle(0,0,202.7,300.4), null);


(lib.course_upgrade_button_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#009900").ss(5,1,1).p("Amol+INRAAIAAL9ItRAAg");
	this.shape.setTransform(42.475,38.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009900").s().p("AmoF/IAAr9INRAAIAAL9g");
	this.shape_1.setTransform(42.475,38.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.course_upgrade_button_mc, new cjs.Rectangle(-2.5,-2.5,90,81.7), null);


(lib.c_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// c
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("A3oHSIAABUMAvRAAAIAAhUA3oHSIAAv3MAvRAAAIAAP3g");
	this.shape.setTransform(152.8,56.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6E6E6E").s().p("A3oH7IAAv1MAvRAAAIAAP1g");
	this.shape_1.setTransform(152.8,52.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5C5C5A").s().p("A3oAqIAAhTMAvRAAAIAABTg");
	this.shape_2.setTransform(152.8,107.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#4A362C").ss(3,1,1).p("A3oHSIAABUMAvRAAAIAAhUA3oHSIAAv3MAvRAAAIAAP3g");
	this.shape_3.setTransform(152.8,56.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8C6252").s().p("A3oH7IAAv1MAvRAAAIAAP1g");
	this.shape_4.setTransform(152.8,52.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6C4438").s().p("A3oAqIAAhTMAvRAAAIAABTg");
	this.shape_5.setTransform(152.8,107.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,305.6,112.9);


(lib.biblioteca_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// biblioteca
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("ANPnTIC3AAIAAhCIMQAAIAAE/IAAGVIAABGIAADyMg4kAAAIAABaMA4kAAAIAAhaACpnTIAAh9IKmAAIAAB9ApdC3IAAoVIXjAAIAACIIOQAAACpnTIKmAAAcWEFMglzAAAIAAhOMAlzAAIA8ICgQACAAACAAQECg2ECg1QgvkBgvkDQgBgCAAgCIYIAAA8OH3IgHlU");
	this.shape.setTransform(182.85,60.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#4A362C").ss(3,1,0,3).p("AgFABIALgB");
	this.shape_1.setTransform(2.125,76.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E6E6E").s().p("A8OIjIgGlTIAMgDIAFgBIIEhqIhfoEIgBgEIYIAAIKmAAIqmAAIAAh8IKmAAIAAB8IC3AAIAAhCIMQAAIAAFAIAAGUMglzgAIIAAoUIXiAAIAACIIORAAIuRAAIAAiII3iAAIAAIUIAABOMAlzAAAIAADxg");
	this.shape_2.setTransform(182.85,56.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5C5C5A").s().p("A8RDNIAAhaMA4jAAAIAABagAphh+IAAhOMAlzAAIIAABGg");
	this.shape_3.setTransform(183.175,99.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#4A362C").ss(3,1,1).p("ANPnTIC3AAIAAhCIMQAAIAAE/IAAGVIAABGIAADyMg4kAAAIAABaMA4kAAAIAAhaACpnTIAAh9IKmAAIAAB9ApdC3IAAoVIXjAAIAACIIOQAAACpnTIKmAAAcWEFMglzAAAIAAhOMAlzAAIA8ICgQACAAACAAQECg2ECg1QgvkBgvkDQgBgCAAgCIYIAAA8OH3IgHlU");
	this.shape_4.setTransform(182.85,60.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8C6252").s().p("A8OIjIgGlTIAMgDIAFgBIIEhqIhfoEIgBgEIYIAAIKmAAIqmAAIAAh8IKmAAIAAB8IC3AAIAAhCIMQAAIAAFAIAAGUMglzgAIIAAoUIXiAAIAACIIORAAIuRAAIAAiII3iAAIAAIUIAABOMAlzAAAIAADxg");
	this.shape_5.setTransform(182.85,56.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#6C4438").s().p("A8RDNIAAhaMA4jAAAIAABagAphh+IAAhOMAlzAAIIAABGg");
	this.shape_6.setTransform(183.175,99.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_1},{t:this.shape_4}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,365.7,121.5);


(lib.bg_symbol = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gemini_Generated_Image_yumvowyumvowyumv();
	this.instance.setTransform(-579,-388);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg_symbol, new cjs.Rectangle(-579,-388,1360,784), null);


(lib.bar_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bar
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("ANhAKIAABmI2FNpIgPh0IktoCIMmoCIBqhEIkvnDIH+kygAg6ifIjFlBIAAjGAozNlIWUtb");
	this.shape.setTransform(87.95,99.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5C5C5A").s().p("ArJLMIWTtbIAABnI2ENngAmVp5IAAjFIEvHCIhqBEg");
	this.shape_1.setTransform(102.975,115.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E6E6E").s().p("AtfGcIMloBIBphEIkunCIH+kyIJiPgI2UNcg");
	this.shape_2.setTransform(87.95,94.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#4A362C").ss(3,1,1).p("ANhAKIAABmI2FNpIgPh0IktoCIMmoCIBqhEIkvnDIH+kygAg6ifIjFlBIAAjGAozNlIWUtb");
	this.shape_3.setTransform(87.95,99.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8C6252").s().p("AtfGcIMloBIBphEIkunCIH+kyIJiPgI2UNcg");
	this.shape_4.setTransform(87.95,94.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6C4438").s().p("ArJLMIWTtbIAABnI2ENngAmVp5IAAjFIEvHCIhqBEg");
	this.shape_5.setTransform(102.975,115.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,175.9,199.9);


(lib.b_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// b
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("AYjo4IBnCbMgiZAU8QlcB+kChGQk6hUjijpIAAC9QCuDJEUBaQFSCWIFjPIf6z9IAAjhAYksaIgBDiA4jGJIFrjqIA8BXIFEjDIAAhBIbOw1IA5BOIFKjDIELGeIhpBIIBoCaA6JKaIB/hZIBQg3IhpiBIAZC4");
	this.shape.setTransform(168.925,122.4134);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5C5C5A").s().p("AzHOrQkUhaiujJIAAi9QDiDpE6BUQECBGFch+MAiZgU8IAADhI/6T9QksB4jvAAQiuAAiOg/gA4jC6IBpCBIhQA3gAW7uhIBphIIgBDig");
	this.shape_1.setTransform(168.925,143.1134);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E6E6E").s().p("AxtQ8Qk6hUjijqIB/hYIBQg4IhpiBIFrjqIA8BXIFEjDIAAhCIbOw0IA5BOIFKjDIELGeIhpBIIBoCbIBnCaMgiZAU8QjgBSi7AAQhnAAhcgZg");
	this.shape_2.setTransform(168.925,112.3718);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#4A362C").ss(3,1,1).p("AYjo4IBnCbMgiZAU8QlcB+kChGQk6hUjijpIAAC9QCuDJEUBaQFSCWIFjPIf6z9IAAjhAYksaIgBDiA4jGJIFrjqIA8BXIFEjDIAAhBIbOw1IA5BOIFKjDIELGeIhpBIIBoCaA6JKaIB/hZIBQg3IhpiBIAZC4");
	this.shape_3.setTransform(168.925,122.4134);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6C4438").s().p("AzHOrQkUhaiujJIAAi9QDiDpE6BUQECBGFch+MAiZgU8IAADhI/6T9QksB4jvAAQiuAAiOg/gA4jC6IBpCBIhQA3gAW7uhIBphIIgBDig");
	this.shape_4.setTransform(168.925,143.1134);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8C6252").s().p("AxtQ8Qk6hUjijqIB/hYIBQg4IhpiBIFrjqIA8BXIFEjDIAAhCIbOw0IA5BOIFKjDIELGeIhpBIIBoCbIBnCaMgiZAU8QjgBSi7AAQhnAAhcgZg");
	this.shape_5.setTransform(168.925,112.3718);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,337.9,244.9);


(lib.auditorio_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#525252").ss(3,1,1).p("ALdF3IB6hFIgEj9Ij8CeICGCkIBIBYIpfGEIkwmKADGSVIBMgoIAAjWIIhlBIgOiHAC9ulICqhmIHsRAAtWk2IBog9AstqSIAADCIA/BdIBng+IimjhINOoCICcDvAirNcIBBg7IAAlYIg+AnIqusmIAuFrIJ9MnIADlsAqHmxINEn0ADGSVIAAlCAhqMhIEwF0");
	this.shape.setTransform(86.975,105.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5C5C5A").s().p("AhqIhIAAlZIEwGKIAAFCgADGJSIJfmEIAOCHIohFCIAADVIhMAogAsojKIgultIKuMnIgDFrgAioDwIA+goIAAFZIhBA6gAhqDIgAJXgtID8idIAED7Ih6BFgAstrRIAAjBICmDgIhnA+g");
	this.shape_1.setTransform(86.975,130.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6E6E6E").s().p("AhoJqIg+AnIqusmIBog+IBng+IimjgINOoCICcDvItEHzINEnzICqhmIHsRAIj8CeICGCkIBIBYIpfGEg");
	this.shape_2.setTransform(86.8,88.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#4A362C").ss(3,1,1).p("ALdF3IB6hFIgEj9Ij8CeICGCkIBIBYIpfGEIkwmKIg+AnIqusmIBog9IBng+IimjhIAADCIA/BdADGSVIBMgoIAAjWIIhlBIgOiHAC9ulICqhmIHsRAAhqMhIAAlYAirNcIADlsAirNcIBBg7IEwF0IAAlCAtWk2IAuFrIJ9MnAqHmxINEn0AstqSINOoCICcDv");
	this.shape_3.setTransform(86.975,105.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8C6252").s().p("AhoJqIg+AnIqusmIBog+IBng+IimjgINOoCICcDvItEHzINEnzICqhmIHsRAIj8CeICGCkIBIBYIpfGEg");
	this.shape_4.setTransform(86.8,88.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6C4438").s().p("AhqIhIAAlZIEwGKIAAFCgADGJSIJfmEIAOCHIohFCIAADVIhMAogAsojKIgultIKuMnIgDFrgAioDwIA+goIAAFZIhBA6gAJXgtID8idIAED7Ih6BFgAstrRIAAjBICmDgIhnA+g");
	this.shape_5.setTransform(86.975,130.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-13.7,174,237.5);


(lib.sustain_upgrade_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#009900").ss(5,1,1).p("Am0hiINpAAIAADGItpAAg");
	this.shape.setTransform(157.475,107.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009900").s().p("Am0BjIAAjGINpAAIAADGg");
	this.shape_1.setTransform(157.475,107.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#009900").ss(5,1,1).p("ABNBkIAAjGIKZAAIAADGIqZAAIsyAAIAAjGIMyAA");
	this.shape_2.setTransform(188,107.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#009900").s().p("ABNBjIsyAAIAAjGIMyAAIAADGIAAjGIKZAAIAADGgABNhjg");
	this.shape_3.setTransform(188,107.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#009900").ss(5,1,1).p("AD4hiIOpAAIAADGIupAAIplAAIAAjGgAD4BkIAAjGAltBkIszAAIAAjGIMzAA");
	this.shape_4.setTransform(232.275,107.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#009900").s().p("AD4BjIAAjGIOpAAIAADGgAltBjIAAjGIJlAAIAADGgAygBjIAAjGIMzAAIAADGgAlthjg");
	this.shape_5.setTransform(232.275,107.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

	// course_upgrade
	this.sustain_upgrade_price_txt = new cjs.Text("€€€", "24px 'Bebas Neue'", "#FFFFFF");
	this.sustain_upgrade_price_txt.name = "sustain_upgrade_price_txt";
	this.sustain_upgrade_price_txt.textAlign = "center";
	this.sustain_upgrade_price_txt.lineHeight = 31;
	this.sustain_upgrade_price_txt.lineWidth = 86;
	this.sustain_upgrade_price_txt.parent = this;
	this.sustain_upgrade_price_txt.setTransform(308.05,50.65);

	this.text = new cjs.Text("comprar", "24px 'Bebas Neue'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 31;
	this.text.lineWidth = 86;
	this.text.parent = this;
	this.text.setTransform(308.05,23.15);

	this.instance = new lib.sustain_upgrade_button_mc();
	this.instance.setTransform(307.75,50.65,1,1,0,0,0,42.5,38.3);

	this.sustain_upgrade_desc_txt = new cjs.Text("Descrição", "14px 'Tahoma'", "#FFFFFF");
	this.sustain_upgrade_desc_txt.name = "sustain_upgrade_desc_txt";
	this.sustain_upgrade_desc_txt.lineHeight = 19;
	this.sustain_upgrade_desc_txt.lineWidth = 143;
	this.sustain_upgrade_desc_txt.parent = this;
	this.sustain_upgrade_desc_txt.setTransform(113.65,42.95);

	this.sustain_upgrade_title_txt = new cjs.Text("título", "32px 'Bebas Neue'", "#FFFFFF");
	this.sustain_upgrade_title_txt.name = "sustain_upgrade_title_txt";
	this.sustain_upgrade_title_txt.lineHeight = 40;
	this.sustain_upgrade_title_txt.lineWidth = 86;
	this.sustain_upgrade_title_txt.parent = this;
	this.sustain_upgrade_title_txt.setTransform(113.65,8.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#4A362C").ss(5,1,1).p("A8WqDMA4tAAAIAAUHMg4tAAAgAaEExIAADHMglAAAAIAAjHg");
	this.shape_6.setTransform(183.95,66.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#4A362C").s().p("AygBjIAAjGMAlBAAAIAADGg");
	this.shape_7.setTransform(232.275,107.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8C6252").s().p("A8VKEIAA0HMA4rAAAIAAUHgArPH4IASAAMAlBAAAIAYAAIAAjHIgYAAMglBAAAIgSAAgAMtDdINRAAIAAr9ItRAAg");
	this.shape_8.setTransform(183.95,66.875);

	this.instance_1 = new lib.course_upgrade_button_mc();
	this.instance_1.setTransform(307.75,50.65,1,1,0,0,0,42.5,38.3);

	this.infra_upgrade_desc_txt = new cjs.Text("Descrição", "14px 'Tahoma'", "#FFFFFF");
	this.infra_upgrade_desc_txt.name = "infra_upgrade_desc_txt";
	this.infra_upgrade_desc_txt.lineHeight = 19;
	this.infra_upgrade_desc_txt.lineWidth = 143;
	this.infra_upgrade_desc_txt.parent = this;
	this.infra_upgrade_desc_txt.setTransform(113.65,42.95);

	this.infra_upgrade_title_txt = new cjs.Text("título", "32px 'Bebas Neue'", "#FFFFFF");
	this.infra_upgrade_title_txt.name = "infra_upgrade_title_txt";
	this.infra_upgrade_title_txt.lineHeight = 40;
	this.infra_upgrade_title_txt.lineWidth = 86;
	this.infra_upgrade_title_txt.parent = this;
	this.infra_upgrade_title_txt.setTransform(113.65,8.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#525252").ss(5,1,1).p("Amol+INRAAIAAL9ItRAAg");
	this.shape_9.setTransform(307.725,50.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#525252").s().p("AmoF/IAAr9INRAAIAAL9g");
	this.shape_10.setTransform(307.725,50.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.sustain_upgrade_title_txt,p:{x:113.65,y:8.25,text:"título",font:"32px 'Bebas Neue'",textAlign:"",lineHeight:40.4}},{t:this.sustain_upgrade_desc_txt,p:{x:113.65,y:42.95,text:"Descrição",font:"14px 'Tahoma'",textAlign:"",lineHeight:18.9,lineWidth:143}},{t:this.instance},{t:this.text,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.sustain_upgrade_price_txt,p:{y:50.65,text:"€€€",color:"#FFFFFF"}}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.infra_upgrade_title_txt},{t:this.infra_upgrade_desc_txt},{t:this.sustain_upgrade_title_txt,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8}},{t:this.sustain_upgrade_desc_txt,p:{x:308.05,y:50.65,text:"€€€",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.instance_1},{t:this.text,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.sustain_upgrade_price_txt,p:{y:50.65,text:"€€€",color:"#FFFFFF"}}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.infra_upgrade_title_txt},{t:this.infra_upgrade_desc_txt},{t:this.sustain_upgrade_title_txt,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8}},{t:this.sustain_upgrade_desc_txt,p:{x:308.05,y:50.65,text:"€€€",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.instance_1},{t:this.text,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.sustain_upgrade_price_txt,p:{y:50.65,text:"€€€",color:"#FFFFFF"}}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_10},{t:this.shape_6},{t:this.shape_9},{t:this.sustain_upgrade_desc_txt,p:{x:113.65,y:8.25,text:"título",font:"32px 'Bebas Neue'",textAlign:"",lineHeight:40.4,lineWidth:86}},{t:this.text,p:{x:113.65,y:42.95,text:"Descrição",font:"14px 'Tahoma'",textAlign:"",lineHeight:18.9,lineWidth:143}},{t:this.sustain_upgrade_price_txt,p:{y:37.7,text:"MÁX",color:"#666666"}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,367.9,133.8);


(lib.infra_upgrade_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#009900").ss(5,1,1).p("Am0hiINpAAIAADGItpAAg");
	this.shape.setTransform(157.475,107.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009900").s().p("Am0BjIAAjGINpAAIAADGg");
	this.shape_1.setTransform(157.475,107.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#009900").ss(5,1,1).p("ABNhiIKZAAIAADGIqZAAgABNBkIsyAAIAAjGIMyAA");
	this.shape_2.setTransform(188,107.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#009900").s().p("ABNBjIAAjGIKZAAIAADGgABNBjIsyAAIAAjGIMyAAIAADGg");
	this.shape_3.setTransform(188,107.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#009900").ss(5,1,1).p("AD4hiIOpAAIAADGIupAAgAlthiIJlAAAD4BkIplAAIAAjGAltBkIszAAIAAjGIMzAA");
	this.shape_4.setTransform(232.275,107.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#009900").s().p("AD4BjIAAjGIOpAAIAADGgAltBjIAAjGIJlAAIAADGgAltBjIszAAIAAjGIMzAAIAADGg");
	this.shape_5.setTransform(232.275,107.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

	// course_upgrade
	this.infra_upgrade_price_txt = new cjs.Text("€€€", "24px 'Bebas Neue'", "#FFFFFF");
	this.infra_upgrade_price_txt.name = "infra_upgrade_price_txt";
	this.infra_upgrade_price_txt.textAlign = "center";
	this.infra_upgrade_price_txt.lineHeight = 31;
	this.infra_upgrade_price_txt.lineWidth = 86;
	this.infra_upgrade_price_txt.parent = this;
	this.infra_upgrade_price_txt.setTransform(308.05,50.65);

	this.text = new cjs.Text("comprar", "24px 'Bebas Neue'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 31;
	this.text.lineWidth = 86;
	this.text.parent = this;
	this.text.setTransform(308.05,23.15);

	this.instance = new lib.infra_upgrade_button_mc();
	this.instance.setTransform(307.75,50.65,1,1,0,0,0,42.5,38.3);

	this.infra_upgrade_desc_txt = new cjs.Text("Descrição", "14px 'Tahoma'", "#FFFFFF");
	this.infra_upgrade_desc_txt.name = "infra_upgrade_desc_txt";
	this.infra_upgrade_desc_txt.lineHeight = 19;
	this.infra_upgrade_desc_txt.lineWidth = 143;
	this.infra_upgrade_desc_txt.parent = this;
	this.infra_upgrade_desc_txt.setTransform(113.65,42.95);

	this.infra_upgrade_title_txt = new cjs.Text("título", "32px 'Bebas Neue'", "#FFFFFF");
	this.infra_upgrade_title_txt.name = "infra_upgrade_title_txt";
	this.infra_upgrade_title_txt.lineHeight = 40;
	this.infra_upgrade_title_txt.lineWidth = 86;
	this.infra_upgrade_title_txt.parent = this;
	this.infra_upgrade_title_txt.setTransform(113.65,8.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#4A362C").ss(5,1,1).p("AaEExIAADHMglAAAAIAAjHgA8WqDMA4tAAAIAAUHMg4tAAAg");
	this.shape_6.setTransform(183.95,66.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#4A362C").s().p("AygBjIAAjGMAlBAAAIAADGg");
	this.shape_7.setTransform(232.275,107.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8C6252").s().p("A8VKEIAA0HMA4rAAAIAAUHgArPH4IASAAMAlBAAAIAYAAIAAjHIgYAAMglBAAAIgSAAgAMtDdINRAAIAAr9ItRAAg");
	this.shape_8.setTransform(183.95,66.875);

	this.instance_1 = new lib.course_upgrade_button_mc();
	this.instance_1.setTransform(307.75,50.65,1,1,0,0,0,42.5,38.3);

	this.infra_upgrade_desc_txt_1 = new cjs.Text("Descrição", "14px 'Tahoma'", "#FFFFFF");
	this.infra_upgrade_desc_txt_1.name = "infra_upgrade_desc_txt_1";
	this.infra_upgrade_desc_txt_1.lineHeight = 19;
	this.infra_upgrade_desc_txt_1.lineWidth = 143;
	this.infra_upgrade_desc_txt_1.parent = this;
	this.infra_upgrade_desc_txt_1.setTransform(113.65,42.95);

	this.infra_upgrade_title_txt_1 = new cjs.Text("título", "32px 'Bebas Neue'", "#FFFFFF");
	this.infra_upgrade_title_txt_1.name = "infra_upgrade_title_txt_1";
	this.infra_upgrade_title_txt_1.lineHeight = 40;
	this.infra_upgrade_title_txt_1.lineWidth = 86;
	this.infra_upgrade_title_txt_1.parent = this;
	this.infra_upgrade_title_txt_1.setTransform(113.65,8.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#525252").ss(5,1,1).p("Amol+INRAAIAAL9ItRAAg");
	this.shape_9.setTransform(307.725,50.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#525252").s().p("AmoF/IAAr9INRAAIAAL9g");
	this.shape_10.setTransform(307.725,50.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.infra_upgrade_title_txt,p:{x:113.65,y:8.25,text:"título",font:"32px 'Bebas Neue'",textAlign:"",lineHeight:40.4}},{t:this.infra_upgrade_desc_txt,p:{x:113.65,y:42.95,text:"Descrição",font:"14px 'Tahoma'",textAlign:"",lineHeight:18.9,lineWidth:143}},{t:this.instance},{t:this.text,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.infra_upgrade_price_txt,p:{y:50.65,text:"€€€",color:"#FFFFFF"}}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.infra_upgrade_title_txt_1},{t:this.infra_upgrade_desc_txt_1},{t:this.infra_upgrade_title_txt,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8}},{t:this.infra_upgrade_desc_txt,p:{x:308.05,y:50.65,text:"€€€",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.instance_1},{t:this.text,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.infra_upgrade_price_txt,p:{y:50.65,text:"€€€",color:"#FFFFFF"}}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.infra_upgrade_title_txt_1},{t:this.infra_upgrade_desc_txt_1},{t:this.infra_upgrade_title_txt,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8}},{t:this.infra_upgrade_desc_txt,p:{x:308.05,y:50.65,text:"€€€",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.instance_1},{t:this.text,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.infra_upgrade_price_txt,p:{y:50.65,text:"€€€",color:"#FFFFFF"}}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_10},{t:this.shape_6},{t:this.shape_9},{t:this.infra_upgrade_desc_txt,p:{x:113.65,y:8.25,text:"título",font:"32px 'Bebas Neue'",textAlign:"",lineHeight:40.4,lineWidth:86}},{t:this.text,p:{x:113.65,y:42.95,text:"Descrição",font:"14px 'Tahoma'",textAlign:"",lineHeight:18.9,lineWidth:143}},{t:this.infra_upgrade_price_txt,p:{y:37.7,text:"MÁX",color:"#666666"}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,367.9,133.8);


(lib.course_upgrade_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#009900").ss(5,1,1).p("Am0hiINpAAIAADGItpAAg");
	this.shape.setTransform(157.475,107.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#009900").s().p("Am0BjIAAjGINpAAIAADGg");
	this.shape_1.setTransform(157.475,107.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#009900").ss(5,1,1).p("ABNBkIAAjGIKZAAIAADGIqZAAIsyAAIAAjGIMyAA");
	this.shape_2.setTransform(188,107.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#009900").s().p("ABNBjIsyAAIAAjGIMyAAIAADGIAAjGIKZAAIAADGgABNhjg");
	this.shape_3.setTransform(188,107.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#009900").ss(5,1,1).p("AD4hiIOpAAIAADGIupAAIplAAIAAjGgAD4BkIAAjGAltBkIszAAIAAjGIMzAA");
	this.shape_4.setTransform(232.275,107.35);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#009900").s().p("AD4BjIAAjGIOpAAIAADGgAltBjIAAjGIJlAAIAADGgAygBjIAAjGIMzAAIAADGgAlthjg");
	this.shape_5.setTransform(232.275,107.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

	// course_upgrade
	this.course_upgrade_price_txt = new cjs.Text("€€€", "24px 'Bebas Neue'", "#FFFFFF");
	this.course_upgrade_price_txt.name = "course_upgrade_price_txt";
	this.course_upgrade_price_txt.textAlign = "center";
	this.course_upgrade_price_txt.lineHeight = 31;
	this.course_upgrade_price_txt.lineWidth = 86;
	this.course_upgrade_price_txt.parent = this;
	this.course_upgrade_price_txt.setTransform(308.05,50.65);

	this.text = new cjs.Text("comprar", "24px 'Bebas Neue'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 31;
	this.text.lineWidth = 86;
	this.text.parent = this;
	this.text.setTransform(308.05,23.15);

	this.instance = new lib.course_upgrade_button_mc();
	this.instance.setTransform(307.75,50.65,1,1,0,0,0,42.5,38.3);

	this.course_upgrade_desc_txt = new cjs.Text("Descrição", "14px 'Tahoma'", "#FFFFFF");
	this.course_upgrade_desc_txt.name = "course_upgrade_desc_txt";
	this.course_upgrade_desc_txt.lineHeight = 19;
	this.course_upgrade_desc_txt.lineWidth = 143;
	this.course_upgrade_desc_txt.parent = this;
	this.course_upgrade_desc_txt.setTransform(113.65,42.95);

	this.course_upgrade_title_txt = new cjs.Text("título", "32px 'Bebas Neue'", "#FFFFFF");
	this.course_upgrade_title_txt.name = "course_upgrade_title_txt";
	this.course_upgrade_title_txt.lineHeight = 40;
	this.course_upgrade_title_txt.lineWidth = 86;
	this.course_upgrade_title_txt.parent = this;
	this.course_upgrade_title_txt.setTransform(113.65,8.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#4A362C").ss(5,1,1).p("A8WqDMA4tAAAIAAUHMg4tAAAgAaEExIAADHMglAAAAIAAjHg");
	this.shape_6.setTransform(183.95,66.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#4A362C").s().p("AygBjIAAjGMAlBAAAIAADGg");
	this.shape_7.setTransform(232.275,107.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8C6252").s().p("A8VKEIAA0HMA4rAAAIAAUHgArPH4IASAAMAlBAAAIAYAAIAAjHIgYAAMglBAAAIgSAAgAMtDdINRAAIAAr9ItRAAg");
	this.shape_8.setTransform(183.95,66.875);

	this.infra_upgrade_desc_txt = new cjs.Text("Descrição", "14px 'Tahoma'", "#FFFFFF");
	this.infra_upgrade_desc_txt.name = "infra_upgrade_desc_txt";
	this.infra_upgrade_desc_txt.lineHeight = 19;
	this.infra_upgrade_desc_txt.lineWidth = 143;
	this.infra_upgrade_desc_txt.parent = this;
	this.infra_upgrade_desc_txt.setTransform(113.65,42.95);

	this.infra_upgrade_title_txt = new cjs.Text("título", "32px 'Bebas Neue'", "#FFFFFF");
	this.infra_upgrade_title_txt.name = "infra_upgrade_title_txt";
	this.infra_upgrade_title_txt.lineHeight = 40;
	this.infra_upgrade_title_txt.lineWidth = 86;
	this.infra_upgrade_title_txt.parent = this;
	this.infra_upgrade_title_txt.setTransform(113.65,8.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#525252").ss(5,1,1).p("Amol+INRAAIAAL9ItRAAg");
	this.shape_9.setTransform(307.725,50.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#525252").s().p("AmoF/IAAr9INRAAIAAL9g");
	this.shape_10.setTransform(307.725,50.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.course_upgrade_title_txt,p:{x:113.65,y:8.25,text:"título",font:"32px 'Bebas Neue'",textAlign:"",lineHeight:40.4}},{t:this.course_upgrade_desc_txt,p:{x:113.65,y:42.95,text:"Descrição",font:"14px 'Tahoma'",textAlign:"",lineHeight:18.9,lineWidth:143}},{t:this.instance},{t:this.text,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.course_upgrade_price_txt,p:{y:50.65,text:"€€€",color:"#FFFFFF"}}]}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.infra_upgrade_title_txt},{t:this.infra_upgrade_desc_txt},{t:this.course_upgrade_title_txt,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8}},{t:this.course_upgrade_desc_txt,p:{x:308.05,y:50.65,text:"€€€",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.instance},{t:this.text,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.course_upgrade_price_txt,p:{y:50.65,text:"€€€",color:"#FFFFFF"}}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.infra_upgrade_title_txt},{t:this.infra_upgrade_desc_txt},{t:this.course_upgrade_title_txt,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8}},{t:this.course_upgrade_desc_txt,p:{x:308.05,y:50.65,text:"€€€",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.instance},{t:this.text,p:{x:308.05,y:23.15,text:"comprar",font:"24px 'Bebas Neue'",textAlign:"center",lineHeight:30.8,lineWidth:86}},{t:this.course_upgrade_price_txt,p:{y:50.65,text:"€€€",color:"#FFFFFF"}}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_10},{t:this.shape_6},{t:this.shape_9},{t:this.course_upgrade_desc_txt,p:{x:113.65,y:8.25,text:"título",font:"32px 'Bebas Neue'",textAlign:"",lineHeight:40.4,lineWidth:86}},{t:this.text,p:{x:113.65,y:42.95,text:"Descrição",font:"14px 'Tahoma'",textAlign:"",lineHeight:18.9,lineWidth:143}},{t:this.course_upgrade_price_txt,p:{y:37.7,text:"MÁX",color:"#666666"}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,367.9,133.8);


(lib.upgrade_mc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sustain_upgrade_mc
	this.instance = new lib.sustain_upgrade_mc();
	this.instance.setTransform(193.15,431.45,1,1,0,0,0,184,66.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// infra_upgrade_mc
	this.instance_1 = new lib.infra_upgrade_mc();
	this.instance_1.setTransform(193.15,292.5,1,1,0,0,0,184,66.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// course_upgrade_mc
	this.instance_2 = new lib.course_upgrade_mc();
	this.instance_2.setTransform(193.15,153.55,1,1,0,0,0,184,66.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// upgrade
	this.upgrade_mc_title = new cjs.Text("título", "54px 'Bebas Neue'", "#CCCCCC");
	this.upgrade_mc_title.name = "upgrade_mc_title";
	this.upgrade_mc_title.textAlign = "center";
	this.upgrade_mc_title.lineHeight = 67;
	this.upgrade_mc_title.lineWidth = 129;
	this.upgrade_mc_title.parent = this;
	this.upgrade_mc_title.setTransform(186,8.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#4A362C").ss(5,1,1).p("EgdwgnZMA7ZAAAIAAKNMg7ZAAAgA9u7kMA7fAAAMAAABC+Mg7fAAAg");
	this.shape.setTransform(193,254.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6C4438").s().p("EgduAnaMAAAhC+MA7fAAAMAAABC+gA9w9LIAAqOMA7ZAAAIAAKOg");
	this.shape_1.setTransform(193,254.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.upgrade_mc_title}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.upgrade_mc, new cjs.Rectangle(0,0,386,509.4), null);


// stage content:
(lib.isep_game = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// upgrade_mc
	this.instance = new lib.upgrade_mc();
	this.instance.setTransform(223.3,417.05,1,1,0,0,0,193,285.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// ui_mc
	this.instance_1 = new lib.ui_mc();
	this.instance_1.setTransform(361.3,60.8,1,1,0,0,0,331,37.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// auditorio_mc
	this.instance_2 = new lib.auditorio_mc();
	this.instance_2.setTransform(821.2,186.8,1,1,0,0,0,87,118.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// edif_extra
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#817D72").ss(3,1,1).p("AkCAAIIFAA");
	this.shape.setTransform(1800.5,759.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#5F5F5D").ss(3,1,1).p("Agu0sINrAAIAAlmIkCAAIAAi5IBLAAIAAi2IhLAAIAAizIobAAIAAArIhSAAgA9IlHIAAEhIPPAAIAAvMIvGAAIAAEhIhhAAIAAGKgAF0ISIAABOIX3AAIAJzUIkJAAIAAnQIz3AAIAABZIhwAAIAAX9gAOsWsIAACzIjFAAIAAA1IhDAAIAAIhILLAAIAAneIIyAAIAArzIrKAAIAAhvIsxAAIAAI3AF0vrIAAX9");
	this.shape_1.setTransform(1732.425,613.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#817D72").s().p("EAKkAi1IAAohIBDAAIAAg1IDFAAIAAizIoGAAIAAo3IMxAAIAABvILKAAIAALzIoyAAIAAHegAF0JgIAAhOIhwAAIAA39IBwAAIAAhZIT3AAIAAHRIEJAAIgJTTgAF0ISIAA39gA9IgnIAAkgIhYAAIAAmKIBhAAIAAkhIPGAAIAAPLgAgu0sIgEtdIBSAAIAAgrIIbAAIAACzIBLAAIAAC2IhLAAIAAC6IECAAIAAFlg");
	this.shape_2.setTransform(1732.425,613.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// biblioteca_mc
	this.instance_3 = new lib.biblioteca_mc();
	this.instance_3.setTransform(1484.1,884.2,1,1,0,0,0,182.8,60.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// secretaria_mc
	this.instance_4 = new lib.secretaria_mc();
	this.instance_4.setTransform(1210.85,880.7,1,1,0,0,0,165.3,88.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// c_mc
	this.instance_5 = new lib.c_mc();
	this.instance_5.setTransform(1504.65,680.75,1,1,0,0,0,152.8,56.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// f_mc
	this.instance_6 = new lib.f_mc();
	this.instance_6.setTransform(1386.75,255.2,1,1,0,0,0,264.7,176.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// j_mc
	this.instance_7 = new lib.j_mc();
	this.instance_7.setTransform(1182.25,646.95,1,1,0,0,0,116.2,113.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// i_mc
	this.instance_8 = new lib.i_mc();
	this.instance_8.setTransform(957.1,656.4,1,1,0,0,0,146.4,167.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// b_mc
	this.instance_9 = new lib.b_mc();
	this.instance_9.setTransform(726.3,829.5,1,1,0,0,0,168.9,122.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// l
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#525252").ss(3,1,1).p("AoslJIJ7meIHXLPIgRBpIpqGdInIrJIgPhuIHXLRIJ7mgArSlWIAAFAIJfOLIAAkdIpfuuINSoeIJTOgAhVGIIAABmAhzN1IMrolIAbkkItGIs");
	this.shape_3.setTransform(744.325,693);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#5C5C5A").s().p("ArSklIAAlAIJfOtIAAEegAhzFIINGoqIgbEjIsrIlgAhVDfIAAhmIJ7mhIgRBrIpqGcgAodnqIgPhuIHXLRIAABmgAhVB5g");
	this.shape_4.setTransform(744.325,720.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#6E6E6E").s().p("ArSjHINSofIJTOhItGIrgAosi5IAPBtIHILJIJqmdIARhqIp7GhInXrQIJ7mfIHXLOInXrOIp7Gfg");
	this.shape_5.setTransform(744.325,678.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	// g_mc
	this.instance_10 = new lib.g_mc();
	this.instance_10.setTransform(547.2,706.05,1,1,0,0,0,123,163);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// h_mc
	this.instance_11 = new lib.h_mc();
	this.instance_11.setTransform(649.3,463.25,1,1,0,0,0,173.5,142.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// bar_mc
	this.instance_12 = new lib.bar_mc();
	this.instance_12.setTransform(875.95,333.6,1,1,0,0,0,88,100);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// estrada
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#333333").ss(3,1,1).p("EgxohPvIAkA+IImOrIAABrQALBiiQB1IElHHIDmhxILxUzIBjDNIhAFCIGwgvIBIgpIlVnUIDbiHQhEALh4g8IoGtlIBOhXIMnoKIE3G/IA9goIhykBIDFiNIksmkImCEWIiij0InUEgICADbQjuDGhphVItu3OIlPAAEBL6BIMMAAAhO4Ig4AAIAAo3ImSCiIAAKUIAaR2IBnAAMAAAAvXIBDAzIAAIcQhoBRhQhhIAAikMg3wgASIAAH3MA30AAAIAADQIHXAAIAAmgIgdgfIAAglIAtAAIEYAAIAApKQgEg9Bfg9IDhAAIAADvIXuAAIAAshI3hAAIAAELImvAAQiSBQggDXIAALEEhKWBC8QhoB9jnAqIkWAzQlbA0lcg0QjPggi+hzQhOgviOisQhChiAkhMIkvgeIB+DYQDOEXC4BZQDuB4FFAJIPOghQDIADBuARQBgAPAZAaEhKWBC8QAMgPAKgPEhKWBC8IBpFc");
	this.shape_6.setTransform(1219.1,504.075);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("EBFABPRIAAjQMg30AAAIAAn3MA3wAASIAACkQBQBhBohRIAAocIhEgzMAAAgvXIhmAAIgax2IAAqUIGSiiIAAI3IA4AAMAAABO4IAAAlIAdAfIAAGggEhlkBGFQi4hZjOkXIh+jYIEuAeQgjBMBBBiQCPCsBOAvQC+BzDPAgQFbA0Fcg0IEWgzQDngqBoh9IBpFcQhugRjJgDIvOAhQlEgJjuh4gEBMnBHtIAArEQAgjXCShQIGuAAIAAkLIXiAAIAAMhI3uAAIAAjvIjhAAQhfA9AEA9IAAJKgA1F+NIhijNIrx0zIjmBxIklnHQCQh1gMhiIAAhrIolurIFOAAINwXOQBoBVDujGIiAjbIHUkgICiD0IGCkWIEsGkIjFCNIByEBIg9AoIk3m/IsnIKIhOBXIIGNlQB4A8BEgLIjcCHIFWHUIhJApImvAvg");
	this.shape_7.setTransform(1219.1,507.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// relva
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#588F4B").ss(3,2,0,3).p("EAYfhBfIKjQvIAxghIiMjhIYKvOICVDwICxhhQCPhDB6BwIDSiVIo2raI5XEqgEghnhFuMghBAUNIjGjcIaQ2lIGnBVgEgNCg+1IDMiEIHjpTIK2gcIk6OHIoGFAIlDozIjJCBgEgDngt+IIBNIQBhBmCOg1IZ+vyIq1wlIplGuIEyHfIkpDGIk3m/gEgPOAipIBGBRICuhyMAMJg6pIuf3aIh7BMINeWrgEgdVhERIgxhMI49OMQitAwjqDNQkvERiLBRIAzBJgEgczgy7IE9jNIlupTIkMCmIDUKhgEg6UgTsIDmiTIi0kcIDTiJIERGpIm/EagEhfPgCPIgrAhIDbFYId7xYIhtidI8nR1gEhpSAXyIiylUIuXHSIFZZGIC6M3QCZKPD5B/QD5B/HvA7MAuOgAhQlAjODCkiQJLmsOrnZQCshWgSlHQkGnxjgl2IkPDYMgrTAcKItmhYQlShohclMIl96XIhUmcQgBhBA3g3gEAqCAb3IAxhxIkEmrIbgxNIDbAAIAAqDIqfBDIpQuYIiqB9IhLh5I57P2ILyTBIBTg4gEgP3A4AICODxITJsfIiajQgEAQWAm0IBaCTIUGAAIAAr2IjIk1Iz+MMgEh60AX2IlT7XQACj4EGkMMApigexIBQBeI6WUfILKRLImeEsIFEH7IrKHRgEhq6AR2IC5FMIISlYIi0lDgEhKKATDIQ3btInaE7IxL72gEAcWBHKIAAGnMgueAAYIUlkKICdBmgEgRmA4zIuUIzICNDrIOsongEBjZALeIEsAAIAAlxIXzAAMgrtg3zIAAD2IFjISIGvL6IDHMEIh7BLIAACrIF2gTIAAJGIkJAAgEApTApcIFVAAIAADzQkmA+gyg+gEBjfAcOIEgAAIAAtNIkgAAgEBjmA3AIHYAAIAAwhIL4AAIAAk7IulAAIAAiRIk1AAgEBbdAUXIBmAAIAAcZIhmAAgEBjiA5XIIVAAIAADsImeAAQhdAegaBJg");
	this.shape_8.setTransform(1076.4395,470.6554);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#588F4B").s().p("EhruBL6Qj5h/iZqOIi6s4Ila5FIOYnSICxFUIiSBUQg3A2ABBCIBTGcIF+aWQBcFMFSBoINlBYMArUgcJIEOjZQDgF2EHHyQASFGisBXQurHYpMGsQjBEiE/DPMguNAAhQnvg8j5h/gEAClBJ/ICdBlIXckbIAAGoMgueAAXgEgfzBBmIOVozIClD3IusIngEBjqA5XIIVAAIAADsImfAAQhcAdgaBKgEgPvA3/IS9r9ICZDQIzIMegEBjtA3AIgJ3tIE1AAIAACRIOkAAIAAE7Ir3AAIAAQhgEhRwAX0IHukyIQ3btInaE8gEBbkAwwIAA8ZIBnAAIAAcZgEApYAtOIADjzIFVAAIAADzQiTAfhWAAQhWAAgZgfgEAR4ApHIhbiUIhliLIT+sNIDHE2IAAL2gEgPGAipMANBg6uItf2rIB7hLIOfXaMgMIA6pIiuBxgEBjnAcNIAAtMIEfAAIAANMgEAhXAM4IhTA5IryzBIZ8v2IBLB4ICqh8IJQOYIKfhEIAAKEIjbAAI7hRNIEEGqIgwBxgEh//gDhQACj5EFkMMApjgewIBQBeI6XUeILKRMImdErIFEH8IrKHRIt3HMgEhqyAR1IIWlPIC1FDIoSFZgEBjhALeIgEs2IEKAAIAApGIl3ATIAAiqIB7hMIjGsDImvr6IljoSIAAj2MArtA3yI3zAAIAAFygEhfygBvIArghICWD6Icox1IBsCdI97RYgEg6NgTsIDniTIi0kdIDSiJIESGqIm/EagEAEigg2IoCtJIMnoKIE2HAIEqjHIkzneIJmmuIK1QkI5+PyQgxASgrABQhTAAhAhDgEhEMgtzQCLhREukQQDrjOCsgwIY+uLIAxBMMgmMAXogEAYmhBgILnoqIZXkqII2LbIjTCVQh5hxiQBDIiwBiIiVjxI4KPOICMDhIgxAigEhFng09IaR2lIGnBVIDQEfMghCAUMgEghog82IEMimIFuJTIk9DNIhpAngEgJZhAUIjICAIgZghIDMiEIHjpUIK2gbIk6OHIoHE/g");
	this.shape_9.setTransform(1075.65,470.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8}]}).wait(1));

	// estacionamento_sec_mc
	this.instance_13 = new lib.estacionamento_sec_mc();
	this.instance_13.setTransform(1206.85,853.55,1,1,0,0,0,466.7,119.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// estacionamento_f_mc
	this.instance_14 = new lib.estacionamento_f_mc();
	this.instance_14.setTransform(1416.55,228,1,1,0,0,0,324.6,194.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	// estacionamento_baixo_mc
	this.instance_15 = new lib.estacionamento_baixo_mc();
	this.instance_15.setTransform(1122.5,511.6,1,1,0,0,0,121.4,180.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

	// estacionamento_h_mc
	this.instance_16 = new lib.estacionamento_h_mc();
	this.instance_16.setTransform(834.05,490.15,1,1,0,0,0,230.2,366.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1));

	// estacionamento_b_mc
	this.instance_17 = new lib.estacionamento_b_mc();
	this.instance_17.setTransform(477.6,757.25,1,1,0,0,0,101.4,150.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1));

	// estacionamento_eng_mc
	this.instance_18 = new lib.estacionamento_eng_mc();
	this.instance_18.setTransform(561.1,320.7,1,1,0,0,0,175.2,162.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1));

	// cimento
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#A4A4A2").ss(3,2,0,3).p("Eh/7gT+IluKZIEkS5MAFeAgjQCFNdFSKOQENKBKnCPMApyAC0MBa9gAhMBmYAAAMAAAhVMIj8hCMg4qhERIlhmLMg1kACOIm+hoI+QArIl0g5I2sAAIsLI6g");
	this.shape_10.setTransform(1086.1277,505.0111);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#A4A4A2").s().p("EhlcBNyQqniPkOqBQlRqOiFtdMgFfggjIkjy5IFuqZMBACgzVIMKo6IWtAAIFzA5IeQgrIG/BoMA1kgCOIFhGLMA4qBERID7BCMAAABVMMhmYAAAMha9AAhg");
	this.shape_11.setTransform(1086.175,505.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10}]}).wait(1));

	// Fundo
	this.fundo_mc = new lib.bg_symbol();
	this.fundo_mc.name = "fundo_mc";
	this.fundo_mc.setTransform(1040.8,535.9,1.5302,1.5302,0,0,0,101.2,4.2);

	this.timeline.addTween(cjs.Tween.get(this.fundo_mc).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(960,475.8,1121,659.6000000000001);
// library properties:
lib.properties = {
	id: 'C4EE32689A47AB45842BDB0D0E7EC980',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/isep_game_atlas_1.png?1765068675944", id:"isep_game_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C4EE32689A47AB45842BDB0D0E7EC980'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;