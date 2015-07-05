
var $ = jQuery = require('jquery');

$(document).ready(function(){
  $('enable_video').on('click', tryStream);
});

var startStream = function(){
  $('#buffer').load(function(){
      $('#video').attr('src', this.src);
      this.src = 'http://localhost:8080?no-cache=' + new Date().getTime();
  }).trigger('load');
};

var tryStream = function(){
    $.get('http://localhost:8080', function( data ){
    if( data ){
      startStream();
    }else {
      tryStream();
    }
  })
};