'use strict';


/**
 * Version Controller
 */
function versionCtrl ($rootScope, $scope)
{
	/**
	 * Turn off html parts
	 */
	$('body').css({ background: 'none' });
	$('.navbar').css({ display: 'none' });
	$('#watermark').css({ display: 'none' });
	$('#footer').css({ display: 'none' });

};


versionCtrl.$inject = ['$rootScope', '$scope'];