/**
 * 所有控制器.
 */
var baseUrl = "/usale/";
var baseUrl2 = "/usale";
var chldControllers = angular.module("chldControllers",
		[ 'ngRoute', 'ngDialog', 'ngFileUpload' ]);

/**
 * 主页控制器.
 */
chldControllers.controller('HomeController', function($scope, $http, $window) {
	$(".loading-container").removeClass("loading-inactive");
	$http.get(baseUrl + "isLogin.action", {
		"noCache" : Date()
	}).success(function(data) {
		$(".loading-container").addClass("loading-inactive");
		if (data) {
			if (data.serviceResult == true) {
				if (data.resultParm.isLogin == "false") {
					$window.location.href = "AdminLogin.html";
				}
			}
		} else {
			alert("数据库连接失败，请联系技术工程师");
		}
	}).error(function(data) {
		$(".loading-container").addClass("loading-inactive");
	});

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
	$http.get(baseUrl + "getCurrentUserMenuItemTree.action", {
		"noCache" : Date()
	}).success(function(data) {
		$(".loading-container").addClass("loading-inactive");
		if (data) {
			if (data.serviceResult == true) {
				$scope.menus = data.resultParm.menuItemList;
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

//
// /**
// * 订单控制器.
// */
// chldControllers
// .controller(
// 'ordermanageCtrl',
// function($scope, $http, ngDialog) {
// $scope.page = new PaginationVo();
// $scope.page.size = 15;
// $scope.page.indexPageNum = 1;
//
// $scope.getPageMenuItem = function() {
// $(".loading-container").removeClass("loading-inactive");
// $http
// .get(
// baseUrl + "pageOrder.action?page="
// + $scope.page.voToJson(), {
// "noCache" : Date()
// })
// .success(
// function(data) {
// $(".loading-container").addClass(
// "loading-inactive");
// if (data) {
// if (data.serviceResult == true) {
// $scope.orders = data.resultParm.orders;
// $scope.page.totalCount = data.resultParm.totalCount;
// var element = $('#page');
// var totalPages = Math
// .ceil($scope.page.totalCount
// / $scope.page.size);
//
// var options = {
// bootstrapMajorVersion : 3,
// currentPage : $scope.page.indexPageNum,
// numberOfPages : 5,
// totalPages : totalPages,
// onPageClicked : function(
// event,
// originalEvent,
// type, page) { // 异步换页
// $scope.page.indexPageNum = page;
// $scope
// .getPageMenuItem();
// }
// }
// element
// .bootstrapPaginator(options);
// } else {
// $window.location.href = "login.html";
// }
// } else {
// alert("数据库连接失败，请联系技术工程师");
// }
// }).error(
// function(data) {
// $(".loading-container").addClass(
// "loading-inactive");
// });
// }
// $scope.getPageMenuItem();
//
// $scope.deleteOrder = function(id) {
// ngDialog
// .openConfirm(
// {
// template : '<h3>删除该订单，将不能恢复！</h3><h4>是否继续删除？</h4><hr/>'
// + '<div class="ngdialog-buttons">'
// + '<button type="button" class="ngdialog-button ngdialog-button-primary"
// ng-click="confirm(1)">确定</button>'
// + '<button type="button" class="ngdialog-button ngdialog-button-secondary"
// ng-click="closeThisDialog(0)">取消</button></div>',
// plain : true,
// scope : $scope,
// closeByEscape : false
// })
// .then(
// function() {
// var order = new OrderVo();
// order.orderId = id;
//
// $(".loading-container")
// .removeClass(
// "loading-inactive");
// $http
// .get(
// baseUrl
// + "deleteOrder.action?order="
// + order
// .voToJson(),
// {
// "noCache" : Date()
// })
// .success(
// function(data) {
// $(
// ".loading-container")
// .addClass(
// "loading-inactive");
// if (data) {
// if (data.serviceResult == true) {
// $scope
// .getPageMenuItem();
// } else {
// $window.location.href = "login.html";
// }
// } else {
// alert("数据库连接失败，请联系技术工程师");
// }
// })
// .error(
// function(data) {
// $(
// ".loading-container")
// .addClass(
// "loading-inactive");
// });
// });
// }
//
// $scope.sendOrder = function(id) {
// ngDialog
// .openConfirm(
// {
// template : '<h3>发货该订单，将不能恢复！</h3><h4>是否继续发货？</h4><hr/>'
// + '<div class="ngdialog-buttons">'
// + '<button type="button" class="ngdialog-button ngdialog-button-primary"
// ng-click="confirm(1)">确定</button>'
// + '<button type="button" class="ngdialog-button ngdialog-button-secondary"
// ng-click="closeThisDialog(0)">取消</button></div>',
// plain : true,
// scope : $scope,
// closeByEscape : false
// })
// .then(
// function() {
// var order = new OrderVo();
// order.orderId = id;
//
// $(".loading-container")
// .removeClass(
// "loading-inactive");
// $http
// .get(
// baseUrl
// + "sendOrder.action?order="
// + order
// .voToJson(),
// {
// "noCache" : Date()
// })
// .success(
// function(data) {
// $(
// ".loading-container")
// .addClass(
// "loading-inactive");
// if (data) {
// if (data.serviceResult == true) {
// $scope
// .getPageMenuItem();
// } else {
// $window.location.href = "login.html";
// }
// } else {
// alert("数据库连接失败，请联系技术工程师");
// }
// })
// .error(
// function(data) {
// $(
// ".loading-container")
// .addClass(
// "loading-inactive");
// });
// });
// }
//
// $scope.showOrder = function(id) {
// var order = new OrderVo();
// order.orderId = id;
// $(".loading-container").removeClass("loading-inactive");
// $http
// .get(
// baseUrl + "getOrderById.action?order="
// + order.voToJson(), {
// "noCache" : Date()
// })
// .success(
// function(data) {
// $(".loading-container").addClass(
// "loading-inactive");
// if (data) {
// if (data.serviceResult == true) {
// $scope.orderdetail = data.resultParm.order;
// $scope.ordereventdetail = data.resultParm.event;
// ngDialog
// .openConfirm(
// {
// template : 'orderManage/orderdetail.html',
// scope : $scope,
// closeByEscape : false
// })
// .then(function() {
// console.info();
// });
// } else {
// $window.location.href = "login.html";
// }
// } else {
// alert("数据库连接失败，请联系技术工程师");
// }
// }).error(
// function(data) {
// $(".loading-container").addClass(
// "loading-inactive");
// });
// }
// });
