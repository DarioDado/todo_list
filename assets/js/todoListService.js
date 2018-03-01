(function(){
    angular.module("todoApp.service", [])
    .factory("todoService", function($localStorage) {
      // $localStorage.undoneTasks = 0;
      // $localStorage.doneTasks = 0;
      // $localStorage.todoList = [];
      return {
        getAllTasks: function() {
          return $localStorage.todoList;
        },
        addTask: function(input) {
          if (input === "") {
            return {
              error: "You can not post empty task"
            };
          }
          let checkDuplicate = $localStorage.todoList.some(function (value) {
            return input.toLowerCase() === value.title.toLowerCase();
          });
          if (checkDuplicate) {
            return {
              error: "Task allready exists"
            };
          }
          $localStorage.todoList.push(
            {
              title: input,
              status:false
            }
          );
          $localStorage.undoneTasks++;
          return {
            todoList: $localStorage.todoList,
            undoneTasks: $localStorage.undoneTasks
          };
        },
        changeStatus: function(index) {
          $localStorage.todoList[index].status = !$localStorage.todoList[index].status;
          if ($localStorage.todoList[index].status) {
            $localStorage.undoneTasks--;
            $localStorage.doneTasks++;
          } else {
            $localStorage.undoneTasks++;
            $localStorage.doneTasks--;
          }
          return {
            todoList: $localStorage.todoList,
            undoneTasks: $localStorage.undoneTasks,
            doneTasks: $localStorage.doneTasks
          };
        },
        getUndoneTaskCount: function() {
          return $localStorage.undoneTasks;
        },
        getDoneTaskCount: function() {
          return $localStorage.doneTasks;
        }
      };
    });
})();
