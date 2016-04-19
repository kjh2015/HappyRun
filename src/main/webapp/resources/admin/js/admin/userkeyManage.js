/**
 * 用户验证信息控制器.
 */
chldControllers
		.controller(
				'userkeyCtrl',
				function($scope, $http, ngDialog) {
					$scope.page = new PaginationVo();
					$scope.page.size = 15;
					$scope.page.indexPageNum = 1;

					$scope.userkeyForSearch = new UserkeyVo();
					$scope.pageUserkey = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageUserkey.action?page="
								+ $scope.page.voToJson();
						if (($scope.userkeyForSearch.userkeyId != null && $scope.userkeyForSearch.userkeyId != "")
								|| ($scope.userkeyForSearch.loginname != null && $scope.userkeyForSearch.loginname != "")) {
							url = url + "&userkey="
									+ $scope.userkeyForSearch.voToJson();
						}
						$http
								.get(url, {
									"noCache" : Date()
								})
								.success(
										function(data) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (data) {
												if (data.serviceResult == true) {
													$scope.userkeys = data.resultParm.pageList;
													$scope.page.totalCount = data.resultParm.totalCount;
													var element = $('#page');
													var totalPages = Math
															.ceil($scope.page.totalCount
																	/ $scope.page.size);

													var options = {
														bootstrapMajorVersion : 3,
														currentPage : $scope.page.indexPageNum,
														numberOfPages : 5,
														totalPages : totalPages,
														onPageClicked : function(
																event,
																originalEvent,
																type, page) { // 异步换页
															$scope.page.indexPageNum = page;
															$scope
																	.pageUserkey();
														}
													}
													element
															.bootstrapPaginator(options);
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
					}
					$scope.pageUserkey();

					$scope.preEditUserkey = function(id) {
						localStoragePut("edituserkeyid", id);
						window.location.href = "#/edituserkey";
					}

					$scope.searchUserkey = function() {
						$scope.pageUserkey();
					}
					
					$scope.preUserkeyRole = function(id) {
						localStoragePut("userkeyidrole", id);
						window.location.href = "#/userkeyrole";
					}
				});