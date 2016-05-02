/**
 * 修改角色控制器.
 */
chldControllers
    .controller(
        'editproductctrl',
        function ($scope, $http, $window, ngDialog, Upload, $timeout) {
            $scope.imageList = new Array();
            $scope.imageListCopy = [];
            $scope.uploadURLList = new Array();
            $scope.fileList = new Array();
            $scope.goodsVo = localStorageGet("goodsVo");
            var id = localStorageGet("editproductid", true);

            $scope.getProductInfoById = function () {
                $http({method: 'post', url: baseUrl2 + '/goods/findGoodsById.do', data: id}).success(function (data) {
                    $scope.goodsVo = data.resultParm.goodsInfo;
                    if ($scope.goodsVo.images != 'undefined' && $scope.goodsVo.images != null) {
                        $scope.imageList = $scope.goodsVo.images.split(",");
                        console.log("imageList",$scope.imageList);
                        $scope.imageListCopy = $scope.imageList.concat();
                        angular.forEach($scope.imageList, function (data, index) {
                            $scope.imageList[index] = baseUrl2 + "/resources" + data;
                        })
                    }
                }).error(function (data) {
                    alert("失败");
                });
            }

            if ($scope.goodsVo == null) {
                $scope.getProductInfoById();
            }


            $scope.preEditProductType = function () {
                localStoragePut("goodsVo", $scope.goodsVo);
                $window.location.href = "#/editproducttype";
            }

            // 添加图片
            $scope.addImage = function (files) {
                if (files && files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        if (files[i]) {
                            $scope.fileList.push(files[i]);
                        }

                    }
                }
            }

            // 删除图片
            $scope.deleteImage = function (index) {
                $scope.imageList.splice(index, 1);
            }


            $scope.back = function () {
                window.location.href = "#/product";
            }


            $scope.editProduct = function () {
                if ($scope.fileList.length > 0) {
                    for (var i = 0; i < $scope.fileList.length; i++) {
                        Upload
                            .upload(
                                {
                                    url: baseUrl
                                    + 'upload//uploadFile.do',
                                    fields: {
                                        "noCache": Date()
                                    },
                                    file: $scope.fileList[i]
                                })
                            .progress(function (evt) {

                            })
                            .success(
                                function (data, status,
                                          headers, config) {
                                    if (data) {
                                        if (data.serviceResult == true) {
                                            $scope.uploadURLList
                                                .push(data.resultParm.fileName);
                                            if ($scope.uploadURLList.length == $scope.fileList.length) {
                                                angular.forEach($scope.uploadURLList, function (data, index) {
                                                    $scope.uploadURLList[index] = "/upload/product/" + data;
                                                })
                                                $scope.uploadURLList.push($scope.imageListCopy);
                                                $scope.goodsVo.images = $scope.uploadURLList
                                                    .join(',');
                                                //去掉最后一个","
                                                $scope.goodsVo.images = $scope.goodsVo.images.slice(0,$scope.goodsVo.images.lastIndexOf(","));
                                                $(
                                                    ".loading-container")
                                                    .removeClass(
                                                        "loading-inactive");
                                                $http.post(baseUrl + 'goods/editGoods.do', $scope.goodsVo)
                                                    .success(
                                                        function (data) {
                                                            $(
                                                                ".loading-container")
                                                                .addClass(
                                                                    "loading-inactive");
                                                            if (data) {
                                                                if (data.serviceResult == true) {
                                                                    window.location.href = "#/goodsmanager";
                                                                } else {
                                                                    ngDialog
                                                                        .openConfirm(
                                                                            {
                                                                                template: '<h3>'
                                                                                + '修改商品信息失败'
                                                                                + '</h3><hr/>'
                                                                                + '<div class="ngdialog-buttons">'
                                                                                + '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
                                                                                plain: true,
                                                                                scope: $scope,
                                                                                closeByEscape: false
                                                                            })
                                                                        .then(
                                                                            function () {
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
                                                        function (data) {
                                                            $(
                                                                ".loading-container")
                                                                .addClass(
                                                                    "loading-inactive");
                                                        });

                                            }

                                        } else {
                                            ngDialog
                                                .openConfirm(
                                                    {
                                                        template: '<h3>'
                                                        + '上传图片失败'
                                                        + '</h3><hr/>'
                                                        + '<div class="ngdialog-buttons">'
                                                        + '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
                                                        plain: true,
                                                        scope: $scope,
                                                        closeByEscape: false
                                                    })
                                        }
                                    } else {
                                        alert("数据库连接失败，请联系技术工程师");
                                    }
                                });
                    }

                } else {
                    $(".loading-container").removeClass(
                        "loading-inactive");
                    $http.post(baseUrl + 'goods/editGoods.do', $scope.goodsVo)
                        .success(
                            function (data) {
                                $(".loading-container")
                                    .addClass(
                                        "loading-inactive");
                                if (data) {
                                    if (data.serviceResult == true) {
                                        window.location.href = "#/goodsmanager";
                                    } else {
                                        ngDialog
                                            .openConfirm(
                                                {
                                                    template: '<h3>'
                                                    + '修改商品信息失败'
                                                    + '</h3><hr/>'
                                                    + '<div class="ngdialog-buttons">'
                                                    + '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
                                                    plain: true,
                                                    scope: $scope,
                                                    closeByEscape: false
                                                })
                                            .then(
                                                function () {
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
                            function (data) {
                                $(".loading-container")
                                    .addClass(
                                        "loading-inactive");
                            });
                }
            }


        });