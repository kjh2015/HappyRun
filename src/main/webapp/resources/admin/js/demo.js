var demo = angular.module('app', []);
demo.controller('myCtrl', function ($http, $scope) {
    $scope.page = new Pagination();
    $scope.page.startPage = 1;
    $scope.page.pageSize = 5;
    $scope.pageUser = function () {
        $http({
                url: '/happyRun/user/pageUser.do',
                method: 'POST',
                data: $scope.page
            })
        // $http.post('/happyRun/user/pageUser.do',$scope.page)
        .success(function (data) {
            $scope.page = data.resultParm.pageInfo;
            $scope.userList = data.resultParm.pageInfo.pageList;
            var element = $('#page');
            var totalPages = Math.ceil($scope.page.totalCount / $scope.page.pageSize);
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
                        .pageUser();
                }
            }
            element
                .bootstrapPaginator(options);
        }).error(function (data) {
            alert("失败");
        })
    }
    $scope.pageUser();
});