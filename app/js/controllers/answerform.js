angular.module("myApp.answerform", [ 'ngRoute' ])

.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/answerform/:id/:curso/:token', {
		templateUrl : 'views/answerform.html',
		controller : 'AnswerFormCtrl',
		resolve : {
			quiz : ['$route', 'answerAPI', function($route, answerAPI) {
				return answerAPI.getQuiz($route.current.params.id);
			}]
		}
	});
} ])

.controller(
		"AnswerFormCtrl",
		[ '$scope', '$http', '$route', 'answerAPI', 'quiz',
				function($scope, $http, $route, answerAPI, quiz) {

					$scope.quiz = quiz;
					$scope.radio_question = {};
					$scope.text_question = {};
					$scope.token = $route.current.params.token;
					$scope.curso = $route.current.params.curso;
					
					console.log($scope.curso);
					console.log(quiz);
					
					var begin = function() {
						//...
					};

					$scope.sendAnswer = function(token) {
						console.log($scope.quiz);
						answerAPI.submitAnswers(token, $scope.quiz, $scope.text_question, $scope.radio_question);
					}
					
					$scope.sendNegar = function(token) {
						// TODO negar
						console.log($scope.quiz);
						answerAPI.submitAnswers(token, $scope.quiz, $scope.text_question, $scope.radio_question);
					}
					
					$scope.selectAll = function(value) {
						console.log($scope.radio_question);
						for(var id in $scope.radio_question) {
							$scope.radio_question[id] = value;
						}
						console.log(">>> " + value);
					}

					begin();

				} ])