// Main app
var mainApp = angular.module('MainApp', ['LandingApp', 'LectureApp', 'ChallengeApp'])

// main Controller
mainApp.controller('MainController', ['$scope', '$location', function($scope,$location){
  var location = $location.path().split('/')[1] == undefined ? '' : $location.path().split('/')[1]
  $scope.page = location.length == 0 ? 'pages/landing.html' : 'pages/' + location + '.html'
  $scope.setView = function(url) {
    var path = url.indexOf("landing") == -1 ? url.replace('.html','') : ''
    $location.path(path)  
    $scope.page = 'pages/' + url
  }
}])

// Landing page appp
var landingModule = angular.module('LandingApp',[])

// Landing page data
landingModule.factory('LandingData', ['$http', function($http){
  var Url   = "data/content.csv";
  var LandingData = $http.get(Url).then(function(response){
     arr = CSVToArray(response.data);
     var ret = {}
     arr.map(function(d) {ret[d.section] = d.content})
     return ret
  })
  return LandingData
}]);

// Landing page controller
landingModule.controller('LandingController',['$scope', 'LandingData', function($scope, LandingData){
	LandingData.then(function(data){
	  $scope.content = data;
	});
}])
    

// Instantiate app
var lectureModule = angular.module('LectureApp',[])

// Get data
lectureModule.factory('Items', ['$http', function($http){
  var Url   = "data/lectures.csv";
  var Items = $http.get(Url).then(function(response){
    test = response.data
     return CSVToArray(response.data);
  });
  return Items;
}]);

// Lecture controller
lectureModule.controller('LectureController',['$scope', 'Items', function($scope, Items){
  Items.then(function(data){
    $scope.items = data;
  });
}])


// Challenge App
var challengeModule = angular.module('ChallengeApp',[])

// Challenge data
challengeModule.factory('ChallengeData', ['$http', function($http){
  var Url   = "data/challenges.csv";
  var ChallengeData = $http.get(Url).then(function(response){
     return CSVToArray(response.data);
  });
  return ChallengeData;
}]);

// Controller
challengeModule.controller('ChallengeController',['$scope', '$location', 'ChallengeData', function($scope, $location, ChallengeData){
  ChallengeData.then(function(data){
    $scope.challenges = data;
    var challenge = $location.path().split('/')[2] == undefined ? null : 'challenges/' + $location.path().split('/')[2] +'.html'
    $scope.currentChallenge = challenge
    $scope.viewChallenge = function(url) {
      console.log('view challenge ', url)
      var path = url == null ? 'challenges': $location.path() +'/' + url
      $location.path(path)
      var currentChallenge = url == null ? null : 'challenges/' + url + '.html'
      $scope.currentChallenge = currentChallenge
    }
  });
}])
    
