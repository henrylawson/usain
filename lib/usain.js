var q = require('q');

this.tasks = {};
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
	  deferred.resolve(code);
	});
	return deferred.promise;
};
this.execute = function(args) {
	var argv = args.slice(2);
	var bolt = this;
	if (argv.length > 0) {
		argv.forEach(function (taskName, index) {
		  bolt.tasks[taskName]();
		});
	} else {
		bolt.tasks.default();
	}
	return 0;
};