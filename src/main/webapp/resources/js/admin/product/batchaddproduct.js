/**
 * 添加产品控制器.
 */
chldControllers.directive('focusMe', function($timeout, $parse) {
	return {
		// scope: true, // optionally create a child scope
		link : function(scope, element, attrs) {
			var model = $parse(attrs.focusMe);
			scope.$watch(model, function(value) {
				if (value === true) {
					$timeout(function() {
						element[0].focus();
					});
				}
			});
			// to address @blesh's comment, set attribute value to 'false'
			// on blur event:
			element.bind('blur', function() {
				scope.$apply(model.assign(scope, false));
			});
		}
	};
});
chldControllers
		.controller(
				'batchaddproductctrl',
				function($scope, $http, $window, ngDialog, Upload, $timeout) {
					$scope.uploadURLList = new Array();
					$scope.productid = 1;
					// $scope.fileList = new Array();
					$scope.productList = localStorageGet("productList", true);
					// $scope.imagesizeindex = 0;
					$scope.filesizeindex = 0;
					// $scope.selectcurrency = new CurrencyVo();
					$scope.imageindex = 0;
					if ($scope.productList == null) {
						
						var product = new ProductVo();
						// product.inputflag = new Array(true, false, false,
						// false, false, false, false, false, false, false);
						// product.inputflag = new Array(true, true, true,
						// true, true, true, true, true, true, true);
						product.fileList = [];
						product.tempimages = "";
						product.tempImageArr = [];
						product.filesizeindex = 0;
						product.check = false;
//						product.productname = "";
						product.unit = "件";
						product.netweight = 0;
						product.specification = 0;
						product.stock = 0;
						product.productid = $scope.productid;
						product.checkname = false;
						product.checkprice = false;
						product.checkstock = false;
						$scope.productList = new Array();
						$scope.productList.push(product);
					}

					// console.log($scope.productList);
					// 导入excel表格
					$scope.importexcel = function(files) {
						console.log(files);
						if (files && files.length > 0) {
							for (var i = 0; i < files.length; i++) {
								if (files[i]) {
									Upload
											.upload(
													{
														url : baseUrl
																+ 'importProductExcel.action',
														fields : {
															"noCache" : Date()
														},
														file : files[i]
													})
											.success(
													function(da, status,
															headers, config) {
														if (da) {
															if (da.serviceResult == true) {
																var temproducttype=new Array();
																$scope.productList = da.resultParm.productVoList;
																angular.forEach($scope.productList,function(product){
																	if(product.currency=="RMB"){
																	product.selectcurrency = $scope.currencys[0];
																	}
																	if(product.currency=="USD"){
																		product.selectcurrency = $scope.currencys[1];
																		}
																	if(product.currency=="GBP"){
																		product.selectcurrency = $scope.currencys[2];
																		}
																	if(product.currency=="EUR"){
																		product.selectcurrency = $scope.currencys[3];
																		}
																	if(product.currency=="INR"){
																		product.selectcurrency = $scope.currencys[4];
																		}
																	product.tempproducttype=product.producttypenames.split(',');
																	
																})
																if(da.resultParm.errorMsg!=null){
																	console.log(da.resultParm.errorMsg);
																	angular.forEach($scope.productList,function(product,index){
																		if(da.resultParm.errorMsg.toString().indexOf(","+index+",")>0){
																			product.checkname = false;
																			product.check = true;
																		}
																	})
																}
																
															} else {
																alert(data.resultInfo);
															}
														} else {
															alert("数据库连接失败，请联系技术工程师");
														}
													});

								}

							}
						}
					}

					$scope.currencys = localStorageGet("currencys", false);
					if ($scope.currencys == null) {
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
													$scope.currencys = data.resultParm.currencyList;
													localStoragePut(
															"currencys",
															$scope.currencys);
													console.log("first",
															$scope.currencys);
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
					angular.forEach($scope.productList, function(product) {
						var flagArr = new Array();
						angular.forEach(product.inputflag, function(flag) {
							if (flag == "true" || flag == true) {
								flagArr.push(true);
							} else {
								flagArr.push(false);
							}
						});
						product.inputflag = flagArr;
						if (product.selectcurrency == null) {
							if ($scope.currencys != null) {
								product.selectcurrency = $scope.currencys[0];
							}
						}

					});
					// 添加图片
					$scope.addImage = function(index, files) {
						// console.log($scope.productList);
						if (files && files.length > 0) {
							for (var i = 0; i < files.length; i++) {
								if (files[i]) {
									$scope.productList[index].fileList
											.push(files[i]);
									console.log("fileList",
											$scope.productList[index].fileList);
									Upload
											.upload(
													{
														url : baseUrl
																+ 'addUploadImage.action',
														fields : {
															"noCache" : Date()
														},
														file : files[i]
													})
											.success(

													function(data, status,
															headers, config) {
														if (data) {
															if (data.serviceResult == true) {
																$scope.productList[index].filesizeindex = $scope.productList[index].filesizeindex + 1;
																// $scope.uploadURLList
																// .push(data.resultParm.fileName);
																$scope.productList[index].tempImageArr
																		.push(data.resultParm.fileName);
																console
																		.log(
																				"tempArr",
																				$scope.productList[index].tempImageArr);
																if ($scope.productList[index].filesizeindex == $scope.productList[index].fileList.length) {
																	// alert("上传成功");
																	$scope.productList[index].images = $scope.productList[index].tempImageArr
																			.join(",");
																	console
																			.log(
																					"productimages",
																					$scope.productList[index].images);
																}
															} else {
																alert(data.resultInfo);
															}
														} else {
															alert("数据库连接失败，请联系技术工程师");
														}
													});
								}
							}

							var tempArr = new Array();
							angular.forEach($scope.productList[index].fileList,
									function(file) {
										tempArr.push(file.name);
									});
							$scope.productList[index].tempimages = tempArr
									.join(",");
						}

					}

					// 删除图片
					$scope.deleteAddImage = function(product) {
						product.fileList.splice(product.fileList.length - 1, 1);
						var tempArr = new Array();
						angular.forEach(product.fileList, function(file) {
							tempArr.push(file.name);
						});
						product.tempimages = tempArr.join(",");
					}
					$scope.back = function() {
						window.location.href = "#/batchaddproduct";
					}

					$scope.addrow = function() {
						var productforadd = new ProductVo();
						productforadd.fileList = [];
						productforadd.tempImageArr = [];
						productforadd.selectcurrency = $scope.currencys[0];
						productforadd.filesizeindex = 0;
						productforadd.check = false;
						$scope.productid = $scope.productid + 1;
						productforadd.productid = $scope.productid;
//						productforadd.productname = "";
						productforadd.unit = "件";
						productforadd.netweight = 0;
						productforadd.specification = 0;
						productforadd.stock = 0;
						productforadd.checkname = false;
						productforadd.checkprice = false;
						productforadd.checkstock = false;
						$scope.productList.push(productforadd);
					}

					$scope.deleterow = function(index) {
						$scope.productList.splice(index, 1);
					}

					$scope.openandcheck = function(product, index) {
						if(typeof product.productname=='undefined'||product.productname==""){
							product.checkname = true;
						}else{
							product.checkname = false;
						}
						if(typeof product.price=='undefined'||product.price==""){
							product.checkprice = true;
						}else{
							product.checkprice = false;
						}
						console.log("stock",product.stock);
						if(angular.isUndefined(product.stock)){
							product.checkstock = true;
						}else{
							product.checkstock = false;
						}
						var i = 0;
						for (var i = 0;i<$scope.productList.length; i++) {
							var productforcheck = $scope.productList[i];
							if (productforcheck == product) {
								return;
							}
							if (typeof productforcheck.productname != 'undefined'
									&& typeof product.productname != 'undefined'
									&& productforcheck.productname == product.productname) {
								console.log("productforcheck.productname",
										productforcheck.productname);
								product.check = true;
								break;
							} else if (typeof productforcheck.productname != 'undefined'
									&& typeof product.productname != 'undefined'
									&& productforcheck.productname != product.productname) {
								product.check = false;
							}
						}

					}
					
					$scope.preEditProductType = function(index) {
						localStoragePut("productlist", $scope.productList);
						localStoragePut("index", index);
						$window.location.href = "#/batchaddproducttype";
					}
					$scope.batchaddProduct = function() {
						var flag = false;
						var check = true;
						angular.forEach($scope.productList, function(product,
								index) {
							 if(typeof product.productname=='undefined'||product.productname==""){
								product.checkname=true;
								check = false;
							}else if(typeof product.price=='undefined'||product.price==""){
								product.checkprice = true;
								check = false;
							}else if(typeof product.stock=='undefined'||product.stock==""){
								product.checkstock = true;
								check = false;
							}
						})

						if(check){
							angular
									.forEach(
											$scope.productList,
											function(product) {
												product.currencyid = product.selectcurrency.currencyid;
												product.currency = product.selectcurrency.charactercode;
											});
							var json = angular.toJson($scope.productList);
							console.log("json", json);
							$(".loading-container").removeClass(
									"loading-inactive");
							$http
									.get(
											'/usale/addProducts?productsStr='
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
														// $scope.pageProduct();
													} else if (data.resultInfo == 42061
															|| data.resultInfo == 40001) {
														ngDialog
																.openConfirm(
																		{
																			template : '<h3>'
																					+ data.resultParm.errorMsg
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
