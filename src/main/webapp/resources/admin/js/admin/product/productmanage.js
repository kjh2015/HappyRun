/**
 * 产品控制器.
 */
chldControllers.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    new Swiper('.swiper-container', {
                        direction: 'horizontal',
                        loop: true,
                        pagination: '.swiper-pagination',
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        width: 250,
                        height: 250
                    });
                });
            }
        }
    };
});

chldControllers
    .controller(
        'goodsmanagerctrl',
        function ($scope, $http, $window, ngDialog) {
            $scope.page = new Pagination();
            $scope.page.pageSize = 5;
            $scope.page.startPage = 1;
            $scope.imgArr = [];
            $scope.order = "false";
            $scope.sortFieldNme = "editeTime";
            $scope.orderclass = "sorting_asc";
            $scope.searchproduct = new GoodsVo();
            $scope.countindex = 0;
            $scope.count = 1;
            $scope.keyword = "";
            // 定义一个变量记录搜索关键字
            $scope.recordkeyword = "";
            $scope.recordproductname = "";
            $scope.recordproducttypes = "";

            $scope.pageProduct = function () {
                $(".loading-container").removeClass("loading-inactive");
                var url = baseUrl2 + "/goods/findAllGoods.do";
                $http({method: "post", url: url, data: $scope.page&$scope.searchproduct})
                    .success(
                        function (data) {
                            $(".loading-container").addClass(
                                "loading-inactive");
                            if (data) {
                                if (data.serviceResult == true) {
                                    $scope.products = data.resultParm.goodsList;
                                    $scope.page.totalCount = data.resultParm.totalCount;
                                    angular.forEach($scope.products, function (data) {
                                        data.flag = false;
                                        if (typeof data.images != 'undefined'
                                            && data.images != null) {
                                            data.imgArr = data.images.split(",");
                                            angular.forEach(data.imgArr, function (img, index) {
                                                data.imgArr[index] = baseUrl2 + "/resources" + img;
                                            })
                                        } else {
                                            data.imgArr = [baseUrl2 + "/resources/upload/product/1be73a45-09bc-478d-b1a2-c6aa41922dba.jpg"];
                                        }
                                    })
                                    console.log("products", $scope.products);
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
                                            / $scope.page.pageSize);

                                    var options = {
                                        bootstrapMajorVersion: 3,
                                        currentPage: $scope.page.startPage,
                                        numberOfPages: $scope.page.pageSize,
                                        totalPages: totalPages,
                                        onPageClicked: function (event,
                                                                 originalEvent,
                                                                 type, page) { // 异步换页
                                            $scope.page.startPage = page;
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
                    function (data) {
                        $(".loading-container").addClass(
                            "loading-inactive");
                    });
            }

            $scope.pageProduct();


            $scope.toaddproduct = function () {
                $window.location.href = "#/addgoods";
            }

            $scope.preEditProduct = function (id) {
                localStoragePut("editproductid", id);
                $window.location.href = "#/editproduct";
            }

            $scope.myKeyup = function (e) {
                var keycode = window.event ? e.keyCode : e.which;
                if (keycode == 13) {
                    if ($scope.recordkeyword != $scope.keyword
                        || $scope.recordproductname != $scope.searchproduct.productname
                        || $scope.recordproducttypes != $scope.searchproduct.producttypenames) {
                        $scope.pageProduct();
                    }
                }
            };


            $scope.deleteProduct = function (product) {
                ngDialog
                    .openConfirm(
                        {
                            template: '<h3>删除产品，将不能恢复！</h3><h4>是否继续删除？</h4><hr/>'
                            + '<div class="ngdialog-buttons">'
                            + '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>'
                            + '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button></div>',
                            plain: true,
                            scope: $scope,
                            closeByEscape: false
                        })
                    .then(
                        function () {
                            var productfordel = new GoodsVo();
                            productfordel.goodsid = product.goodsid;
                          $http({method:'post',url:baseUrl2+"/goods/deleteGoods.do",data:productfordel})
                                .success(
                                    function (data) {
                                        $(
                                            ".loading-container")
                                            .addClass(
                                                "loading-inactive");
                                        if (data) {
                                            if (data.serviceResult == true) {
                                                ngDialog
                                                    .openConfirm(
                                                        {
                                                            template: '<h3>删除商品成功!</h3><hr/>'
                                                            + '<div class="ngdialog-buttons">'
                                                            + '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
                                                            plain: true,
                                                            scope: $scope,
                                                            closeByEscape: false
                                                        })
                                                $scope
                                                    .pageProduct();
                                            } else {
                                                $window.location.href = "#/product";
                                            }
                                        } else {
                                            alert("数据库连接失败，请联系技术工程师");
                                        }
                                    })
                                .error(function (data) {
                                    alert("删除产品失败");
                                });
                        });

            }
        }
    )
