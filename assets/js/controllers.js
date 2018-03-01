(function(){
    angular.module("todoApp.controller", [])
    .controller("todoController", function($scope, $log) {
      $scope.toDoList = [];
      $scope.input = "";
      $scope.undoneTasks = 0;
      $scope.doneTasks = 0;
      $scope.addTask = function(input) {
        $scope.toDoList.push(
          {
            title: input,
            status:false
          }
        );
        $scope.input = "";
        $scope.undoneTasks++;
      };
      $scope.changeStatus = function(index) {
        $scope.toDoList[index].status = !$scope.toDoList[index].status;
        if ($scope.toDoList[index].status) {
          $scope.undoneTasks--;
          $scope.doneTasks++;
        } else {
          $scope.undoneTasks++;
          $scope.doneTasks--;
        }
      };
    });
})();
