var spawn = require('child_process').spawn;
var path = require('path');
var bolt = require("../lib/bolt");

this.tests = function() {
	var jasmineScript = path.join("node_modules", "jasmine-node", "bin", "jasmine-node");
	var specsFolder = path.join("specs");
	return bolt.captureOutput("Tests", spawn("node", [jasmineScript, specsFolder]));
};