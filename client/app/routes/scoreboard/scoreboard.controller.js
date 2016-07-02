'use strict';
(function(){

function ScoreboardComponent($scope, $http, $q, $interval) {
  $scope.data = [];

  function getData() {

    var currentMonth = (new Date).getMonth() + 1;
    Array
      .apply(0, Array(20))
      .map(function (x, y) { return y + 1; })
      .forEach(function (id) {
        $http
          .get(
            'https://qapi.quezx.com/applications/dashboard/api/bdQuery',
            { params: { id: id, MONTHID: currentMonth, YEARID: 2016 } }
          )
          .then(function (res) {
            console.log(res);
            if(res.data.length == 0) {
              console.log("ScoreboardComponent", "No value for id:"+id, res);
              return;
            }
            $scope.data[id - 1] = res.data[0];
            $scope.data[id - 1].target = res.data[1] ? res.data[1].target : null;
          })
      });
  }

  $scope.compareAndShow = function(current, max) {
    if (current < max) return current + ' < ' + max;
    return current + ' > ' + max;
  }



  getData();
  $interval(getData, 1000 * 60 * 5);

}

angular.module('uiGenApp')
  .component('scoreboard', {
    templateUrl: 'app/routes/scoreboard/scoreboard.html',
    controller: ScoreboardComponent
  });

})();
