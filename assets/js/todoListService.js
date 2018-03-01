(function(){
    angular.module("todoApp.service", [])
    .factory("todoService", function($localStorage, $log) {
      // to drop all data uncomment these 3 lines
      // $localStorage.undoneTasks = 0;
      // $localStorage.doneTasks = 0;
      // $localStorage.todoList = [];
      let randomTasks = ["Podmazi lanac na bajsu", "Prokuvaj mleko", "Ocisti akvarijum", "Slomi gitaru", "Napisi pesmu", "Procitaj knjigu", "Naduvaj balon", "Operi kosu", "Ocisti slivnik", "Zakucaj ekser", "Pomeri antenu", "Prekreci zid", "Kupi zavese", "Pojacaj zvucnik", "Napravi kulu od karata", "Podeli vizit-karte", "Updejtuj software", "Zameni baterije", "Pusti zmaja", "Upali svetlo"];
       return {
        pulse: function() {
          let randomNumber = Math.floor(Math.random() * 19);
          let checkDuplicate = $localStorage.todoList.some(function (value) {
              return randomTasks[randomNumber].toLowerCase() === value.title.toLowerCase();
          });
          if (checkDuplicate) {
            return {
              error: "Task allready exists"
            };
          } else {
            $localStorage.todoList.push(
              {
                title: randomTasks[randomNumber],
                status:false
              }
            );
            $localStorage.undoneTasks++;
            return {
              todoList: $localStorage.todoList,
              undoneTasks: $localStorage.undoneTasks
            };
          }
        },
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
