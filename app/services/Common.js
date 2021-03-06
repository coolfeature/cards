var module = angular.module('cards.services.Common',[]);

module.service('CommonService', ['$cookies',function ($cookies) {

	var Service = {};

	Service.init = function () {
		var sid = $cookies.get('SID');
		var tsid = $cookies.get('TSID');
		if (sid == undefined) {
			$cookies.put('SID',tsid);
    			this.SID = tsid;
  		} else {
			this.SID = sid;
 		}
        	this.BULLET = { 
			TIMEOUT : 60000
			,PATH : "/bullet"
		};
	        var origin = window.location.origin;
		this.BULLET.URL = origin.replace("http","ws").replace("https","wss") 
			+ this.BULLET.PATH + "/" + this.SID;
  		console.log("Bullet URL: ", this.BULLET.URL);
	}

	Service.init();



	Service.text = {
		fonts : [
			{ name : "arial black", style: { fontFamily : "arial black" } }
			,{ name : "Aaargh", style: { fontFamily : "Aaargh" } }
			,{ name : "Veeeeeeeeeeeeeeeeeeeeeeeeeryyy long name", style: { fontFamily : "Aaargh" } }
		]
		,fontSizes : [
			8,10,12,14,16,18,20,24,26,28,30,34,38,42,46,50
		]
		,fontStyles : [
			"", "italic", "normal", "oblique"
		]
		,fontWeights : [
			"", "bold", "normal"
		]
		,textDecorations : [
			"", "underline", "overline", "line-through"
		]
		,textAligns : [
			"left", "center", "right", "justified"
		]
	}
	
	Service.CONSTANTS = {
		TOKEN_KEY : "TOKEN"
		,USER_INFO_KEY : "USER_INFO"
		,STORAGE_EXPIRY_DAYS : 7
		,EMPTY_ARRAY : []
		,EMPTY_STRING : ""
		,DEFAULT_COLOUR : "#ffffff"
		,FABRIC_CANVAS : {
			DEFAULT_BCKG_COLOUR : "#ffffff"
			,DEFAULT_TEXT_BCKG_COLOUR : ""
			,DEFAULT_FONT_COLOUR : "#9dd06c"
			,DEFAULT_STROKE_COLOUR : ""
			,DEFAULT_FONT_SIZE : 15
			,DEFAULT_FONT_STYLE : ""
			,DEFAULT_TEXT_ALIGN : "left"
			,TEXT_BOLD_INDEX : 1
			,TEXT_ITALIC_INDEX : 1
			,DEFAULT_SHADOW_COLOUR : 'rgba(195,212,173,1)'
			,SHADOW_RANGE_MIN : 0
			,SHADOW_RANGE_MAX : 60
			,SHADOW_RANGE_STEP : 1
			,DEFAULT_LINE_HEIGHT : 1
			,LINE_HEIGHT_RANGE_STEP : 0.25
			,TEXT_DECORATION_STRIKETHROUGH : "strikethrough"
			,ELEMENT_DROP_OFFSET : 13
		}
	}

	return Service;
}]);
