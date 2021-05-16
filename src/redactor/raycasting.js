
import * as THREE from '../build/three.module.js';

function CanvasTexture( parentTexture ) {
	this._canvas = document.createElement( "canvas" ); // создаем канвас в доке
	this._canvas.width = this._canvas.height = 1024; // высота, ширина
	this._context2D = this._canvas.getContext( "2d" ); // контекст

	if ( parentTexture ) {		// если закинули родительску текстуру
		this._parentTexture.push( parentTexture );	//запушить текстуру
		parentTexture.image = this._canvas;	// image родителя - канвас
	}

	const that = this;	// че
	this._background = document.createElement( "img" );
	this._background.addEventListener( "load", function () {
		that._canvas.width = that._background.naturalWidth;
		that._canvas.height = that._background.naturalHeight;

		that._crossRadius = Math.ceil( Math.min( that._canvas.width, that._canvas.height / 30 ) );
		that._crossMax = Math.ceil( 0.70710678 * that._crossRadius );
		that._crossMin = Math.ceil( that._crossMax / 10 );
		that._crossThickness = Math.ceil( that._crossMax / 10 );

		that._draw();
	} );
	this._background.crossOrigin = '';
	this._background.src = "textures/uv_grid_opengl.jpg";

	this._draw();
}


CanvasTexture.prototype = {
	constructor: CanvasTexture,

	_canvas: null,
	_context2D: null,
	_xCross: 0,
	_yCross: 0,

	_crossRadius: 57,
	_crossMax: 40,
	_crossMin: 4,
	_crossThickness: 4,

	_parentTexture: [],

	addParent: function ( parentTexture ) {
		if ( this._parentTexture.indexOf( parentTexture ) === - 1 ) {
			this._parentTexture.push( parentTexture );
			parentTexture.image = this._canvas;
		}
	},

	setCrossPosition: function ( x, y ) {
		this._xCross = x * this._canvas.width;
		this._yCross = y * this._canvas.height;

		this._draw();
	},

	_draw: function () {
		if ( ! this._context2D ) return;

		this._context2D.clearRect( 0, 0, this._canvas.width, this._canvas.height );

		// Background.
		this._context2D.drawImage( this._background, 0, 0 );

		// Yellow cross.
		this._context2D.lineWidth = this._crossThickness * 3;
		this._context2D.strokeStyle = "#FFFF00";

		this._context2D.beginPath();
		this._context2D.moveTo( this._xCross - this._crossMax - 2, this._yCross - this._crossMax - 2 );
		this._context2D.lineTo( this._xCross - this._crossMin, this._yCross - this._crossMin );
		this._context2D.stroke();

		for ( let i = 0; i < this._parentTexture.length; i ++ ) {
			this._parentTexture[ i ].needsUpdate = true;
		}
	}
};

const width = window.innerWidth;
const height = window.innerHeight;

let canvas;
let planeTexture, cubeTexture, circleTexture;

let container;

let camera, scene, renderer;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const onClickPosition = new THREE.Vector2();

init();
render();

function init() {
	container = document.getElementById( "container" );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xeeeeee );

	camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
	camera.position.z = 50;

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( width, height );
	container.appendChild( renderer.domElement );

	// A cube, in the middle.
	cubeTexture = new THREE.Texture( undefined, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping );
	canvas = new CanvasTexture( cubeTexture );
	const cubeMaterial = new THREE.MeshBasicMaterial( { map: cubeTexture } );
	const cubeGeometry = new THREE.BoxGeometry( 20, 20, 20 );
	let uvs = cubeGeometry.attributes.uv.array;
	// Set a specific texture mapping.
	for ( let i = 0; i < uvs.length; i ++ ) {
		uvs[ i ] *= 2;
	}

	const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	scene.add( cube );

	// A plane on the left
	planeTexture = new THREE.Texture( undefined, THREE.UVMapping, THREE.MirroredRepeatWrapping, THREE.MirroredRepeatWrapping );
	canvas.addParent( planeTexture );
	const planeMaterial = new THREE.MeshBasicMaterial( { map: planeTexture } );
	const planeGeometry = new THREE.PlaneGeometry( 25, 25, 1, 1 );
	uvs = planeGeometry.attributes.uv.array;

	// Set a specific texture mapping.
	for ( let i = 0; i < uvs.length; i ++ ) {
		uvs[ i ] *= 2;
	}

	const plane = new THREE.Mesh( planeGeometry, planeMaterial );
	plane.position.x = - 16;
	scene.add( plane );

	window.addEventListener( 'resize', onWindowResize );
	container.addEventListener( 'mousemove', onMouseMove );
}

function onMouseMove( evt ) {
	evt.preventDefault();

	const array = getMousePosition( container, evt.clientX, evt.clientY );
	onClickPosition.fromArray( array );

	const intersects = getIntersects( onClickPosition, scene.children );

	if ( intersects.length > 0 && intersects[ 0 ].uv ) {
		const uv = intersects[ 0 ].uv;
		intersects[ 0 ].object.material.map.transformUv( uv );
		canvas.setCrossPosition( uv.x, uv.y );
	}
}

function getMousePosition( dom, x, y ) {
	const rect = dom.getBoundingClientRect();
	return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
}

function getIntersects( point, objects ) {
	mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );

	raycaster.setFromCamera( mouse, camera );

	return raycaster.intersectObjects( objects );
}

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
}
