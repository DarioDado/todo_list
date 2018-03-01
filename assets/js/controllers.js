(function(){
    angular.module("todoApp.controller", [])
    .controller("todoController", function($scope, todoService, $interval) {
      // **********insert data  simulator*************
      // to turn of simulator comment this code
      $interval(callAtInterval,30000);
      function callAtInterval() {
        output = todoService.pulse();
        if (output.error) {
          $scope.error = output.error;
        } else {
          $scope.toDoList = output.todoList;
          $scope.undoneTasks = output.undoneTasks;
          $scope.error = "";
        }
      }
      // **********insert data  simulator*************
      let output;
      $scope.input = "";
      $scope.toDoList = todoService.getAllTasks();
      $scope.undoneTasks = todoService.getUndoneTaskCount();
      $scope.doneTasks = todoService.getDoneTaskCount();
      $scope.addTask = function(input) {
        output = todoService.addTask(input);
        if (output.error) {
          $scope.error = output.error;
        } else {
          $scope.toDoList = output.todoList;
          $scope.undoneTasks = output.undoneTasks;
          $scope.error = "";
          $scope.input = "";
        }
      };
      $scope.changeStatus = function(index) {
        output = todoService.changeStatus(index);
        $scope.toDoList = output.todoList;
        $scope.undoneTasks = output.undoneTasks;
        $scope.doneTasks = output.doneTasks;
      };
    });
})();
