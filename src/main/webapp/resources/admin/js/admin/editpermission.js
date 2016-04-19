/**
 * 修改行为控制器.
 */
chldControllers
		.controller(
				'editpermission',
				function($scope, $http, ngDialog) {
					var id = localStorageGet("editpermissionid", false);
					var po = new PermissionVo();
					po.permissionid = id;
					$http
							.get(
									baseUrl
											+ "getPermissionByPermissionId.action?permission="
											+ po.voToJson(), {
										"noCache" : Date()
									})
							.success(
									function(data) {
										$(".loading-container").addClass(
												"loading-inactive");
										if (data) {
											if (data.serviceResult == true) {
												$scope.editpermission = new PermissionVo();
												$scope.editpermission.permissionid = data.resultParm.permission.permissionid;
												$scope.editpermission.permissionname = data.resultParm.permission.permissionname;
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

					$scope.editPermission = function() {
						$(".loading-container").removeClass("loading-inactive");

						if ($scope.editpermission.permissionname == null
								|| $scope.editpermission.permissionname == "") {
							ngDialog
									.openConfirm(
											{
												template : '<h3>行为名不能为空</h3><hr/>'
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
													+ "editPermission.action?permission="
													+ $scope.editpermission
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
																			template : '<h3>修改行为成功！</h3><hr/>'
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