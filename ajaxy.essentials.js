(function( ) {
	var Ajaxy = function( object ) {
		return new Ajaxy.fn.init(object);
	};
	Ajaxy.fn = {
		object:null,
		init:function(object){
			if(typeof(object) == 'undefined'){
				Ajaxy.fn.object = null;
			}
			else{
				Ajaxy.fn.object = object;
			}
			return Ajaxy.fn;
		},
		/* 
		bool is_array ( )
		*/
		is_array:function(){
			if(this.is_object() && (this.object instanceof Array)){
				return true;
			}
			return false;
		},
		/* 
		bool is_undefined ( )
		*/
		is_undefined:function(){
			if(typeof(this.object) == 'undefined'){
				return true;
			}
			return false;
		},
		/* 
		bool is_function ( )
		*/
		is_function:function(){
			if(typeof(this.object) == 'function'){
				return true;
			}
			return false;
		},
		/* 
		bool is_null ( )
		*/
		is_null:function(){
			if(this.object == null){
				return true;
			}
			return false;
		},
		/* 
		bool is_number ( )
		*/
		is_number:function(){
			if(typeof(this.object) == 'number'){
				return true;
			}
			return false;
		},
		/* 
		bool is_integer ( )
		*/
		is_integer:function(){
			return this.is_number();
		},
		/* 
		bool is_string ( )
		*/
		is_string:function(){
			if(typeof(this.object) == 'string'){
				return true;
			}
			return false;
		},
		/* 
		bool is_array ( )
		*/
		is_object:function(){
			if(typeof(this.object) == 'object'){
				return true;
			}
			return false;
		},
		/* 
		bool is_boolean ( )
		*/
		is_boolean:function(){
			if(typeof(this.object) == 'boolean'){
				return true;
			}
			return false;
		},
		/* 
		bool is_empty ( )
		*/
		is_empty:function(){
			if(this.is_string()){
				if(this.trim() === ""){
					return true;
				}
			}
			return false;
		},
		/* 
		bool is_email ( )
		*/
		is_email:function(){
			var email = this.trim();
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (filter.test(email)) {
				return true;
			}
			else{
				return false;
			}
		},
		/* 
		string trim ( )
		*/
		trim:function() {
			if(this.is_string()){
				return this.object.replace(/^\s+|\s+$/g,"");
			}
		},
		/* 
		string ltrim ( )
		*/
		ltrim:function() {
			if(this.is_string()){
				return this.object.replace(/^\s+/,"");
			}
		},
		/* 
		string rtrim ( )
		*/
		rtrim:function() {
			if(this.is_string()){
				return this.object.replace(/\s+$/,"");
			}
		},
		/* 
		int sum ( )
		*/
		sum:function() {
			var array = this.values();
			var sum = 0;
			for(var i in array){
				sum += parseInt(array[i], 10);
			}
			return sum;
		},
		/* 
		int max ( )
		*/
		max:function() {
			return Math.max.apply(Math, this.values());
		},
		/* 
		int min ( )
		*/
		min:function() {
			return Math.min.apply(Math, this.values());
		},
		/*
		bool in_array ( array )
		*/
		in_array:function(array){
			if(typeof(array) == 'undefined'){
				return false;
			}
			if(Ajaxy(array).is_array() && !this.is_array()){
				for(var i in array){
					if(this.object == array[i]){
						return true;
					}
				}
			}
			return false;
		},
		/*
		array keys ( )
		*/
		keys:function(){
			var keys = [];
			if(this.is_array() || this.is_object()){
				for(var i in this.object){
					keys[keys.length] = i;
				}
			}
			return keys;
		},
		/*
		array values ( )
		*/
		values:function(){
			var values = [];
			if(this.is_array() || this.is_object()){
				for(var i in this.object){
					values[values.length] = this.object[i];
				}
			}
			return values;
		},
		/*
		array delete_key ( string )
		*/
		delete_key:function(key){
			var values = this.object;
			if(this.is_array() || this.is_object()){
				delete values[key];
			}
			return values;
		},
		/*
		array each ( )
		*/
		each:function(func){
			var values = [];
			if(typeof(array) == 'undefined'){
				return values;
			}
			if((this.is_array() || this.is_object()) && Ajaxy(func).is_function()){
				var m = 0;
				for(var i in this.object){
					values[values.length] = func(i , this.object[i], m, this.object.length);
					m ++;
				}
			}
			return values;
		},
		/*
		object get ( string , object (optional) )
		*/
		get:function(key, _default){
			if(typeof(key) == 'undefined'){
				return false;
			}
			if(typeof(_default) == 'undefined'){
				_default = false;
			}
			if(this.is_object()){
				if(typeof(this.object[key]) != 'undefined'){
					return this.object[key];
				}
			}
			return _default;
		},
		/*
		object set ( string, string )
		*/
		set:function(key, value){
			var m = this.object;
			if(typeof(key) == 'undefined' || typeof(value) == 'undefined'){
				return false;
			}
			if(this.is_object()){
				m[key] = value;
			}
			return m;
		},
		/*
		int random ( int, int )
		*/
		random:function (from, to){
			var m = to - from;
			var d = Math.floor( Math.random()*(parseInt(m, 10) + 1) );
			return d + parseInt(from);
		},
		/*
		array merge ( array )
		*/
		merge:function(array){
			var values = [];
			if(typeof(array) == 'undefined'){
				return this.object;
			}
			if((this.is_array() || this.is_object()) && (Ajaxy(array).is_object())){
				values = this.object;
				for(var i in array){
					values[i] = array[i];
				}
			}
			else if((this.is_array() || this.is_object()) && (Ajaxy(array).is_array())){
				values = this.object;
				if(this.is_object()){
					for(var i in array){
						values[i] = array[i];
					}
				}
				else{
					for(var i in array){
						values[this.object.length] = array[i];
					}
				}
			}
			return values;
		},
		/*
		array implode ( string )
		*/
		implode:function(input){
			if(typeof(input) == 'undefined'){
				input = '';
			}
			var t = '';
			if(this.is_object() || this.is_array()){
				var m = 0;
				for(var i in this.object){
					if(m == 0){
						t += this.object[i];
					}
					else{
						t += input + this.object[i];
					}
					m ++;
				}
			}
			return t;
		},
		/*
		array explode ( string )
		*/
		explode:function(input){
			var m = [];
			if(typeof(input) == 'undefined'){
				input = "";
			}
			if(!this.is_object() && !this.is_array()){
				return this.object.toString().split(input);
			}
			return m;
		},
		/*
		array sort ( )
		*/
		sort:function(){
			var array = this.values();
			if(this.is_object() || this.is_array()){
				array.sort();
			}
			return array;
		},
		/*
		array asort ( )
		*/
		asort:function(){
			var array = [];
			var out = [];
			if(this.is_object() || this.is_array()){
				for(var i in this.object){
					array.push([i, this.object[i]])
				}
				array.sort(function(a, b){ return a[1] - b[1];});
				for(var l in array){
					out[array[l][0]] = array[l][1];
				}
			}
			return out;
		},
		/*
		array ksort ( )
		*/
		ksort:function(){
			var array = this.keys();
			var out = [];
			if(this.is_object() || this.is_array()){
				array.sort();
				for(var i in array){
					out[array[i]] = this.object[array[i]];
				}
			}
			return out;
		},
		/*
		string date ( string )
		*/
		date:function(format){
			var dt = this.object;
			var day = dt.getDate();
			var month = dt.getMonth() + 1;
			var year = dt.getFullYear();
			var months 	= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var days 	= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var allowed = [',', ' ', '|', '/', '-', '_', '#'];
			var date_format = {
							d:(dt.getDate() < 10 ? '0'+ dt.getDate() :dt.getDate()),
							D:days[dt.getDay()].substr(0,3),
							j:dt.getDate(),
							l:days[dt.getDay()],
							w:dt.getDay(),
							F:months[dt.getMonth()],
							m:(dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1):(dt.getMonth() + 1)),
							M:months[dt.getMonth()].substr(0,3),
							n:dt.getMonth() + 1,
							t:new Date(year, month - 1, 0).getDate(),
							Y:dt.getFullYear(),
							y:dt.getFullYear().toString().substr(2,2),
							a:(dt.getHours() < 12 ? 'am' : 'pm'),
							A:(dt.getHours() < 12 ? 'AM' : 'PM'),
							g:(dt.getHours() <= 12 ? dt.getHours(): dt.getHours() - 12),
							G:dt.getHours() - 1,
							h:(dt.getHours() <= 12 ? (dt.getHours() < 10 ? '0'+ dt.getHours(): dt.getHours()): (dt.getHours() - 12 < 10 ? '0'+ (dt.getHours() - 12): dt.getHours() - 12) ),
							H:(dt.getHours() - 1 < 10 ? '0'+ (dt.getHours() - 1): dt.getHours() - 1),
							i:(dt.getMinutes() < 10 ? '0'+ (dt.getMinutes()): dt.getMinutes()),
							s:(dt.getSeconds() < 10 ? '0'+ (dt.getSeconds()): dt.getSeconds())
							};
			if(_(format).is_string()){
				var array = _(format).explode();
				for(var i = 0; i < array.length; i++){
					if(_(array[i]).in_array(_(date_format).keys())){
						st = false;
						ste = false;
						if(i == 0){
							st = true;
						}
						else if(_(array[i-1]).in_array(allowed)){
							st = true;
						}
						if(i == array.length - 1){
							ste = true;
						}
						else if(_(array[i+1]).in_array(allowed)){
							ste = true;
						}
						if(st && ste){
							array[i] = array[i].replace(array[i], date_format[array[i]]);
						}
					}
				}
				return _(array).implode('');
			}
			return '';
		},
		/*
		array reverse ( )
		*/
		reverse:function(){
			var array = this.object;
			if(this.is_object() || this.is_array()){
				array.reverse();
			}
			return array;
		},
		/*
		array remove ( string or integer )
		*/
		remove:function(index){
			var array = this.object;
			var out = [];
			if(this.is_object() || this.is_array() || this.is_string()){
				var k = 0;
				if(this.is_string()){
					array = this.explode();
				}
				for(var i in array){	
					if(i != index){
						out[i] = array[i];
					}
				}
			}
			if(this.is_string()){
				return _(out).implode();
			}
			return out;
		},
		/*
		string startsWith ( string )
		*/
		startsWith:function(str){
			if(typeof(str) == 'undefined'){
				str = "";
			}
			if(this.is_string()){
				return this.object.indexOf(str) == 0;
			}
		},
		/*
		string endsWith ( string )
		*/
		endsWith:function(str){
			if(typeof(str) == 'undefined'){
				str = "";
			}
			if(this.is_string()){
				return this.object.lastIndexOf(str) == this.object.length - str.length;
			}
		},
		/*
		object getHash ( )
		*/
		getHash:function(){
			var hash = location.hash;
			var ret = {};
			if(hash != ''){
				hash = hash.replace('#!', '').replace('#', '');
				var parts = hash.split('&');
				for (var i = 0; i < parts.length; i++) {
					var p = parts[i].split('=');
					if(p.length == 2){
						p[1] = decodeURIComponent(p[1].replace(/\+/g, " "));
						var v = p[0].search(/\[.+]/);
						if (v >= 0) { 
							var lastIndex = p[0].indexOf(']');
							var pname = p[0].substring(0, v);
							var name = p[0].substring(v + 1, lastIndex);
							var m = {};
							m[name] = p[1];
							if(typeof(ret[pname]) == 'undefined') ret[pname] = {};
							ret[pname][name] = unescape(p[1]);
						}
						else if (p[0].search(/\[\]/) >= 0) { 
							p[0] = p[0].replace('[]','');
							if (typeof ret[p[0]] != 'object') ret[p[0]] = [];
							ret[p[0]].push(unescape(p[1]));
						} 
						else {
							ret[p[0]] = unescape(p[1]);
						}
					}
				}
			}
			return ret;
		},
		/*
		object getParameter ( string )
		*/
		getParameter:function(param){
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			var ret = false;
			var out = {};
			var count = 0;
			for (var i=0; i<vars.length; i++) {
				var pair = vars[i].split("=");
				if (pair[0] == param) {
					return unescape(pair[1]);
				}
				else if(_(pair[0]).startsWith(param + '[') && _(pair[0]).endsWith(']')){
					var name = pair[0].substr( pair[0].indexOf('[') + 1, pair[0].indexOf(']') - pair[0].indexOf('[') - 1	);
					if(_(name).is_empty()){
						name = count;
						count ++;
					}
					out[name] = unescape(pair[1]);
					ret = true;
				}
			} 
			if(ret){
				return out;
			}
			return '';
		}
	}
	window.Ajaxy = window._ = Ajaxy;
})( window );
