var baseUrl = "/usale/";

/**
 * 启动js.
 */
var chldApp = angular.module("adminApp", [ 'ngRoute', 'chldFilters',
		'chldControllers' ]);

chldApp.config([
		'$routeProvider',
		function($routeProvider) {
			 var sUserAgent = navigator.userAgent.toLowerCase();
	            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	            var bIsAndroid = sUserAgent.match(/android/i) == "android";
	            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	            	window.location.href="/usale/views/admin/AdminLogin.html";
	            }
			$.getJSON(baseUrl + "getCurrentUserMenuItemTree.action", {
				"noCache" : Date()
			}, function(data) {
				if (data) {
					if (data.serviceResult == true) {
						var menuItemList = data.resultParm.menuItemList;
						var routeStr = "$routeProvider";
						for (var i = 0; i < menuItemList.length; i++) {
							if (!angular.equals(
									menuItemList[i].menuitemrouteurl, '#')) {

								routeStr = routeStr
										+ ".when('"
										+ menuItemList[i].menuitemrouteurl
												.substring(1)
										+ "', {templateUrl: '"
										+ menuItemList[i].menuitemurl
										+ "',controller: '"
										+ menuItemList[i].menuitemctrl + "'})";
							}
						}
						eval(routeStr);
						if (window.location.hash != "") {
							window.location.href = window.location.href + "#";
						}
					} else {
						alert(data.resultInfo);
					}
				} else {
					alert("数据库连接失败，请联系技术工程师");
				}
			});
		} ]);