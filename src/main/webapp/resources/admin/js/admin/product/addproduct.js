/**
 * 添加产品控制器.
 */
chldControllers
    .controller(
        'addproductctrl',
        function ($scope, $http, $window, ngDialog, Upload, $timeout) {
            $scope.imageList = new Array();
            $scope.uploadURLList = new Array();
            $scope.fileList = new Array();
            $scope.goodsVo = localStorageGet("goodsVo", true);
            console.log("goodsVoAdd", $scope.goodsVo);
            if ($scope.goodsVo == null) {
                $scope.goodsVo = new GoodsVo();
            }
            // $scope.goodsVo = localStorageGet("goodsVo", true);
            $scope.tempArr = [];


            $scope.preEditProductType = function () {
                localStoragePut("goodsVo", $scope.goodsVo);
                $window.location.href = "#/addproducttype";
            }

            // 添加图片
            $scope.addImage = function (files) {
                console.log(files);
                if (files && files.length > 0) {
                    for (var i = 0; i < files.length; i++) {
                        if (files[i]) {
                            $scope.fileList.push(files[i]);
                        }
                    }
                }
            }

            // 删除图片
            $scope.deleteAddImage = function (index) {
                $scope.fileList.splice(index, 1);
            }
            // 返回
            // $scope.selectChange = function () {
            //     $scope.goodsVo.currencyid = $scope.currencySelected.currencyid;
            //     $scope.goodsVo.currency = $scope.currencySelected.currency;
            //     $scope.check();
            // }
            $scope.back = function () {
                window.location.href = "#/product";
            }


            $scope.addProduct = function () {
                console.log("addGoods", $scope.goodsVo);
                if (typeof $scope.goodsVo.catagoryid == 'undefined' || typeof $scope.goodsVo.catagoryname == 'undefined' || $scope.goodsVo.catagoryid == null || $scope.goodsVo.catagoryname == null) {
                    ngDialog
                        .openConfirm(
                            {
                                template: '<h3>'
                                + '产品类型不能为空'
                                + '</h3><hr/>'
                                + '<div class="ngdialog-buttons">'
                                + '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
                                plain: true,
                                scope: $scope,
                                closeByEscape: false
                            })
                } else {
                    if ($scope.fileList.length > 0) {
                        for (var i = 0; i < $scope.fileList.length; i++) {
                            Upload.upload({
                                method: "post",
                                url: baseUrl + "/upload/uploadFile.do",
                                headers: {'Content-Type': 'multipasrt/form-data'},
                                file: $scope.fileList[i]
                            }).success(function (data) {
                                if (data.serviceResult == true) {
                                    $scope.uploadURLList.push("/upload/product/" + data.resultParm.fileName);
                                    if ($scope.uploadURLList.length == $scope.fileList.length) {
                                        $scope.goodsVo.images = $scope.uploadURLList.join(",");
                                        //去掉最后一个","
                                        $scope.goodsVo.images.slice(0, $scope.goodsVo.images.lastIndexOf(","));
                                        $http({
                                            method: "post",
                                            url: baseUrl + "goods/addGoods.do",
                                            data: $scope.goodsVo
                                        })
                                            .success(function (data) {
                                                window.location.href = "#/goodsmanager";
                                            }).error(function (error) {
                                            alert("失败");
                                        })
                                    }
                                }

                            })
                        }
                    } else {
                        $http({method: "post", url: baseUrl + "goods/addGoods.do", data: $scope.goodsVo})
                            .success(function (data) {
                                window.location.href = "#/goodsmanager";
                            }).error(function (error) {
                            alert("失败");
                        })
                    }
                }


            }


        });