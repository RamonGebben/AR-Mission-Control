var $ = jQuery = require('jquery');
var client = require('../client.js');

var inAir = false;

function method( functionName, context ) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(this, args);
}


$(document).on('keydown', function( e ){
	for( var key in keyCodes ){
		if( e.keyCode.toString() === key  ){
			method( keyCodes[ key ], window, 'on' )
			$('.button[data-method="'+ keyCodes[ key ] +'"]').addClass('active');
		}
	}
});

$(document).on('keyup', function( e ){
	for( var key in keyCodes ){
		if( e.keyCode.toString() === key  ){
			method( keyCodes[ key ], window, 'off' )
			$('.button[data-method="'+ keyCodes[ key ] +'"]').removeClass('active');
		}
	}
});

$(document).ready(function(){
	$('.button').on( 'mousedown', function( e ){
		method( $(e.currentTarget).data('method'), window, 'on' )
	});
	$('.button').on( 'mouseup', function( e ){
		method( $(e.currentTarget).data('method'), window, 'off' )
	});
});

var keyCodes = {
	"81": "counter_clockwise",
	"87": "forward",
	"69": "clockwise",
	"65": "left",
	"83": "backward",
	"68": "right",

	"32": "takeoff",
	"13": "land",

	"79": "up",
	"76": "down"
};

var up = function( swtch ) {
	switch( swtch ) {
		case "on":
			console.log("on");
			client.up(0.5);
			break;
		case "off":
			console.log("off");
			client.up(0);
			break;
		default:
			break;
	}
};

var down = function( swtch ) {
	switch( swtch ) {
		case "on":
			console.log("on");
			client.down(0.5);
			break;
		case "off":
			console.log("off");
			client.down(0);
			break;
		default:
			break;
	}
};

var counter_clockwise = function( swtch ) {
	switch( swtch ) {
		case "on":
			console.log("on");
			client.counterClockwise(0.5);
			break;
		case "off":
			console.log("off");
			client.counterClockwise(0);
			break;
		default:
			break;
	}
};

var forward = function( swtch ) {
	switch( swtch ) {
		case "on":
			console.log("on");
			client.front(0.5);
			break;
		case "off":
			console.log("off");
			client.front(0);
			break;
		default:
			break;
	}
};

var clockwise = function( swtch ) {
	switch( swtch ) {
		case "on":
			console.log("on");
			client.clockwise(0.5);
			break;
		case "off":
			console.log("off");
			client.clockwise(0);
			break;
		default:
			break;
	}
};

var left = function( swtch ) {
	switch( swtch ) {
		case "on":
			console.log("on");
			client.left(0.5);
			break;
		case "off":
			console.log("off");
			client.left(0);
			break;
		default:
			break;
	}
};

var right = function( swtch ) {
	switch( swtch ) {
		case "on":
			console.log("on");
			client.right(0.5);
			break;
		case "off":
			console.log("off");
			client.right(0);
			break;
		default:
			break;
	}
};

var backward = function( swtch ) {
	switch( swtch ) {
		case "on":
			console.log("on");
			client.back(0.5);
			break;
		case "off":
			console.log("off");
			client.back(0);
			break;
		default:
			break;
	}
};

var takeoff = function(){
	console.log('taking off');
	client.takeoff();
};

var land = function(){
	console.log('landing');
	client.land();
};
