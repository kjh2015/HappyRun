/**
 * 修改角色控制器.
 */
chldControllers
		.controller(
				'editrole',
				function($scope, $http, ngDialog) {
					var id = localStorageGet("editroleid", false);
					var po = new RoleVo();
					po.roleid = id;
					$http
							.get(
									baseUrl + "getRoleByRoleId.action?role="
											+ po.voToJson(), {
										"noCache" : Date()
									})
							.success(
									function(data) {
										$(".loading-container").addClass(
												"loading-inactive");
										if (data) {
											if (data.serviceResult == true) {
												$scope.editrole = new RoleVo();
												$scope.editrole.roleid = data.resultParm.role.roleid;
												$scope.editrole.rolename = data.resultParm.role.rolename;
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

					$scope.editRole = function() {
						$(".loading-container").removeClass("loading-inactive");

						if ($scope.editrole.rolename == null
								|| $scope.editrole.rolename == "") {
							ngDialog
									.openConfirm(
											{
												template : '<h3>角色名不能为空</h3><hr/>'
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
													+ "editRole.action?role="
													+ $scope.editrole
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
																			template : '<h3>修改角色成功！</h3><hr/>'
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