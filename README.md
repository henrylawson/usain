# Introduction
A simple task runner tool. Named after the best runner in the world, Usain Bolt.

# Getting started
## Install usain
```Bash
npm install usain
```

## Create your tasks module
This is where you define your tasks. This can live in ./build/tasks.js
```JavaScript
var spawn = require('child_process').spawn;
var path = require('path');
var bolt = require("../lib/usain");

this.tests = function() {
	var jasmineScript = path.join("node_modules", "jasmine-node", "bin", "jasmine-node");
	var specsFolder = path.join("specs");
	return bolt.captureOutput("Tests", spawn("node", [jasmineScript, specsFolder]));
};
this.default = function() { // <== Executed when no arguments provided to runner
	return this.tests();
};
```

## Create your runner
This is where you create your runner. This guy can live in ./usain
```JavaScript
var bolt = require("./lib/usain");
bolt.tasks = require("./build/tasks"); // <== This is the module with your tasks

bolt.execute(process.argv);
```

## Call on usain to run your tasks
Once configured, you can run usain.
```Bash
node usain
```
Or you can specify the tasks you want to run.
```Bash
node usain tests
```
