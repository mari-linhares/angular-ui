angular.module("myApp.create", ['ngRoute'])

	.config(['$routeProvider', function($routeProvider, $http, config) {
	  $routeProvider.when('/create', {
	    templateUrl: 'create/create.html',
	    controller: 'CreateCtrl'
	  });
	}])



	//http://jsfiddle.net/timriley/GVCP2/
	.controller('CreateCtrl',['$scope', 'questionAPI', 'config',function($scope, questionAPI, config) {


			var begin =  function(){

				$scope.questions = [];	
				$scope.tipoResposta = ["TEXTO", "MULTIPLA_ESCOLHA", "SELECAO"];
				loadQuestion();
				
			}

			var loadQuestion = function() {
				questionAPI.getQuestions().success(function(data, status) {
					$scope.questions = data;

				});
			}


			$scope.addQuestion = function(question){

				questionAPI.saveQuestion(question).success(function(data) {
					delete $scope.question;
					loadQuestion();
				});
			}	


			$scope.isQuestionSelected = function (questions){
					return questions.some(function (question){
						return question.selected;
				});
			}


			$scope.deleteQuestion = function(questions){

				
				$scope.questions = questions.filter(function(question){
							if (question.selected){
								questionAPI.deleteQuestion(question);
							}else{
								return question;
							}	
				});	

			}

			$scope.enableEditQuestion = function(question){

				$scope.enuciado = question;

			}

			$scope.saveEditQuestion = function(newEnunciado) {

				var news = $scope.enuciado;

				questionAPI.setQuestion(news, newEnunciado).success(function(data) {

					delete $scope.newEnunciado;
					delete $scope.enunciado;
					loadQuestion();

				})

			}

			begin();


	}])


