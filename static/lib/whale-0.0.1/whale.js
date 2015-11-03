/**
 * @author coolfeature
 */

var WHALE = WHALE || { REVISION: '1' };

//

if ( typeof define === 'function' && define.amd ) {
	define( 'whale', WHALE );
} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {
	module.exports = WHALE;
}

WHALE.HorizontallyFoldedCard = function (width,height,stretch) {
	
	THREE.Geometry.call( this );
	
	this.type = 'HorizontallyFoldedCard';
	this.sides = 4;
	this.width = width || 200;
	this.height = height || 100;
	this.stretch = stretch || 100;

	this.getMaterialSize = function (material) {
		return { x: width, y: height }
	};
	
	this.BUILD_STATE = { vertices : [] };
	
	var scope = this; // this in build() is different so we need a global var
	
	var width_half = this.width / 2;
	var height_full = this.height;
	var stretch_half = this.stretch / 2;
	
	build();
	
	function build() {
		
		var getColour = function () {
			return Math.random() * 0xffffff;
		}

		// https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/BoxGeometry.js
		// http://threejs.org/docs/#Reference/Core/Face3
		
		// https://github.com/mrdoob/three.js/issues/1741
		// http://stackoverflow.com/questions/17293290/three-js-geometry-facevertexuvs00index-is-not-the-same-as-geometry-verti
		
		// http://stackoverflow.com/questions/21462851/flip-normals-in-three-js-on-sphere
		// http://paulyg.f2s.com/uv.htm
		
		var frontLeftLowerCorner = new THREE.Vector3(-width_half, 0, stretch_half) // front left lower corner
		var frontRightLowerCorner = new THREE.Vector3(width_half, 0, stretch_half) // front right lower corner
		var frontRightUpperCorner = new THREE.Vector3(width_half, height_full, 0)  // front right upper corner
		var frontLeftUpperCorner = new THREE.Vector3(-width_half, height_full, 0) // front left upper corner

		var backLeftLowerCorner = new THREE.Vector3(width_half, 0, -stretch_half) // back left lower corner
		var backRightLowerCorner = new THREE.Vector3(-width_half, 0, -stretch_half) // back right lower corner
		var backRightUpperCorner = new THREE.Vector3(-width_half, height_full, 0)  // back right upper corner
		var backLeftUpperCorner = new THREE.Vector3(width_half, height_full, 0) // back left upper corner	
		
		scope.vertices.push(frontLeftLowerCorner);	scope.BUILD_STATE.vertices.push(frontLeftLowerCorner.clone());
		scope.vertices.push(frontRightLowerCorner);	scope.BUILD_STATE.vertices.push(frontRightLowerCorner.clone());
		scope.vertices.push(frontRightUpperCorner);	scope.BUILD_STATE.vertices.push(frontRightUpperCorner.clone());
		scope.vertices.push(frontLeftUpperCorner);	scope.BUILD_STATE.vertices.push(frontLeftUpperCorner.clone());
		
		scope.vertices.push(backLeftLowerCorner);	scope.BUILD_STATE.vertices.push(backLeftLowerCorner.clone());
		scope.vertices.push(backRightLowerCorner);	scope.BUILD_STATE.vertices.push(backRightLowerCorner.clone());
		scope.vertices.push(backRightUpperCorner);	scope.BUILD_STATE.vertices.push(backRightUpperCorner.clone());
		scope.vertices.push(backLeftUpperCorner);	scope.BUILD_STATE.vertices.push(backLeftUpperCorner.clone());
		
		scope.faces = [
			// front front
			new THREE.Face3( 0, 1, 2, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )
			,new THREE.Face3( 0, 2, 3, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 0 )
			// front back
			,new THREE.Face3( 2, 1, 0, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )
			,new THREE.Face3( 3, 2, 0, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 1 )
			
			// back front
			,new THREE.Face3( 4, 5, 6, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )
			,new THREE.Face3( 4, 6, 7, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 2 )
			// back back
			,new THREE.Face3( 6, 5, 4, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 3 )
			,new THREE.Face3( 7, 6, 4, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 3 )
		]

		scope.faceVertexUvs[ 0 ] = [
			// front front side
			[ new THREE.Vector2( 0, 0),new THREE.Vector2( 1, 0 ),new THREE.Vector2( 1, 1 ) ]
			,[ new THREE.Vector2( 0, 0),new THREE.Vector2( 1, 1 ),new THREE.Vector2( 0, 1 ) ]
			// front back side
			,[ new THREE.Vector2( 1, 1),new THREE.Vector2( 1, 0 ),new THREE.Vector2( 0, 0 ) ]
			,[ new THREE.Vector2( 0, 1),new THREE.Vector2( 1, 1 ),new THREE.Vector2( 0, 0 ) ]
			// back front side
			,[ new THREE.Vector2( 0, 0),new THREE.Vector2( 1, 0 ),new THREE.Vector2( 1, 1 ) ]
			,[ new THREE.Vector2( 0, 0),new THREE.Vector2( 1, 1 ),new THREE.Vector2( 0, 1 ) ]
			// back back side
			,[ new THREE.Vector2( 1, 1),new THREE.Vector2( 1, 0 ),new THREE.Vector2( 0, 0 ) ]
			,[ new THREE.Vector2( 0, 1),new THREE.Vector2( 1, 1 ),new THREE.Vector2( 0, 0 ) ]
		] ;
		
		/**
		* http://stackoverflow.com/questions/23052306/what-is-the-meaning-of-skin-indices-and-skin-weights
		* http://threejs.org/docs/#Reference/Objects/SkinnedMesh
		* Canvas renderer does not support skinning
		
		scope.skinIndices = [
			// all vertices from Front Fornt Side  and Front Back Side belong to bone 1 
			new THREE.Vector4(   0,   5,   9, 0 )
		];
		
		scope.skinWeights = [
			new THREE.Vector4( 0.2, 0.5, 0.3, 0 )
		];
		*/
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		scope.mergeVertices();
		
		console.log(scope.type,scope);
		//console.log("JSON GEOMETRY:",scope.toJSON());
	}

};

WHALE.HorizontallyFoldedCard.prototype = Object.create( THREE.Geometry.prototype );
WHALE.HorizontallyFoldedCard.prototype.constructor = WHALE.HorizontallyFoldedCard;

WHALE.HorizontallyFoldedCard.prototype.reset = function () {
	var i;
	for(i=0;i<this.BUILD_STATE.vertices.length;i++) {
		var originalVertex = this.BUILD_STATE.vertices[i].clone()
		this.vertices[i] = originalVertex;
	}
}

WHALE.HorizontallyFoldedCard.prototype.play = function () {
	this.vertices[0].z = this.vertices[0].z + 1;
	this.vertices[0].y = this.vertices[0].y + 1;
	this.vertices[1].y = this.vertices[1].y + 1;
	this.vertices[1].z = this.vertices[1].z + 1;
}

