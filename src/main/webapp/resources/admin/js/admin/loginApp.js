/**
 * 登录启动js.
 */
var loginApp = angular.module("loginApp", []);

/**
 * 登录界面控制器.
 */
loginApp.controller('LoginController', function($scope, $http, $window,
		$location) {

	if ($location.absUrl().indexOf('k=0') != -1) {
		$scope.msg = "提示：您被踢出登录";
	}
	$scope.userVo = new UserVo();
	$scope.login = function() {
		if ($scope.userVo.username == null) {
			$scope.msg = "提示：请输入登录名";
		} else if ($scope.userVo.password == null) {
			$scope.msg = "提示：请输入密码";
		} else {
			$scope.msg = null;
			var userVo = new UserVo();
			userVo.password = $scope.userVo.password;
			userVo.username = $scope.userVo.username;
			var json = userVo.voToJson();
			console.log("json",json);
			$(".loading-container").removeClass("loading-inactive");
			$http({method:"post",url:"/happyRun/user/login.do",data:json})
		/*	$http.get('/happyRun/user/login.do?username='+userVo.username + "&password="+userVo.password, {
				"noCache" : Date()
			})*/.success(function(data) {
				$(".loading-container").addClass("loading-inactive");
				if (data) {
					if (data.serviceResult == true&&data.resultInfo=="1") {
						console.log("data.resultInfo",data.resultInfo);
						$window.location.href = "home.html";
					} else {
						$scope.msg = data.resultInfo;
					}
				} else {
					alert("数据库连接失败，请联系技术工程师");
				}
			}).error(function(data) {
				$(".loading-container").addClass("loading-inactive");
			});
		}
	}
});