// ============================================================================
// ======================== VerticallyCFoldedDLLeaflet ========================
// ============================================================================

/**
* Counting sides from 0 to 5. VerticalCFoldDLLeaflet has 6 visible sides. The 
* leaflet opens up to the left and unveils side 1 (first side back side) and 
* side 2 which unfolds to the right revealing the side 3 (third side back side) 
* and  side 4. Side 5 is on the reverse of side 4 .
*/

WHALE.VerticallyCFoldedDLLeaflet = function (width,height) {

	WHALE.BaseGeometry.call( this );
	
	this.type = 'VerticallyCFoldedDLLeaflet';
	this.sides = 6;
	this.width = width || 99;
	this.height = height || 210;
	
	this.cornerPush = function (push,leftPush) {
		var widthPita = Math.sqrt( Math.pow(width,2) - Math.pow(push,2) );
		if (leftPush) {
			var x = ( widthPita < width_half ) ? widthPita : ((Math.floor(widthPita) - width_half) *  -1);
		} else {
			var x = ( widthPita < width_half ) ? (widthPita* -1) : (Math.floor(widthPita) - width_half);
		}
		return { x : x, z: push };
	}
	
	
	var scope = this; // this in build() is different so we need a global var
	
	var width_half = this.width / 2;
	var height_full = this.height;
	
	this.BUILD_STATE = { vertices : [] };
	
	build();
	
	function build() {
		
		var leftZ = 70 ;
		var leftPush = scope.cornerPush(leftZ,true);
		var rightZ = 86;
		var rightPush = scope.cornerPush(rightZ,false);
		
		scope.vertices = [
			/**
			* SIDE 5/6 VERTICES
			*/
			new THREE.Vector3(-width_half, 0, 0) // 0 -- side 5 left lower corner 
			,new THREE.Vector3(width_half, 0, 0) // 1 -- side 5 right lower corner
			,new THREE.Vector3(width_half, height_full, 0)  // 2 -- side 5 right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // 3 -- side 5 left upper corner
			
			,new THREE.Vector3(-width_half, 0, 0) // 4 -- side 6 left lower corner
			,new THREE.Vector3(width_half, 0, 0) // 5 -- side 6 right lower corner
			,new THREE.Vector3(width_half, height_full, 0)  // 6 -- side 6 right upper corner
			,new THREE.Vector3(-width_half, height_full, 0) // 7 -- side 6 left upper corner

			/**
			* SIDE 3/4 VERTICES
			*/
			,new THREE.Vector3(leftPush.x, 0, leftPush.z) // 8 -- side 4 left lower corner
			,new THREE.Vector3(width_half, 0, 0) // 9 -- side 4 right lower corner
			,new THREE.Vector3(width_half, height_full, 0) // 10 -- side 4 right upper corner
			,new THREE.Vector3(leftPush.x, height_full, leftPush.z) // 11 -- side 4 left upper corner	
			
			,new THREE.Vector3(leftPush.x, 0, leftPush.z) // 12 -- side 3 left lower corner
			,new THREE.Vector3(width_half, 0, 0) // 13 -- side 3 right lower corner
			,new THREE.Vector3(width_half, height_full, 0)  // 14 -- side 3 right upper corner
			,new THREE.Vector3(leftPush.x, height_full, leftPush.z) // 15 -- side 3 left upper corner	
			
			/**
			* SIDE 1/2 VERTICES
			*/
			,new THREE.Vector3(rightPush.x, 0, rightPush.z) // 16 -- side 1 left lower corner
			,new THREE.Vector3(-width_half, 0, 0) // 17 -- side 1 right lower corner
			,new THREE.Vector3(-width_half, height_full, 0)  // 18 -- side 1 right upper corner
			,new THREE.Vector3(rightPush.x, height_full, rightPush.z) // 19 -- side 1 left upper corner	
			
			,new THREE.Vector3(rightPush.x, 0, rightPush.z) // 20 -- side 2 left lower corner
			,new THREE.Vector3(-width_half, 0, 0) // 21 -- side 2 right lower corner
			,new THREE.Vector3(-width_half, height_full, 0) // 22 -- side 2 right upper corner
			,new THREE.Vector3(rightPush.x, height_full, rightPush.z) // 23 -- side 2 left upper corner	
		];
		
		var i;
		for (i=0;i<scope.vertices.length;i++) {
			scope.BUILD_STATE.vertices.push(scope.vertices[i].clone());
		}
		
		/**
		* The order of vertices matters when plotting the faces. The order
		* should follow the L letter. When starting from the bottom end 
		* the camera facing Face is defined. When starting from top, the
		* face is rendered from behind.
		*/
		scope.faces = [
			// side 4
			new THREE.Face3( 0, 1, 2, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 4 )
			,new THREE.Face3( 2, 3, 0, new THREE.Vector3(), new THREE.Color( 0xffaa00 ), 4 )
			// side 5
			,new THREE.Face3( 6, 5, 4, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 5 )
			,new THREE.Face3( 4, 7, 6, new THREE.Vector3(), new THREE.Color( 0x11bb00 ), 5 )
			
			// side 2
			,new THREE.Face3( 8, 9, 10, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 2 )
			,new THREE.Face3( 10, 11, 8, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 2 )
			// side 3
			,new THREE.Face3( 14, 13, 12, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 3 )
			,new THREE.Face3( 12, 15, 14, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 3 )
			
			// side 0
			,new THREE.Face3( 18, 17, 16, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 0 )
			,new THREE.Face3( 16, 19, 18, new THREE.Vector3(), new THREE.Color( 0xddcc00 ), 0 )
			// side 1
			,new THREE.Face3( 20, 21, 22, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 1 )
			,new THREE.Face3( 22, 23, 20, new THREE.Vector3(), new THREE.Color( 0x88dd00 ), 1 )
		]

		/**
		* 01 11
		* 00 10
		*/
		var uvs = [];
		uvs.push( new THREE.Vector2( 0.0, 0.0 ) );
		uvs.push( new THREE.Vector2( 1.0, 0.0 ) );
		uvs.push( new THREE.Vector2( 0.0, 1.0 ) );
		uvs.push( new THREE.Vector2( 1.0, 1.0 ) );
		
		scope.faceVertexUvs[ 0 ] = [
			// side 4
			[ uvs[0], uvs[1], uvs[3] ]
			,[ uvs[3], uvs[2], uvs[0] ]
			// side 5
			,[ uvs[2], uvs[0], uvs[1] ]
			,[ uvs[1], uvs[3], uvs[2] ]
			// side 2
			,[ uvs[0], uvs[1], uvs[3] ] 
			,[ uvs[3], uvs[2], uvs[0] ] 
			// side 3
			,[ uvs[2], uvs[0], uvs[1] ] 
			,[ uvs[1], uvs[3], uvs[2] ]
			// side 0
			,[ uvs[2], uvs[0], uvs[1] ] //18, 17, 16
			,[ uvs[1], uvs[3], uvs[2] ] //16, 19, 18
			// side 1
			,[ uvs[0], uvs[1], uvs[3] ]  //20, 21, 22,
			,[ uvs[3], uvs[2], uvs[0] ]  // 22, 23, 20
		] ;
		
		scope.computeFaceNormals();
		scope.computeVertexNormals();
		//scope.mergeVertices();
		
	}
};

WHALE.VerticallyCFoldedDLLeaflet.prototype = Object.create( WHALE.BaseGeometry.prototype );
WHALE.VerticallyCFoldedDLLeaflet.prototype.constructor = WHALE.VerticallyCFoldedDLLeaflet;

/**
* @Override super.print()
* Print to console
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.print = function () {
	console.log(this.type,this);
};

/**
* @Override super.getMaterialSize()
* Return material size
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.getMaterialSize = function () {
	return { x: this.width, y: this.height }
};

/**
* @Override super.reset()
* Reset the position of vertices to their position as build time.
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.reset = function () {
	var i;
	for(i=0;i<this.BUILD_STATE.vertices.length;i++) {
		var originalVertex = this.BUILD_STATE.vertices[i].clone()
		this.vertices[i] = originalVertex;
	}
	this.verticesNeedUpdate = true;
}

/**
* Calculate vertex position using the circle equation
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.circleEquation = function(val,negative) {
	// y = +/- (r^2 - (x-h)^2)^1/2 + k -- eg: y = -(128^2 - 46^2)^1/2 + 120
	return ( Math.sqrt( Math.pow( this.sideLength, 2 ) - Math.pow(val, 2) ) * ((negative) ? -1 : 1)) + this.height;
} 

/**
* Calculate speed as used by the animation functions
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.speed = function(maxStep,y,maxY) {

}

/**
* y goes from 0 to ((this.height + this.sideLength) - 10)
* z goes from 45 to this.sideLength and back to 45
* NOTE: isNaN() check is needed to unless speed is odd
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.animateRightSide = function (index) {

}

/**
* z goes from -45 to 45
* y goes from 0 to -8 and again to 0 
* NOTE: when z rem 2 != 0 then goes haywire
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.animateLeftSide = function (index) {

}

/**
* @Override super.play()
* Play animation
*/
WHALE.VerticallyCFoldedDLLeaflet.prototype.play = function () {
	var leftZ = 70 ;
	var leftPush = this.cornerPush(leftZ,true);
	var rightZ = 86;
	var rightPush = this.cornerPush(rightZ,false);
	
	this.vertices[8].x = leftPush.x;
	this.vertices[8].z = leftPush.z;
	this.vertices[11].x = leftPush.x;
	this.vertices[11].z = leftPush.z;
	
	this.vertices[12].x = rightPush.x;
	this.vertices[12].z = rightPush.z;
	this.vertices[15].x = rightPush.x;
	this.vertices[15].z = rightPush.z;
}
