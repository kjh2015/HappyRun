/**
 * 修改角色控制器.
 */
chldControllers
		.controller(
				'editProductTypeCtrl',
				function($scope, $http, $window, ngDialog, Upload, $timeout) {
					$scope.productVo = localStorageGet("productVo", false);
					console.log("productVo", $scope.productVo);
					$scope.productTypeList = new Array();
					$scope.tempArray = new Array();
					$http
							.get(baseUrl + "getProductTypeList.action", {
								"noCache" : Date()
							})
							.success(
									function(data) {
										$(".loading-container").addClass(
												"loading-inactive");
										if (data) {
											if (data.serviceResult == true) {
												console.log(data);
												$scope.productTypeList = data.resultParm.producttypeList;
												angular
														.forEach(
																$scope.productTypeList,
																function(item) {
																	$scope.tempArray
																			.push(item.producttypeid);
																	item.isnew = false;

																	var tempTypeStr = $scope.productVo.producttypenames;
																	tempTypeStr = tempTypeStr
																			.split(",");
																	angular
																			.forEach(
																					tempTypeStr,
																					function(
																							producttypeforSel) {
																						if (item.producttypename == producttypeforSel) {
																							item.isselected = true;
																						}
																					})

																});
												console
														.info($scope.productTypeList);
											} else {
												$window.location.href = "AdminLogin.html";
											}
										} else {
											alert("数据库连接失败,请联系技术工程师.");
										}
									}).error(
									function(data) {
										$(".loading-container").addClass(
												"loading-inactive");
									});
					// 删除产品类型
					$scope.deleteProductType = function(id) {
						ngDialog
								.openConfirm(
										{
											template : '<h3>删除产品类型，将不能恢复！</h3><h4>是否继续删除？</h4><hr/>'
													+ '<div class="ngdialog-buttons">'
													+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>'
													+ '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button></div>',
											plain : true,
											scope : $scope,
											closeByEscape : false
										})
								.then(
										function() {
											$(".loading-container").addClass(
													"loading-inactive");
											$http
													.get(
															baseUrl
																	+ "deleteProductType.action?productTypevo={producttypeid:"
																	+ id + "}",
															{
																"noCache" : Date()
															})
													.success(
															function(data) {
																$(
																		".loading-container")
																		.addClass(
																				"loading-inactive");
																if (data) {
																	if (data.serviceResult == true) {
																		angular
																				.forEach(
																						$scope.productTypeList,
																						function(
																								item) {
																							if (id == item.producttypeid) {
																								$scope.productTypeList
																										.splice(
																												item,
																												1);
																							}
																						})

																	} else {
																		$window.location.href = "AdminLogin.html";
																	}
																} else {
																	alert("数据库连接失败,请联系技术工程师.");
																}
															})
													.error(
															function(data) {
																$(
																		".loading-container")
																		.addClass(
																				"loading-inactive");
															});
										});

					}
					// 添加产品类型添加
					$scope.addProductType = function() {
						var productType = new ProducttypeVo();
						var a = [];
						angular.forEach($scope.productTypeList, function(item) {
							a.push(item.producttypeid);
						})
						productType.producttypename = '';
						productType.isnew = true;
						productType.isadd = true;
						$scope.productTypeList.push(productType);

					}
					// 保存产品类型
					$scope.saveProductType = function(productType, index) {
						var po = new ProducttypeVo();
						po.producttypeid = productType.producttypeid;
						po.producttypename = productType.producttypename;
						if (po.producttypename != "") {
							productType.isnew = false;
							if (productType.isadd == true) {
								$http
										.get(
												baseUrl
														+ "addProductType.action?productTypevo="
														+ po.voToJson(), {
													"noCache" : Date()
												})
										.success(
												function(data) {
													$(".loading-container")
															.addClass(
																	"loading-inactive");
													if (data) {
														if (data.serviceResult == true) {
															if (data.resultInfo == 41021) {
																$scope.productTypeList
																		.splice(
																				index,
																				1);
															} else if (data.resultInfo == 41022) {
																alert("产品类型名称不能为空");
															} else {
																$scope.productTypeList[index].producttypeid = data.resultParm.producttype.producttypeid;
															}
														} else {
															$window.location.href = "AdminLogin.html";
														}
													} else {
														alert("数据库连接失败,请联系技术工程师.");
													}
												})
										.error(
												function(data) {
													$(".loading-container")
															.addClass(
																	"loading-inactive");
												});
							} else {
								$http
										.get(
												baseUrl
														+ "editProductType.action?productTypevo="
														+ po.voToJson(), {
													"noCache" : Date()
												})
										.success(
												function(data) {
													$(".loading-container")
															.addClass(
																	"loading-inactive");
													if (data) {
														if (data.serviceResult == true) {

														} else {
															$window.location.href = "AdminLogin.html";
														}
													} else {
														alert("数据库连接失败,请联系技术工程师.");
													}
												})
										.error(
												function(data) {
													$(".loading-container")
															.addClass(
																	"loading-inactive");
												});
							}
						} else {
							ngDialog
									.openConfirm({
										template : '<h3>产品类型名称不能为空</h3><hr/>'
												+ '<div class="ngdialog-buttons">'
												+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">取消</button></div>',
										plain : true,
										scope : $scope,
										closeByEscape : false
									})
						}
					}
					$scope.tempArray = new Array();
					// 取消产品添加
					$scope.cancelProductType = function(productType, index) {

						if (productType.isedit == true) {
							var productType2 = $scope.tempArray[productType.tempindex]
							productType.producttypename = productType2.producttypename;
							productType.isnew = false;
							productType.isedit = false;
						} else {
							$scope.productTypeList.splice(index, 1);
						}
					}

					// 编辑用户产品类型
					$scope.editProductType = function(productType) {
						var tmp = new ProducttypeVo();
						productType.isnew = true;
						productType.isedit = true;
						for ( var p in productType) {
							// 属性
							if (typeof (productType[p]) != " function ") {
								tmp[p] = productType[p];
							}
						} // 最后显示所有的属性

						$scope.tempArray.push(tmp);
						productType.tempindex = $scope.tempArray.length - 1;

					}

					// 选择产品类型
					$scope.selectProductType = function(productType) {
						// console.log(productType);
					}

					// 完成选择
					$scope.finish = function() {
						$scope.tempFinishArray = new Array();
						angular.forEach($scope.productTypeList, function(item) {
							if (item.isselected == true) {
								$scope.tempFinishArray.push(item);
							}
						});
						console.log('tempFinishArray', $scope.tempFinishArray);
						localStoragePut("tempFinishArray",
								$scope.tempFinishArray);
						localStoragePut("productVo", $scope.productVo);
						window.location.href = "#/editproduct";
					}
					$scope.goback = function() {
						window.location.href = "#/editproduct";
					}

				});