/**
 * 所有过滤器.
 */
var filters = angular.module('chldFilters', []);

/**
 * 左侧菜单filter.
 */
filters.filter('childrenfilter', function() {
	return function(input, parentid) {
		var array = [];
		for (var i = 0; i < input.length; i++) {
			if (input[i].menuitemparentid == parentid) {
				array.push(input[i]);
			}
		}
		return array;
	}
});