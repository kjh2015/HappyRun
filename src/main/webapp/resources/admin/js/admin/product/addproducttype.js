/**
 * 修改角色控制器.
 */
chldControllers
	.controller(
		'addproducttypectrl',
		function ($scope, $http, $window, ngDialog, Upload, $timeout) {
			$scope.goodsVo = localStorageGet("goodsVo", true);
			$scope.productTypeList = new Array();
			$scope.tempArray = new Array();

			$scope.findAllProductType = function(){
				$http({method: 'post', url: baseUrl + "catagory/findAllCatagory.do"})
					.success(
						function (data) {
							$(".loading-container").addClass(
								"loading-inactive");
							if (data) {
								if (data.serviceResult == true) {
									$scope.productTypeList = data.resultParm.cataGoryList;
									angular
										.forEach(
											$scope.productTypeList,
											function (item) {
												$scope.tempArray
													.push(item.catagoryid);
												item.isnew = false;
												if ($scope.goodsVo.catagoryname == item.catagoryname) {
													item.isselected = true;
												}
											});
								} else {
									$window.location.href = "AdminLogin.html";
								}
							} else {
								alert("数据库连接失败,请联系技术工程师.");
							}
						}).error(
					function (data) {
						$(".loading-container").addClass(
							"loading-inactive");
					});
			}

			$scope.findAllProductType();

			// 删除产品类型
			$scope.deleteProductType = function (catagory) {
				var catagoryDel = new CataGoryVo();
				catagoryDel.catagoryid = catagory.catagoryid;
				ngDialog
					.openConfirm(
						{
							template: '<h3>删除商品类型，将不能恢复！</h3><h4>是否继续删除？</h4><hr/>'
							+ '<div class="ngdialog-buttons">'
							+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>'
							+ '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button></div>',
							plain: true,
							scope: $scope,
							closeByEscape: false
						})
					.then(
						function () {
							$(".loading-container").addClass(
								"loading-inactive");
							// $http({method: 'post', url: baseUrl + 'catagory/deleteCatagory.do', data: catagory})
							$http.post(baseUrl+'catagory/deleteCatagory.do',catagoryDel)
								.success(
									function (data) {
										$(
											".loading-container")
											.addClass(
												"loading-inactive");
										if (data) {
											if (data.serviceResult == true) {
												angular
													.forEach(
														$scope.productTypeList,
														function (item) {
															if (catagory.catagoryid == item.catagoryid) {
																$scope.productTypeList
																	.splice(
																		item,
																		1);
															}
														})
												$scope.findAllProductType();
											} else {
												$window.location.href = "AdminLogin.html";
											}
										} else {
											alert("数据库连接失败,请联系技术工程师.");
										}
									})
								.error(
									function (data) {
										$(
											".loading-container")
											.addClass(
												"loading-inactive");
									});
						});

			}
			// 添加产品类型添加
			$scope.addProductType = function () {
				var productType = new CataGoryVo();
				var a = [];
				angular.forEach($scope.productTypeList, function (item) {
					a.push(item.catagoryid);
				})
				productType.catagoryname = '';
				productType.isnew = true;
				productType.isadd = true;
				$scope.productTypeList.push(productType);

			}
			// 保存产品类型
			$scope.saveProductType = function (productType, index) {
				var po = new CataGoryVo();
				po.catagoryid = productType.catagoryid;
				po.catagoryname = productType.catagoryname;
				if (po.catagoryname != "") {
					productType.isnew = false;
					if (productType.isadd == true) {
						$http({method: 'post', url: baseUrl + 'catagory/addCatagory.do', data: po})
							.success(
								function (data) {
									$(".loading-container")
										.addClass(
											"loading-inactive");
									if (data) {
										if (data.serviceResult == true && data.resultInfo == 200) {
											$scope.productTypeList[index].catagoryid = data.resultParm.producttype.catagoryid;
										} else if (data.serviceResult == true && data.resultInfo == 42001) {
											$scope.productTypeList.splice(index,1);
											ngDialog
												.openConfirm({
													template: '<h3>商品类型名称不能重复</h3><hr/>'
													+ '<div class="ngdialog-buttons">'
													+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">取消</button></div>',
													plain: true,
													scope: $scope,
													closeByEscape: false
												})
										}
										else {
											$window.location.href = "AdminLogin.html";
										}
									} else {
										alert("数据库连接失败,请联系技术工程师.");
									}
								})
							.error(
								function (data) {
									$(".loading-container")
										.addClass(
											"loading-inactive");
								});
					} else {
						$http({method: 'post', url: baseUrl + 'catagory/editCatagory.do', data: po})
							.success(
								function (data) {
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
								function (data) {
									$(".loading-container")
										.addClass(
											"loading-inactive");
								});
					}
				} else {
					ngDialog
						.openConfirm({
							template: '<h3>商品类型名称不能为空</h3><hr/>'
							+ '<div class="ngdialog-buttons">'
							+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">取消</button></div>',
							plain: true,
							scope: $scope,
							closeByEscape: false
						})
				}
			}
			$scope.tempArray = new Array();
			// 取消产品添加
			$scope.cancelProductType = function (productType, index) {
				if (productType.isedit == true) {
					var productType2 = $scope.tempArray[productType.tempindex]
					productType.catagoryname = productType2.catagoryname;
					productType.isnew = false;
					productType.isedit = false;
				} else {
					$scope.productTypeList.splice(index, 1);
				}
			}

			$scope.selectProductType = function(productType) {
				for(var i=0;i<$scope.productTypeList.length;i++){
					var type = $scope.productTypeList[i];
					if(type.catagoryname==productType.catagoryname){
						type.isselected = true;
					}else{
						type.isselected = false;
					}
				}
			}

			// 编辑用户产品类型
			$scope.editProductType = function (productType) {
				var tmp = new CataGoryVo();
				productType.isnew = true;
				productType.isedit = true;
				for (var p in productType) {
					// 属性
					if (typeof (productType[p]) != " function ") {
						tmp[p] = productType[p];
					}
				} // 最后显示所有的属性
				$scope.tempArray.push(tmp);
				productType.tempindex = $scope.tempArray.length - 1;
			}

			// 完成选择
			$scope.finish = function () {
				$scope.tempFinishArray = new Array();
				angular.forEach($scope.productTypeList, function (item) {
					if (item.isselected == true) {
						$scope.tempFinishArray.push(item);
					}
				});
				if($scope.tempFinishArray.length>0){
					$scope.goodsVo.catagoryname = $scope.tempFinishArray[0].catagoryname;
					$scope.goodsVo.catagoryid = $scope.tempFinishArray[0].catagoryid;
				}
				localStoragePut("goodsVo", $scope.goodsVo);
				console.log("goodsvoType",$scope.goodsVo);
				$window.location.href = "#/addgoods";
			}
			$scope.goback = function () {
				$window.location.href = "#/addgoods";
			}

		});