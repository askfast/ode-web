'use strict';

/* Other Controllers */

function StrapCtrl($scope)
{
	$scope.dropdown = [
		{text: 'Another action', href: '#anotherAction'},
		{text: 'Something else here', href: '#', click: 'modal.saved=true'},
		{divider: true},
		{text: 'Separated link', href: '#',
			submenu: [
				{text: 'Second level link', href: '#'},
				{text: 'Second level link 2', href: '#'}
			]
		}
	];
	$scope.formattedDropdown = "[\n  {text: 'Another action', href:'#anotherAction'},\n  {text: 'Another action', href:'#anotherAction'},\n  {divider: true},\n  {text: 'Separated link', href:'#', submenu: [\n    {text: 'Second level link', href: '#'},\n    {text: 'Second level link 2', href: '#'}\n  ]}\n]";
	$scope.modal = {content: 'Hello Modal', saved: false};
	$scope.tooltip = {title: "Hello Tooltip<br />This is a multiline message!"};
	$scope.popover = {content: "Hello Popover<br />This is a multiline message!", saved: false};
	$scope.button = {active: true};
	$scope.buttonSelect = {price: '89,99', currency: '€'};
	$scope.checkbox = {left: false, middle: true, right: false};
	$scope.typeahead = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
	$scope.datepicker = {date: ''};
	$scope.timepicker = {time: '01:45 PM'};	
}
StrapCtrl.$inject = ['$scope'];
