var q = require('q');

this.task = {};
this.captureOutput = function(name, spawnedProcess) {
	console.log("Executing " + name);
	var deferred = q.defer();
	spawnedProcess.stdout.on('data', function (data) {
	  process.stdout.write('' + data);
	});
	spawnedProcess.stderr.on('data', function (data) {
	  process.stdout.write('' + data);
	});
	spawnedProcess.on('exit', function (code) {
	  console.log(name + ' exited with: ' + code);
	  deferred.resolve();
	});
	return deferred.promise;
};
this.execute = function(args) {
	var argv = args.slice(2);
	var bolt = this;
	if (argv.length > 0) {
		argv.forEach(function (taskName, index) {
		  bolt.task[taskName]();
		});
	} else {
		bolt.task.default();
	}
	return 0;
};