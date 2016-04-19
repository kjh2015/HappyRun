/**
 * 添加行为控制器.
 */
chldControllers
		.controller(
				'addpermission',
				function($scope, $http, ngDialog) {

					$scope.back = function() {
						window.history.back();
					}

					$scope.newPermission = new PermissionVo();

					$scope.addPermission = function() {
						$(".loading-container").removeClass("loading-inactive");

						if ($scope.newPermission.permissionname == null
								|| $scope.newPermission.permissionname == "") {
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
													+ "addPermission.action?permission="
													+ $scope.newPermission
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
																			template : '<h3>添加行为成功！</h3><hr/>'
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