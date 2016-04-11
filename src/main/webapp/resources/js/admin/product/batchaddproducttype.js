/**
 * 修改角色控制器.
 */
chldControllers
		.controller(
				'batchaddproducttypectrl',
				function($scope, $http, $window, ngDialog, Upload, $timeout) {
					$scope.productTypeList = new Array();
					$scope.tempArray = new Array();
					$scope.productlist = localStorageGet("productlist", true);
					$scope.productIndex = localStorageGet("index", true);
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
												$scope.productTypeList = data.resultParm.producttypeList;
												angular
														.forEach(
																$scope.productTypeList,
																function(item) {
																	$scope.tempArray
																			.push(item.producttypename);
																	item.isnew = false;
																	var tempTypeStr = $scope.productlist[$scope.productIndex].producttypenames;
																	console
																			.log(
																					"tempTypeStr",
																					$scope.productlist[$scope.productIndex].producttypenames);
																	if (tempTypeStr == null) {
																		tempTypeStr = "";
																	}
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
																})

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
						$http
								.get(
										baseUrl
												+ "deleteProductType.action?productTypevo={producttypeid:"
												+ id + "}", {
											"noCache" : Date()
										})
								.success(
										function(data) {
											$(".loading-container").addClass(
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
										}).error(
										function(data) {
											$(".loading-container").addClass(
													"loading-inactive");
										});
					}
					// 添加产品类型添加
					$scope.addProductType = function() {
						var productType = new ProducttypeVo();
						var a = [];
						angular.forEach($scope.productTypeList, function(item) {
							a.push(item.producttypeid);
						})
						var id = Math.max.apply(null, a) + 1;
						productType.producttypeid = id;
						productType.producttypename = '';
						productType.isnew = true;
						productType.isadd = true;
						$scope.productTypeList.push(productType);

					}
					// 保存产品类型
					$scope.saveProductType = function(productType, index) {
						productType.isnew = false;
						var po = new ProducttypeVo();
						po.producttypeid = productType.producttypeid;
						po.producttypename = productType.producttypename;
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
						// $scope.productlist[$scope.productIndex].tempFinishArray
						// = new Array();
						$scope.tempFinishArray = new Array();
						$scope.tempIdArray = new Array();
						console.log($scope.productTypeList);
						angular.forEach($scope.productTypeList, function(item) {
							if (item.isselected == true) {
								$scope.tempFinishArray
										.push(item.producttypename);
								$scope.tempIdArray.push(item.producttypeid);
							}
						});
						if ($scope.tempIdArray.length > 0) {
							$scope.productlist[$scope.productIndex].producttypeids = $scope.tempIdArray
									.join(",");
						}
						if ($scope.tempFinishArray.length > 0) {
							$scope.productlist[$scope.productIndex].producttypenames = $scope.tempFinishArray
									.join(",");
						}
						$scope.productlist[$scope.productIndex].tempproducttype = $scope.tempFinishArray;
//						console.log("tempFinish", $scope.tempFinishArray);
//						console.log($scope.productlist[$scope.productIndex]);
						console.log("productList",$scope.productlist);
						localStoragePut("productList", $scope.productlist);
						window.location.href = "#/batchaddproduct";
					}
					$scope.goback = function() {
						localStoragePut("productList", $scope.productlist);
						// alert("goback()");
						console.log($scope.productlist);
						window.location.href = "#/batchaddproduct";
					}

				});