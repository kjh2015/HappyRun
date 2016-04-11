/**
 * 修改角色控制器.
 */
chldControllers
		.controller(
				'editProductCtrl',
				function($scope, $http, $window, ngDialog, Upload, $timeout) {
					$scope.imageList = new Array();
					$scope.uploadURLList = new Array();
					$scope.fileList = new Array();
					var id = localStorageGet("productid", true);
					$scope.currencys = [ {
						currenyid : 1,
						currency : 'RMB'
					}, {
						currenyid : 2,
						currency : 'USD'
					}, {
						currenyid : 3,
						currency : 'GBP'
					}, {
						currenyid : 4,
						currency : 'EUR'
					}, {
						currenyid : 5,
						currency : "INR"
					} ];
					// $scope.currenys=new Array();
					$scope.productVo = localStorageGet("productVo", true);
					if ($scope.productVo != null) {
						var productTypeList = localStorageGet(
								"tempFinishArray", true);
						if (productTypeList != null) {
							var tempProductTypeList = new Array();
							angular.forEach(productTypeList, function(item) {
								tempProductTypeList.push(item.producttypename);
							})
							$scope.productVo.producttypenames = tempProductTypeList
									.join(",");
						}
						$scope.currenySeleted = $scope.currencys[$scope.productVo.currencyid - 1];
						var imgs = $scope.productVo.images.split(',');
						angular.forEach(imgs, function(data) {
							var image = {};
							image.path = data;
							image.imageName = data.substring(data
									.lastIndexOf('/') + 1, data.length);
							;
							$scope.imageList.push(image);
						});

					} else {
						var po = new ProductVo();
						po.productid = localStorageGet("editproductid", false);
						$http
								.get(
										baseUrl
												+ "productInfoById.action?productvo="
												+ po.voToJson(), {
											"noCache" : Date()
										})
								.success(
										function(data) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (data) {
												if (data.serviceResult == true) {
													$scope.productVo = new ProductVo();
													$scope.productVo = data.resultParm.productinfo;
													var imgs = $scope.productVo.images
															.split(',');
													angular
															.forEach(
																	imgs,
																	function(
																			data) {
																		var image = {};
																		image.path = data;
																		image.imageName = data
																				.substring(
																						data
																								.lastIndexOf('/') + 1,
																						data.length);
																		;
																		$scope.imageList
																				.push(image);
																	});
													$scope.currenySeleted = $scope.currencys[$scope.productVo.currencyid - 1];

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
					$scope.preEditProductType = function() {
						localStoragePut("productVo", $scope.productVo);
						// localStoragePut("currenySeleted",
						// $scope.currenySeleted);
						$window.location.href = "#/editproducttype";
					}

					// 添加图片
					$scope.addImage = function(files) {
						console.log(files);
						if (files && files.length > 0) {
							for (var i = 0; i < files.length; i++) {
								if (files[i]) {
									console.log(files[i]);
									$scope.fileList.push(files[i]);
								}

							}
						}
					}

					// 删除图片
					$scope.deleteImage = function(index) {
						$scope.imageList.splice(index, 1);
					}
					// 删除图片
					$scope.deleteAddImage = function(index) {
						$scope.fileList.splice(index, 1);
					}
					// 返回
					$scope.selectChange = function() {
						$scope.productVo.currencyid = $scope.currenySeleted.currenyid;
						$scope.productVo.currency = $scope.currenySeleted.curreny;
					}
					$scope.back = function() {
						window.location.href = "#/product";
					}

					$scope.check = function() {
					 if ($scope.productVo.productname != null) {
							$scope.productnameMsg = "";
						}  if ($scope.productVo.price != null) {
							$scope.priceMsg = "";
						}  if ($scope.productVo.unit != null) {
							$scope.unitMsg = "";
						}  if ($scope.productVo.netweight != null) {
							$scope.netweightMsg = "";
						}  if ($scope.productVo.specification != null) {
							$scope.specificationMsg = "";
						}  if ($scope.productVo.stock != null) {
							$scope.stockMsg = "";
						}  if ($scope.imageList.length != 0) {
							$scope.imgMsg = "";
						}
					}

					$scope.editProduct = function() {
						if ($scope.productVo.productname == null
								|| $scope.productVo.productname.length == 0) {
							$scope.productnameMsg = "提示：产品名称不能为空";
						} else if ($scope.productVo.price == null
								|| $scope.productVo.price.length == 0) {
							$scope.priceMsg = "提示：销售单价不能为空";
						}  else {
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
																	$scope.productVo.currenyid = $scope.currenySeleted.currenyid;
																	$scope.productVo.curreny = $scope.currenySeleted.curreny;
																	var tempArr = [];
																	angular
																			.forEach(
																					$scope.imageList,
																					function(
																							img) {
																						tempArr
																								.push(img.path);
																					})

																	$scope.productVo.images = tempArr
																			.join(',')
																			+ ","
																			+ $scope.uploadURLList
																					.join(',');
																	var json = angular
																			.toJson($scope.productVo);
																	$(
																			".loading-container")
																			.removeClass(
																					"loading-inactive");
																	$http
																			.get(
																					'/usale/editProduct?productvo='
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

							} else {
								$scope.productVo.currenyid = $scope.currenySeleted.currenyid;
								$scope.productVo.curreny = $scope.currenySeleted.curreny;
								var tempArr = [];
								angular.forEach($scope.imageList,
										function(img) {
											tempArr.push(img.path);
										})
								$scope.productVo.images = tempArr.join(',');
								console.log($scope.productVo);
								var json = angular.toJson($scope.productVo);
								$(".loading-container").removeClass(
										"loading-inactive");
								$http
										.get(
												'/usale/editProduct?productvo='
														+ json, {
													"noCache" : Date()
												})
										.success(
												function(data) {
													console.log(data);
													$(".loading-container")
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
												function(data) {
													$(".loading-container")
															.addClass(
																	"loading-inactive");
												});
							}
						}
					}

				});