var module = angular.module('cards.controllers.Text',[]);

module.controller('TextController', ['$scope','DisplayService','CommonService'
	,'UtilsService',function ($scope,DisplayService,CommonService,UtilsService) {

	// ------------------------------------------------------------------------
	// ---------------------------- TEXT EDITING ------------------------------
	// ------------------------------------------------------------------------

	$scope.fonts = CommonService.text.fonts;
	$scope.fontSizes = CommonService.text.fontSizes;
	
	$scope.text = {
		font : $scope.fonts[0]
		,fontSize : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_SIZE
		,fontStyle : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_STYLE
		,fontColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_FONT_COLOUR
		,strokeColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_STROKE_COLOUR
		,bgColour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_TEXT_BCKG_COLOUR
		,fontWeight : CommonService.CONSTANTS.EMPTY_STRING
		,textDecoration : []
		,align : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_TEXT_ALIGN
		,lineHeight : {
			value :  CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_LINE_HEIGHT
			,range : { 
				min : CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MIN
				,max : CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MAX
				,step : CommonService.CONSTANTS.FABRIC_CANVAS.LINE_HEIGHT_RANGE_STEP
			} 
		}
		,shadow : {
			value : CommonService.CONSTANTS.EMPTY_STRING
			,properties : {	
				colour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_SHADOW_COLOUR
				,blur : 3
				,h : ((CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MIN 
					+ CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MAX) / 2) + 3
				,v : ((CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MIN 
					+ CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MAX) / 2) + 3
			}
			,range : { 
				min : CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MIN
				,max : CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MAX
				,step : CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_STEP
			} 
		}
		,stroke : {
			colour : CommonService.CONSTANTS.FABRIC_CANVAS.DEFAULT_SHADOW_COLOUR
			,width : ((CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MIN 
					+ CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MAX) / 2) + 3
			,range : { 
				min : CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MIN
				,max : CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MAX
				,step : CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_STEP
			} 
		}
		,toggles : {
			bold : false
			,italic : false
			,underline : false
			,strikethrough : false
			,overline : false
			,shadow : false
			,stroke : false
			,lineHeight : false
		}
	}
	
	$scope.write = function () {
		$scope.text.textDecoration = [];
		var textItem = new fabric.IText('Tap and Type', { 
			fontFamily: $scope.text.font.name
			,fontStyle : $scope.text.fontStyle
			,fontWeight : $scope.text.fontWeight
			,textDecoration : $scope.text.textDecoration
			,textBackgroundColor : $scope.text.bgColour
			,textAlign : $scope.text.align
			,lineHeight : $scope.text.lineHeight.value
			,fill : $scope.text.fontColour
			,shadow : $scope.text.shadow.value
			,left: CommonService.CONSTANTS.FABRIC_CANVAS.ELEMENT_DROP_OFFSET 
			,top: CommonService.CONSTANTS.FABRIC_CANVAS.ELEMENT_DROP_OFFSET  
		})
		DisplayService.editingCanvas.add(textItem);
	}
	
	$scope.selectedTextFont = function (font) {
		$scope.text.font = font;
	}

	$scope.selectedTextFontSize = function (size) {
		$scope.text.fontSize = size;
	}
	
	$scope.toggleTextWeight = function (what) {
		$scope.text.toggles[what] = !$scope.text.toggles[what];
		if ($scope.text.toggles[what]) {
			$scope.text.fontWeight = what;
		} else {
			$scope.text.fontWeight = CommonService.CONSTANTS.EMPTY_STRING;
		}
	}
	
	$scope.toggleTextStyle = function (what) {
		$scope.text.toggles[what] = !$scope.text.toggles[what];
		if ($scope.text.toggles[what]) {
			$scope.text.fontStyle = what;
		} else {
			$scope.text.fontStyle = CommonService.CONSTANTS.EMPTY_STRING;
		}
	}
	
	
	$scope.toggleTextDecoration = function (what) {
		$scope.text.toggles[what] = !$scope.text.toggles[what];
		if (what === CommonService.CONSTANTS.FABRIC_CANVAS.TEXT_DECORATION_STRIKETHROUGH) {
			what = CommonService.text.textDecorations[3];
		}
		var i = $scope.text.textDecoration.indexOf(what);
		if (i == -1) {
			$scope.text.textDecoration.push(what);
		} else {
			$scope.text.textDecoration.splice(i,1);
		}
	}

	$scope.toggleTextLineHeight = function () {
		$scope.toggle('lineHeight');
	}
	
	// ------------------------------------------------------------------------
	$scope.textChangeUpdate = function (prop,val) {
		var selected = DisplayService.getSelectedEditingElements();
		if (selected.length != 0) {
			var i;
			for (i=0;i<selected.length;i++) {
				if (selected[i] instanceof fabric.IText) {
					selected[i][prop] = val;
					DisplayService.editingCanvas.renderAll();
				}
			}
		}
	}
	
	$scope.$watch(function () {return DisplayService.activeObject}, function () {
		if (DisplayService.activeObject instanceof fabric.IText) {
			$scope.text.textDecoration = DisplayService.activeObject.textDecoration;
		} 
	});
	
	
	$scope.$watch(function(){return $scope.text.font}, function() {
		$scope.textChangeUpdate('fontFamily',$scope.text.font.name);
    },true);

	$scope.$watch(function(){return $scope.text.fontSize}, function() {
		$scope.textChangeUpdate('fontSize',$scope.text.fontSize);
    },true);
	
	$scope.$watch(function(){return $scope.text.fontStyle}, function() {
		$scope.textChangeUpdate('fontStyle',$scope.text.fontStyle);
    },true);
	
	$scope.$watch(function(){return $scope.text.fontWeight}, function() {
		$scope.textChangeUpdate('fontWeight',$scope.text.fontWeight);
    },true);
	
	$scope.$watch(function(){return $scope.text.textDecoration}, function() {
		$scope.textChangeUpdate('textDecoration',$scope.text.textDecoration);
    },true);
	
	$scope.$watch(function(){return $scope.text.bgColour}, function() {
		$scope.textChangeUpdate('textBackgroundColor',$scope.text.bgColour);
    },true);
	
	$scope.$watch(function(){return $scope.text.fontColour}, function() {
		$scope.textChangeUpdate('fill',$scope.text.fontColour);
    },true);
	
	$scope.$watch(function(){return $scope.text.align}, function() {
		$scope.textChangeUpdate('textAlign',$scope.text.align);
    },true);
	
	$scope.$watch(function(){return $scope.text.lineHeight.value}, function() {
		$scope.textChangeUpdate('lineHeight',$scope.text.lineHeight.value);
    },true);
	// -------------------------------- SHADOW --------------------------------
	
	$scope.shadowValue = function () {
		var middle = (CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MIN + 
			CommonService.CONSTANTS.FABRIC_CANVAS.SHADOW_RANGE_MAX) / 2;
		var h = $scope.text.shadow.properties.h - middle;
		var v = $scope.text.shadow.properties.v - middle;	
		var val = $scope.text.shadow.properties.colour + " " + h  
			+ "px " + v
			+ "px " + $scope.text.shadow.properties.blur + "px"
		return new fabric.Shadow(val);
	}
	
	$scope.$watch(function(){return $scope.text.shadow.properties}, function() {
		if ($scope.text.toggles.shadow) {
			$scope.text.shadow.value = $scope.shadowValue();
			$scope.textChangeUpdate('shadow',$scope.text.shadow.value);
		}
    },true);
	
	$scope.toggleTextShadow = function () {
		$scope.toggle('shadow');
		if ($scope.text.toggles.shadow) {
			$scope.text.shadow.value = $scope.shadowValue();
		} else {
			$scope.text.shadow.value = CommonService.CONSTANTS.EMPTY_STRING;
		}
	}
	// -------------------------------- STROKE --------------------------------
	
	$scope.$watch(function(){return $scope.text.stroke.colour}, function() {
		if ($scope.text.toggles.stroke) {
			$scope.textChangeUpdate('stroke',$scope.text.stroke.colour);
		}
    },true);
	
	$scope.$watch(function(){return $scope.text.stroke.width}, function() {
		if ($scope.text.toggles.stroke) {
			$scope.textChangeUpdate('strokeWidth',$scope.text.stroke.width);
		}
    },true);
	
	$scope.toggleTextStroke = function () {
		$scope.toggle('stroke');
	}
	// ------------

	$scope.toggle = function(view) {
		for (var key in $scope.text.toggles) {
			if ($scope.text.toggles.hasOwnProperty(key)) {
				if (key !== view) {
					if ($scope.text.toggles[key] == true) {
						$scope.text.toggles[key] = false;
					}
				} else {
					$scope.text.toggles[key] = !$scope.text.toggles[key];
				}
			}
		}
	};

}]);
