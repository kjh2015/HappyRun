/**
 * 修改用户验证信息控制器.
 */
chldControllers
		.controller(
				'edituserkey',
				function($scope, $http, ngDialog) {
					var id = localStorageGet("edituserkeyid", false);
					var po = new UserkeyVo();
					po.userkeyId = id;
					$http
							.get(
									baseUrl
											+ "getUserkeyByUserkeyId.action?userkey="
											+ po.voToJson(), {
										"noCache" : Date()
									})
							.success(
									function(data) {
										$(".loading-container").addClass(
												"loading-inactive");
										if (data) {
											if (data.serviceResult == true) {
												$scope.edituserkey = new UserkeyVo();
												$scope.edituserkey.userkeyId = data.resultParm.userkey.userkeyId;
												$scope.edituserkey.userId = data.resultParm.userkey.userId;
												$scope.edituserkey.loginname = data.resultParm.userkey.loginname;
												$scope.edituserkey.password = data.resultParm.userkey.password;
											} else {
												$window.location.href = "login.html";
											}
										} else {
											alert("数据库连接失败，请联系技术工程师");
										}
									}).error(
									function(data) {
										$(".loading-container").addClass(
												"loading-inactive");
									});

					$scope.back = function() {
						window.history.back();
					}

					$scope.editUserkey = function() {
						$(".loading-container").removeClass("loading-inactive");

						if ($scope.edituserkey.password == null
								|| $scope.edituserkey.password == "") {
							ngDialog
									.openConfirm(
											{
												template : '<h3>用户登录密码不能为空</h3><hr/>'
														+ '<div class="ngdialog-buttons">'
														+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
												plain : true,
												scope : $scope,
												closeByEscape : false
											})
									.then(
											function() {
												$(".loading-container")
														.addClass(
																"loading-inactive");
											});
						} else {
							$http
									.get(
											baseUrl
													+ "editUserkey.action?userkey="
													+ $scope.edituserkey
															.voToJson(), {
												"noCache" : Date()
											})
									.success(
											function(data) {
												$(".loading-container")
														.addClass(
																"loading-inactive");
												if (data) {
													if (data.serviceResult == true) {
														ngDialog
																.openConfirm(
																		{
																			template : '<h3>修改用户验证信息成功！</h3><hr/>'
																					+ '<div class="ngdialog-buttons">'
																					+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
																			plain : true,
																			scope : $scope,
																			closeByEscape : false
																		})
																.then(
																		function() {
																			window.history
																					.back();
																		});
													} else {
														ngDialog
																.openConfirm(
																		{
																			template : '<h3>'
																					+ data.resultInfo
																					+ '</h3><hr/>'
																					+ '<div class="ngdialog-buttons">'
																					+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
																			plain : true,
																			scope : $scope,
																			closeByEscape : false
																		})
																.then(
																		function() {
																			$(
																					".loading-container")
																					.addClass(
																							"loading-inactive");
																		});
													}
												} else {
													alert("数据库连接失败，请联系技术工程师");
												}
											})
									.error(
											function(data) {
												$(".loading-container")
														.addClass(
																"loading-inactive");
											});
						}
					}
				});