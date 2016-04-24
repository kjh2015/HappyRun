/**
 * 所有控制器.
 */
var baseUrl = "/happyRun/";
var baseUrl2 = "/happyRun";
var chldControllers = angular.module("chldControllers",
		[ 'ngRoute', 'ngDialog', 'ngFileUpload' ]);

/**
 * 主页控制器.
 */
chldControllers.controller('HomeController', function($scope, $http, $window) {
	$(".loading-container").removeClass("loading-inactive");


	$scope.logout = function() {
		$(".loading-container").removeClass("loading-inactive");
		$http.get(baseUrl + "logout.action", {
			"noCache" : Date()
		}).success(function(data) {
			$(".loading-container").addClass("loading-inactive");
			if (data) {
				if (data.serviceResult == true) {
					$window.location.href = "AdminLogin.html";
				}
			} else {
				alert("数据库连接失败，请联系技术工程师");
			}
		}).error(function(data) {
			$(".loading-container").addClass("loading-inactive");
		});
	}

	$(".loading-container").removeClass("loading-inactive");
	$http.get(baseUrl + "menu/getCurrentUserMenuItemTree.do", {
		"noCache" : Date()
	}).success(function(data) {
		$(".loading-container").addClass("loading-inactive");
		if (data) {
			if (data.serviceResult == true) {
				$scope.menus = data.resultParm.menuItemList;
				console.log("menus",$scope.menus);
			} else {
				$window.location.href = "AdminLogin.html";
			}
		} else {
			alert("数据库连接失败，请联系技术工程师");
		}
	}).error(function(data) {
		$(".loading-container").addClass("loading-inactive");
	});

	$scope.parent = function(node) {
		return node.menuitemparentid == '0';
	}

	$scope.isEquality = function(o1, o2) {
		return angular.equals(o1, o2);
	}

	$scope.currentClick = function(target) {
		$scope.showMenuTitle1 = $.trim($(target).parents('li').find(
				'.menu-dropdown .menu-text').text());
		$scope.showMenuTitle2 = $(target).closest('li').find("span").text();
		$(target).parents('ul').find('li').removeClass('active');
		$(target).closest('li').addClass('active');
	}
});

