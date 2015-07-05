var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var client = require('./client.js')
var pngStream = client.getPngStream();
var http = require('http');

console.log('Connecting png stream ...');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1080, height: 720});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/views/index.html');

  // Open the devtools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  startVideoStream();

});


var startVideoStream = function(){
	var lastPng;
	pngStream
	  .on('error', console.log )
	  .on('data', function(pngBuffer) {
	    lastPng = pngBuffer;
	  });

	var server = http.createServer(function(req, res) {
	  if (!lastPng) {
	    res.writeHead(503);
	    res.end('Did not receive any png data yet.');
	    return;
	  }

	  res.writeHead(200, {'Content-Type': 'image/png'});
	  res.end(lastPng);
	});

	server.listen(8080, function() {
	  console.log('Serving latest png on port 8080 ...');
	});

}