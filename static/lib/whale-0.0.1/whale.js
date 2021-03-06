/**
 * @author coolfeature
 * @todo implement inheritance
 */

var WHALE = WHALE || { REVISION: '1' };

if ( typeof define === 'function' && define.amd ) {
	define( 'whale', WHALE );
} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {
	module.exports = WHALE;
}

WHALE.makeTextSprite = function makeTextSprite( message, side, parameters ) {
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 1;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
		
	var scale = parameters.hasOwnProperty("scale") ?
		parameters["scale"] : { x : 100, y : 100, z : 1.0 };

		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	var fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
	var strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
	
	var r = textWidth / 4;
	
	canvas.width = textWidth + ( borderThickness * 2 );
	canvas.height = canvas.width;
	circle(context, canvas.width / 2, canvas.height / 2, r, borderThickness, fillStyle, strokeStyle);
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";
	context.textAlign = 'center';
	context.fillText( message, canvas.width / 2, (canvas.height / 2) + (borderThickness * 2) ) ;
	
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( { map: texture } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set( scale.x, scale.y, scale.z );
	sprite['materialIndex'] = side;
	sprite['whaleType'] = 'SpriteLabel';
	return sprite;	
}

function circle(ctx, x, y, r, lineWidth, fillStyle, strokeStyle) {
	ctx.beginPath();
	/**
	* x	The x-coordinate of the center of the circle
	* y	The y-coordinate of the center of the circle
	* r	The radius of the circle
	* sAngle	The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)	
	* eAngle	The ending angle, in radians
	* counterclockwise	Optional. False is default, and indicates clockwise, while true indicates counter-clockwise.
	*/
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx.fillStyle = fillStyle;
	ctx.fill();
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = strokeStyle;
	ctx.stroke();
}

// ============================================================================
// =============================== BaseGeometry ===============================
// ============================================================================

WHALE.BaseGeometry = function (width,height) {
	this.type = 'BaseGeometry';
	this.width = width || 200;
	this.height = height || 100;
	THREE.Geometry.call( this );
}
WHALE.BaseGeometry.prototype = Object.create( THREE.Geometry.prototype );
WHALE.BaseGeometry.prototype.constructor = WHALE.BaseGeometry;
WHALE.BaseGeometry.prototype.print = function () { console.log(this.type,this); };
WHALE.BaseGeometry.prototype.play = function() { console.log(this.type,"play() = Not implemented"); };
WHALE.BaseGeometry.prototype.getMaterialSize = function() { console.log(this.type,"getMaterialSize() - Not implemented"); };
WHALE.BaseGeometry.prototype.reset = function() { console.log(this.type,"reset() - Not implemented"); };
WHALE.BaseGeometry.prototype.destroy = function() { console.log(this.type,"destroy() = Not implemented"); };

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

WHALE.Detector = {

	canvas: !! window.CanvasRenderingContext2D
	,webgl: ( function () {

		try {

			var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

		} catch ( e ) {

			return false;

		}

	} )()
	,workers: !! window.Worker
	,fileapi: window.File && window.FileReader && window.FileList && window.Blob

	,getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}
		return element;
	}

	,addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}
};


