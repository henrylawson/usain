var bolt = require("../lib/usain");

describe("Bolt", function() {
	describe("captureOutput", function() {
		var taskName;
		var spawnedProcess;

		beforeEach(function() {
			spyOn(process.stdout, 'write');
			taskName = "A Task Name";
			spawnedProcess = {
				stdout: {
					on: jasmine.createSpy()
				},
				stderr: {
					on: jasmine.createSpy() 
				},
				on: jasmine.createSpy()
			};
		});

		it("should write executing message to stdout", function() {
			bolt.captureOutput(taskName, spawnedProcess);

			expect(process.stdout.write.mostRecentCall.args[0]).toContain(taskName);
		});

		it("should write spawned process stdout messages to the hosting process stdout", function() {
			var data = "standard out message";

			bolt.captureOutput(taskName, spawnedProcess);
			spawnedProcess.stdout.on.mostRecentCall.args[1](data);

			expect(spawnedProcess.stdout.on.mostRecentCall.args[0]).toEqual("data");
			expect(process.stdout.write.mostRecentCall.args[0]).toEqual(data);
		});

		it("should write spawned process stderr messages to the hosting process stdout", function() {
			var data = "standard error message";

			bolt.captureOutput(taskName, spawnedProcess);
			spawnedProcess.stderr.on.mostRecentCall.args[1](data);

			expect(spawnedProcess.stderr.on.mostRecentCall.args[0]).toEqual("data");
			expect(process.stdout.write.mostRecentCall.args[0]).toEqual(data);
		});

		it("should write exit code to stdout", function() {
			var exitCode = 0;

			bolt.captureOutput(taskName, spawnedProcess);
			spawnedProcess.on.mostRecentCall.args[1](exitCode);

			expect(spawnedProcess.on.mostRecentCall.args[0]).toEqual("exit");
			expect(process.stdout.write.mostRecentCall.args[0]).toContain('exited with: ' + exitCode);
			expect(process.stdout.write.mostRecentCall.args[0]).toContain(taskName);
		});

		it("should resolve promise when spawned process exits", function() {
			var promiseResolvedSpy = jasmine.createSpy("Promise resolved");
			bolt.captureOutput(taskName, spawnedProcess)
				.then(promiseResolvedSpy());

			spawnedProcess.on.mostRecentCall.args[1](0);

			expect(promiseResolvedSpy).toHaveBeenCalled();
		});
	});

	describe("execute", function() {
		it("should execute default when no arguments provided", function() {
			var args = ["temp", "temp"];
			bolt.task.default = jasmine.createSpy("Default task");

			bolt.execute(args);

			expect(bolt.task.default).toHaveBeenCalled();
		});

		it("should execute the tasks provided by the command line", function() {
			var args = ["temp", "temp", "task1", "task2"];
			bolt.task.task1 = jasmine.createSpy("Task 1");
			bolt.task.task2 = jasmine.createSpy("Task 2");

			bolt.execute(args);

			expect(bolt.task.task1).toHaveBeenCalled();
			expect(bolt.task.task2).toHaveBeenCalled();
		});
	});
});