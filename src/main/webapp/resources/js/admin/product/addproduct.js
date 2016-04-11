/**
 * 添加产品控制器.
 */
chldControllers
		.controller(
				'addproductctrl',
				function($scope, $http, $window, ngDialog, Upload, $timeout) {
					$scope.imageList = new Array();
					$scope.uploadURLList = new Array();
					$scope.fileList = new Array();
					$scope.newproductVo = new ProductVo();
//					$scope.newproductVo.unit = "件";
//					$scope.newproductVo.netweight = 0;
//					$scope.newproductVo.specification = 0;
//					$scope.newproductVo.stock = 0;
//					$scope.newproductVo.price = 1;
					$scope.currencys = [];
					$scope.currencySelected = new CurrencyVo();
					$scope.newproductVo = localStorageGet("newproductVo", true);
					$scope.tempArr= [];
					var productTypeList = localStorageGet("tempFinishArray",
							true);
					if (productTypeList != null) {
						var tempProductTypeList = new Array();
						angular.forEach(productTypeList, function(item) {
							tempProductTypeList.push(item.producttypename);
						})
						$scope.newproductVo.producttypenames = tempProductTypeList
								.join(",");
					}

					$http
							.get(baseUrl + "getCurrenyList.action", {
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
																data.resultParm.currencyList,
																function(item) {
																	var currency = {};
																	currency.currencyid = item.currencyid;
																	currency.currency = item.charactercode;
																	$scope.currencys
																			.push(currency);
																	$scope.currencySelected = $scope.currencys[0];
																});

											} else {
												$window.location.href = "adminlogin.html";
											}
										} else {
											alert("数据库连接失败,请联系技术工程师.");
										}
									}).error(
									function(data) {
										$(".loading-container").addClass(
												"loading-inactive");
									});

					
					$scope.preEditProductType = function() {
						localStoragePut("newproductVo", $scope.newproductVo);
						$window.location.href = "#/addproducttype";
					}

					// 添加图片
					$scope.addImage = function(files) {
						console.log(files);
						if (files && files.length > 0) {
							for (var i = 0; i < files.length; i++) {
								if (files[i]) {
									$scope.fileList.push(files[i]);
								}

							}
						}
						$scope.check();
					}

					// 删除图片
					$scope.deleteAddImage = function(index) {
						$scope.fileList.splice(index, 1);
					}
					// 返回
					$scope.selectChange = function() {
						$scope.newproductVo.currencyid = $scope.currencySelected.currencyid;
						$scope.newproductVo.currency = $scope.currencySelected.currency;
						$scope.check();
					}
					$scope.back = function() {
						window.location.href = "#/product";
					}
					
					$scope.check = function() {
						 if ($scope.newproductVo.productname != null) {
								$scope.productnameMsg = "";
							}  if ($scope.newproductVo.price != null) {
								$scope.priceMsg = "";
							}  if ($scope.newproductVo.unit != null) {
								$scope.unitMsg = "";
							}  if ($scope.newproductVo.netweight != null) {
								$scope.netweightMsg = "";
							}  if ($scope.newproductVo.specification != null) {
								$scope.specificationMsg = "";
							}  if ($scope.newproductVo.stock != null) {
								$scope.stockMsg = "";
							}  if ($scope.imageList.length != 0) {
								$scope.imgMsg = "";
							}  if ($scope.currencySelected.currency!=null) {
								$scope.currencyMsg = "";
							}  if ($scope.fileList.length != 0) {
								$scope.imgMsg = "";
							}
						}

					$scope.addProduct = function() {
						if($scope.newproductVo==null){
							$scope.productnameMsg = "提示：产品名称不能为空";
						}
						if ($scope.newproductVo.productname == null
								|| $scope.newproductVo.productname.length == 0) {
							$scope.productnameMsg = "提示：产品名称不能为空";
						} else if ($scope.newproductVo.price == null
								|| $scope.newproductVo.price.length == 0) {
							$scope.priceMsg = "提示：销售单价不能为空";
						}
						else {
							if ($scope.fileList.length > 0) {
								for (var i = 0; i < $scope.fileList.length; i++) {
									Upload
											.upload(
													{
														url : baseUrl
																+ 'addUploadImage.action',
														fields : {
															"noCache" : Date()
														},
														file : $scope.fileList[i]
													})
											.progress(function(evt) {

											})
											.success(

													function(data, status,
															headers, config) {
														if (data) {
															if (data.serviceResult == true) {
																$scope.uploadURLList
																		.push(data.resultParm.fileName);
																if ($scope.uploadURLList.length == $scope.fileList.length) {
																	$scope.newproductVo.currencyid = $scope.currencySelected.currencyid;
																	$scope.newproductVo.currency = $scope.currencySelected.currency;
																	$scope.newproductVo.images = $scope.uploadURLList
																			.join(',');
																	 angular.forEach(productTypeList,function(type){
																		$scope.tempArr.push(type.producttypeid);
																	})
																	$scope.newproductVo.producttypeids =$scope.tempArr.join(",");
																	 console.log("newProductVo",$scope.newproductVo);
																	var json = angular
																			.toJson($scope.newproductVo);
																	$(
																			".loading-container")
																			.removeClass(
																					"loading-inactive");
																	$http
																			.get(
																					'/usale/addProduct?productvo='
																							+ json,
																					{
																						"noCache" : Date()
																					})
																			.success(
																					function(
																							data) {
																						console
																								.log(data);
																						$(
																								".loading-container")
																								.addClass(
																										"loading-inactive");
																						if (data) {
																							if (data.serviceResult == true) {
																								window.location.href = "#/product";
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
																					function(
																							data) {
																						$(
																								".loading-container")
																								.addClass(
																										"loading-inactive");
																					});

																}

															} else {
																alert(data.resultInfo);
															}
														} else {
															alert("数据库连接失败，请联系技术工程师");
														}
													});
								}

							}else{
								$scope.newproductVo.currencyid = $scope.currencySelected.currencyid;
								$scope.newproductVo.currency = $scope.currencySelected.currency;
								$scope.newproductVo.images = $scope.uploadURLList
										.join(',');
								 angular.forEach(productTypeList,function(type){
									$scope.tempArr.push(type.producttypeid);
								})
								$scope.newproductVo.producttypeids =$scope.tempArr.join(",");
								 console.log("newProductVo",$scope.newproductVo);
								var json = angular
										.toJson($scope.newproductVo);
								$(
										".loading-container")
										.removeClass(
												"loading-inactive");
								$http
										.get(
												'/usale/addProduct?productvo='
														+ json,
												{
													"noCache" : Date()
												})
										.success(
												function(
														data) {
													console
															.log(data);
													$(
															".loading-container")
															.addClass(
																	"loading-inactive");
													if (data) {
														if (data.serviceResult == true) {
															window.location.href = "#/product";
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
												function(
														data) {
													$(
															".loading-container")
															.addClass(
																	"loading-inactive");
												});
							}
						}
					}

				});