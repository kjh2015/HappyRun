/**
 * 产品控制器.
 */
chldControllers.directive('onFinishRenderFilters', function($timeout) {
	return {
		restrict : 'A',
		link : function(scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function() {
					new Swiper('.swiper-container', {
						direction : 'horizontal',
						loop : true,
						pagination : '.swiper-pagination',
						nextButton : '.swiper-button-next',
						prevButton : '.swiper-button-prev',
						width : 250,
						height : 250
					});
				});
			}
		}
	};
});

chldControllers
		.controller(
				'productController',
				function($scope, $http, $window, ngDialog) {
					$scope.page = new PaginationVo();
					$scope.page.size = 10;
					$scope.page.indexPageNum = 1;
					$scope.imgArr = [];
					$scope.order = "false";
					$scope.sortFieldNme = "editeTime";
					$scope.orderclass = "sorting_asc";
					$scope.searchproduct = new ProductVo();
					$scope.countindex = 0;
					$scope.count = 1;
					$scope.keyword = "";
					// 定义一个变量记录搜索关键字
					$scope.recordkeyword = "";
					$scope.recordproductname = "";
					$scope.recordproducttypes = "";

					$scope.pageProduct = function() {
						// if ($scope.recordkeyword == $scope.keyword
						// || $scope.recordproductname ==
						// $scope.searchproduct.productname
						// || $scope.recordproducttypes ==
						// $scope.searchproduct.producttypenames) {
						// r
						// }
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageMyProduct.action?page="
								+ $scope.page.voToJson() + "&sortFieldNme="
								+ $scope.sortFieldNme + "&order="
								+ $scope.order + "&product="
								+ $scope.searchproduct.voToJson() + "&keyword="
								+ $scope.keyword;
						if ((typeof ($scope.searchproduct.productname) != 'undefined'
								& $scope.searchproduct.productname != "" || typeof ($scope.searchproduct.producttypenames) != 'undefined'
								& $scope.searchproduct.producttypenames != "")
								& $scope.keyword != "") {
							url = baseUrl + "pageMyProduct.action?page="
									+ $scope.page.voToJson() + "&sortFieldNme="
									+ $scope.sortFieldNme + "&order="
									+ $scope.order + "&product="
									+ $scope.searchproduct.voToJson();
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
													$scope.products = data.resultParm.pageList;
													console.log("products",
															$scope.products);
													angular
															.forEach(
																	$scope.products,
																	function(
																			data,
																			index) {
																		console
																				.log(
																						"data.images",
																						data.images);
																		if (typeof data.images != 'undefined'
																				|| data.images != null) {
																			$scope.products[index].imgArr = data.images
																					.split(",");
																			console
																					.log($scope.products[index].imgArr);
																			angular
																					.forEach(

																							$scope.products[index].imgArr,
																							function(
																									img,
																									imgindex) {
																								$scope.products[index].imgArr[imgindex] = baseUrl2
																										+ $scope.products[index].imgArr[imgindex];
																								// console.log("productimg",$scope.products[index].imgArr[imgindex]);
																							});
																		} else {
																			$scope.products[index].imgArr = [ '/usale/upload/product/origin/3.jpg' ];
																		}
																		$scope.products[index].flag = false;
																		$scope.products[index].price = parseFloat(
																				$scope.products[index].price)
																				.toFixed(
																						2);
																	});
													$scope.page.totalCount = data.resultParm.totalCount;
													// 记录搜索关键字
													$scope.recordkeyword = $scope.keyword;
													$scope.recordproductname = $scope.searchproduct.productname;
													$scope.recordproducttypes = $scope.searchproduct.producttypenames;
													$scope.countindex = $scope.countindex + 1;
													if ($scope.countindex == 1) {
														$scope.count = data.resultParm.totalCount;
													}
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
																	.pageProduct();
														}
													}
													element
															.bootstrapPaginator(options);
												} else {
													$window.location.href = "AdminLogin.html";
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

					$scope.pageProduct();

					$scope.checkrecord = function() {
						if ($scope.recordkeyword != $scope.keyword
								|| $scope.recordproductname != $scope.searchproduct.productname
								|| $scope.recordproducttypes != $scope.searchproduct.producttypenames) {
							$scope.pageProduct();
						}
					}

					$scope.orderProduct = function(sortFieldNme, order) {
						$scope.sortFieldNme = sortFieldNme;
						$scope.order = !order;
						$scope.pageProduct();
					}
					$scope.toaddproduct = function() {
						$window.location.href = "#/addproduct";
					}

					$scope.preEditProduct = function(id) {
						console.log('editproductid', id);
						localStoragePut("editproductid", id);
						$window.location.href = "#/editproduct";
					}
					// 导入excel
					$scope.importExcel = function() {
						// 用户点击了importexcel的按钮
						localStoragePut("importexcel", true);
						$window.location.href = "#/batchaddproduct";
					}

					$scope.myKeyup = function(e) {
						var keycode = window.event ? e.keyCode : e.which;
						if (keycode == 13) {
							if ($scope.recordkeyword != $scope.keyword
									|| $scope.recordproductname != $scope.searchproduct.productname
									|| $scope.recordproducttypes != $scope.searchproduct.producttypenames) {
								$scope.pageProduct();
							}
						}
					};

					// $scope.checkchange = function(){
					// var changesearch = $searchproduct.productname;
					// $scope.i = $scope.i+1;
					//						
					// }

					$scope.exportexcel = function() {
						var url = baseUrl
								+ "exportMyProductAsExcel.action?productvo="
								+ $scope.searchproduct.voToJson();
						$http
								.get(url, {
									"noCache" : Date()
								})
								.success(
										function(data) {
											if (data) {
												if (data.serviceResult == true) {
													$window.location.href = baseUrl2
															+ data.resultParm.excelPath;
												} else {
													$window.location.href = "AdminLogin.html";
												}
											} else {
												alert("数据库连接失败，请联系技术工程师");
											}
										}).error(function(data) {
									alert("导出excel失败");
								});
					}

					$scope.prebatchaddproduct = function() {
						$window.location.href = "#/batchaddproduct";
						$("#sidebar").addClass("menu-compact");
						$("#sidebar-collapse").addClass("active");
					}

					$scope.preinexcel = function() {
						$window.location.href = "#/batchaddproduct";
					}

					$scope.deleteProduct = function(product) {
						ngDialog
								.openConfirm(
										{
											template : '<h3>删除产品，将不能恢复！</h3><h4>是否继续删除？</h4><hr/>'
													+ '<div class="ngdialog-buttons">'
													+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>'
													+ '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button></div>',
											plain : true,
											scope : $scope,
											closeByEscape : false
										})
								.then(
										function() {
											// alert("进入方法deleteProduct");
											var productfordel = new ProductVo();
											productfordel.productid = product.productid;
											var url = baseUrl
													+ "deleteProduct?productvo="
													+ productfordel.voToJson();
											$http
													.get(url, {
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
																		// alert("删除产品成功");
																		$scope
																				.pageProduct();
																	} else {
																		$window.location.href = "#/product";
																	}
																} else {
																	alert("数据库连接失败，请联系技术工程师");
																}
															})
													.error(function(data) {
														alert("删除产品失败");
													});
										});

					}

				});
