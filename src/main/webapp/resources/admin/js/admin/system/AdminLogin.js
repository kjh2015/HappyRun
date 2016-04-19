/**
 * 登录启动js.
 */
var loginApp = angular.module("loginApp", ['ngDialog']);
/**
 * 登录界面控制器.
 */
loginApp
		.controller(
				'LoginController',
				function($scope, $http, $window,$location,ngDialog) {
					
			            	if ($location.absUrl().indexOf('k=0') != -1) {
			            	    $scope.msg = "提示：您被踢出登录";
			            	}
			            	$scope.userkeyVo = new UserkeyVo();
			            	$scope.tab = 'telphone';
			            	$scope.enter = function(ev) {
			            	    if (ev.charCode === 13) {
			            	        $scope.login();
			            	    }
			            	}
			            	// 登录
			            	$scope.login = function() {
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
						            	  ngDialog.openConfirm({
						            		    template: '<h3>亲，移动端不支持后台管理系统登录！</h3><hr/>' + '<div class="ngdialog-buttons">' + '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
						            		    plain: true,
						            		    scope: $scope,
						            		    closeByEscape: false
						            		}).then(function() {
						            		    $(".loading-container").addClass("loading-inactive");
						            		});
						            } else {
						                $scope.prefix = "+86";
					            	    if ($scope.tab == 'sms') {
					            	        if ($scope.userkeyVo.telphone == null) {
					            	            $scope.msg = "提示：手机号不能为空";
					            	        } else if ($scope.currentCode == null) {
					            	            $scope.msg = "提示：请输入验证码";
					            	        } else if ($scope.currentCode != null && $scope.currentCode.toString().length < 6) {
					            	            $scope.msg = "提示：验证号小于6位";
					            	        } else {
					            	            $scope.msg = null;
					            	            var userkey = new UserkeyVo();
					            	            userkey.telphone = $scope.userkeyVo.telphone;
					            	            currentCode = $scope.currentCode
					            	            var json = userkey.voToJson();
					            	            $(".loading-container").removeClass("loading-inactive");
					            	            $http.get('/usale/getTelphoneToLogin.action?userkeyvo=' + json + '&currentCode=' + currentCode, {
					            	                "noCache": Date()
					            	            }).success(function(data) {
					            	                $(".loading-container").addClass("loading-inactive");
					            	                if (data) {
					            	                    if (data.serviceResult == true) {
					            	                        $window.location.href = "home.html";
					            	                    } else {
					            	                        $scope.msg = "手机号或验证码不正确.";
					            	                    }
					            	                } else {
					            	                    alert("数据库连接失败，请联系技术工程师");
					            	                }
					            	            }).error(function(data) {
					            	                $(".loading-container").addClass("loading-inactive");
					            	            });
					            	        }
					            	    } else if ($scope.tab == 'usale') {
					            	        if ($scope.userkeyVo.businessname1 == null) {
					            	            $scope.msg = "提示：请输入优售号";
					            	        } else if ($scope.userkeyVo.password == null) {
					            	            $scope.msg = "提示：请输入密码";
					            	        } else {
					            	            $scope.msg = null;
					            	            var userkey = new UserkeyVo();
					            	            userkey.password = hex_md5($scope.userkeyVo.password);
					            	            userkey.businessname1 = $scope.userkeyVo.businessname1;
					            	            var json = userkey.voToJson();
					            	            $(".loading-container").removeClass("loading-inactive");
					            	            $http.get('/usale/login.action?userkey=' + json, {
					            	                "noCache": Date()
					            	            }).success(function(data) {
					            	                $(".loading-container").addClass("loading-inactive");
					            	                if (data) {
					            	                    if (data.serviceResult == true) {
					            	                        $window.location.href = "home.html";
					            	                    } else {
					            	                        $scope.msg = "优售号或密码不正确.";
					            	                    }
					            	                } else {
					            	                    alert("数据库连接失败，请联系技术工程师");
					            	                }
					            	            }).error(function(data) {
					            	                $(".loading-container").addClass("loading-inactive");
					            	            });
					            	        }
					            	    } else if ($scope.tab == 'telphone') {
					            	        if ($scope.userkeyVo.telphone == null) {
					            	            $scope.msg = "提示：请输入手机号";
					            	        } else if ($scope.userkeyVo.password == null) {
					            	            $scope.msg = "提示：请输入密码";
					            	        } else {
					            	            if ($scope.userkeyVo.telphone != null) {
					            	                if ($scope.prefix == '+86' && /^1[34578]\d{9}$/.test( + $scope.userkeyVo.telphone)) {
					            	                    $scope.msg = null;
					            	                    var userkey = new UserkeyVo();
					            	                    userkey.password = hex_md5($scope.userkeyVo.password);
					            	                    userkey.telphone = $scope.userkeyVo.telphone;
					            	                    var json = userkey.voToJson();
					            	                    $(".loading-container").removeClass("loading-inactive");
					            	                    $http.get('/usale/login.action?userkey=' + json, {
					            	                        "noCache": Date()
					            	                    }).success(function(data) {
					            	                        $(".loading-container").addClass("loading-inactive");
					            	                        if (data) {
					            	                            if (data.serviceResult == true) {
					            	                                $window.location.href = "home.html";
					            	                            } else {
					            	                                $scope.msg = "手机号或密码不正确.";
					            	                            }
					            	                        } else {
					            	                            alert("数据库连接失败，请联系技术工程师");
					            	                        }
					            	                    }).error(function(data) {
					            	                        $(".loading-container").addClass("loading-inactive");
					            	                    });
					            	                } else {
					            	                    $scope.msg = "提示：手机号错误";
					            	                }
					            	            }
					            	        }
					            	    }
						            }
			            	

			            	}
			            	// 发送手机验证码
			            	var flag = false;
			            	var inte = null;
			            	$scope.sendCode = function() {
			            	    $scope.prefix = "+86";
			            	    if ($scope.userkeyVo.telphone != null) {
			            	        if ($scope.prefix == '+86' && /^1[34578]\d{9}$/.test( + $scope.userkeyVo.telphone)) {
			            	            $scope.msg = null;
			            	            $http.get("/usale/sendCodeForLogin.action?userkeyvo={telphone:" + $scope.userkeyVo.telphone + "}", {
			            	                "noCache": Date()
			            	            }).success(function(data) {
			            	                if (data) {
			            	                    if (data.serviceResult == true) {
			            	                        flag = true;
			            	                        $("#code-button").css("background-color", "#cacaca");
			            	                        $("#code-button").attr("disabled", true);
			            	                        var time = 120;
			            	                        inte = setInterval(function() {
			            	                            if (time < 1) {
			            	                                $("#code-button").css("background-color", "#ffb359");
			            	                                $("#code-button").val("获取验证码");
			            	                                $("#code-button").attr("disabled", false);
			            	                                clearInterval(inte);
			            	                            } else {
			            	                                $("#code-button").val(time + "秒");
			            	                                time--;
			            	                            }
			            	                        },
			            	                        1000);
			            	                    } else {
			            	                        $scope.msg = data.resultInfo;
			            	                        if (data.resultInfo == 40010) {
			            	                            $scope.msg = "上司手机号码为空. ";
			            	                        } else if (data.resultInfo == 40006) {
			            	                            $scope.msg = "没有此手机号码.";
			            	                        } else if (data.resultInfo == 40008) {
			            	                            $scope.msg = "发生短信验证码失败.";
			            	                        }
			            	                    }
			            	                } else {
			            	                    alert("数据库连接失败，请联系技术工程师");
			            	                }
			            	            }).error(function(data) {
			            	                $(".loading-container").addClass("loading-inactive");
			            	            });
			            	        } else {
			            	            $scope.msg = "提示：手机号错误";
			            	        }
			            	    }

			            	}
			            	$scope.reset = function() {

			            	    $scope.userkeyVo.telphone = null;
			            	    $scope.userkeyVo.password = null;
			            	    $scope.currentCode = null;
			            	    $scope.userkeyVo.businessname1 = null;
			            	    $scope.prefix = null;
			            	    flag = false;
			            	    $("#code-button").css("background-color", "#ffb359");
			            	    $("#code-button").val("获取验证码");
			            	    $("#code-button").attr("disabled", false);
			            	    clearInterval(inte);
			            	    $scope.msg = null;

			            	}
			            	var flagForTel = false;
			            	var flagForCode = false;
			            	var flagForPassword = false;
			            	var flagForBus = false;

			            	$scope.isInputForTel = function() {
			            	    if (!flag) {
			            	        if ($scope.userkeyVo.telphone != null && $scope.userkeyVo.telphone.toString().length > 0) {
			            	            $("#code-button").css("background-color", "#ffb359");
			            	            $("#code-button").attr("disabled", false);
			            	            if ($scope.tab == 'telphone') {
			            	                flagForTel = true;
			            	                if (flagForTel && flagForPassword) {
			            	                    $("#login-button").attr("disabled", false);
			            	                }
			            	            }
			            	            if ($scope.tab == 'sms') {
			            	                flagForTel = true;
			            	                if (flagForTel && flagForCode) {
			            	                    $("#login-button").attr("disabled", false);
			            	                }
			            	            }

			            	        } else {
			            	            $("#code-button").css("background-color", "#cacaca");
			            	            $("#code-button").attr("disabled", true);
			            	            flagForTel = false;
			            	            $("#login-button").attr("disabled", true);
			            	        }
			            	    }
			            	}
			            	$scope.isInputForPassword = function() {

			            	    if ($scope.userkeyVo.password != null && $scope.userkeyVo.password.toString().length > 0) {
			            	        if ($scope.tab == 'telphone') {
			            	            flagForPassword = true;
			            	            if (flagForTel && flagForPassword) {
			            	                $("#login-button").attr("disabled", false);
			            	            }

			            	        } else if ($scope.tab == 'usale') {
			            	            flagForPassword = true;
			            	            if (flagForBus && flagForPassword) {
			            	                $("#login-button").attr("disabled", false);
			            	            }
			            	        }

			            	    } else {
			            	        flagForPassword = false;
			            	        $("#login-button").attr("disabled", true);
			            	    }
			            	}
			            	$scope.isInputForCode = function() {
			            	    if ($scope.currentCode != null && $scope.currentCode.toString().length > 0) {
			            	        flagForCode = true;
			            	        if (flagForCode && flagForTel) {
			            	            $("#login-button").attr("disabled", false);
			            	        }
			            	    } else {
			            	        flagForCode = false;
			            	        $("#login-button").attr("disabled", true);
			            	    }
			            	}
			            	$scope.isInputForBus = function() {

			            	    if ($scope.userkeyVo.businessname1 != null && $scope.userkeyVo.businessname1.toString().length > 0) {
			            	        flagForBus = true;
			            	        if (flagForBus && flagForPassword) {
			            	            $("#login-button").attr("disabled", false);
			            	        }
			            	    } else {
			            	        flagForBus = false;
			            	        $("#login-button").attr("disabled", true);
			            	    }
			            	}
			            

				});