import React from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

import './redactor.css';

let camera, scene, renderer, controls, skinTexture, skinModel;
const drawStartPos = new THREE.Vector2();
var skinToLoad = 'https://texture.namemc.com/ae/fc/aefc9682a40ebaf0.png';
//'https://texture.namemc.com/c8/68/c86868b8b045944d.png';
//'https://texture.namemc.com/ac/6c/ac6cbaae1b8722d8.png';
//'https://texture.namemc.com/41/ea/41eaf108f88e3997.png';

function init() {

    camera = new THREE.PerspectiveCamera( 80, 1, 0.1, 1000 );    
    camera.position.set( 0, 0, 32);

    scene = new THREE.Scene();
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0x555555);
    renderer.setSize( 500, 500 );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set(0, 0, 0);
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE
    }
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.update();

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize );    
}

function setupCanvasDrawing() {
    // get canvas and context
    const drawingCanvas = document.getElementById( 'drawing-canvas' );
    const drawingContext = drawingCanvas.getContext( '2d' );
    const loader = new THREE.ImageLoader();
    // load a image resource
    var skinImage = loader.load( skinToLoad, function (  ) {
        drawingContext.imageSmoothingEnabled = false;
        drawingContext.drawImage( skinImage, 0, 0, 64, 64 );
        updateSkinTextures();
    });
    
    drawingContext.scale(4, 4);

    skinTexture = new THREE.CanvasTexture(drawingCanvas);
    skinTexture.magFilter = THREE.NearestFilter;

    // set the variable to keep track of when to draw
    let paint = false;
    // add canvas event listeners
    drawingCanvas.addEventListener( 'pointerdown', function ( e ) {
        paint = true;
        drawStartPos.set( e.offsetX / 4, e.offsetY / 4);
    } );
    drawingCanvas.addEventListener( 'pointermove', function ( e ) {
        if ( paint ) draw( drawingContext, e.offsetX / 4, e.offsetY / 4);
    } );
    drawingCanvas.addEventListener( 'pointerup', function () {
        paint = false;
    } );
    drawingCanvas.addEventListener( 'pointerleave', function () {
        paint = false;
    } );
};

//#region skin init
function skinInit(){
    var heads = new THREE.Group();
    var bodies = new THREE.Group();
    var arms = new THREE.Group();
    var legs = new THREE.Group();
    skinModel = [];
    skinModel.push(heads, bodies, legs, arms);

    legs.add(createLeg(-2, -10, 0, 0, false),
            createLeg(2, -10, 0.25, -0.5, false),
            createLeg(-2, -10, 0, -0.25, true),
            createLeg(2, -10, 0, -0.5, true),
            );
    arms.add(createArm(-6, 2, 0.625, 0, false),
            createArm(6, 2, 0.5, -0.5, false),
            createArm(-6, 2, 0.625, -0.25, true),
            createArm(6, 2, 0.75, -0.5, true),
            );
    heads.add(createHead(0, 12, 0, 0, false),
           createHead(0, 12, 0.5, 0, true),
           );
    bodies.add(createBody(0, 2, 0, 0, false),
           createBody(0, 2, 0, -0.25, true),
           );
    scene.add(arms, bodies, legs, heads);
    updateSkinTextures();
};

function createLeg(x_pos, y_pos, dx, dy, owerlay) {
    var legSides  = [];
    for (var i = 0; i < 6; i++){
        legSides.push(skinTexture.clone());
        legSides[i].magFilter = THREE.NearestFilter;
        legSides[i].needsUpdate = true;
    }
    var size, transparent, side;
    owerlay? size = 0.5 : size = 0;
    owerlay? transparent = true : transparent = false;   
    owerlay? side = THREE.DoubleSide: side = THREE.FrontSide;
    legSides[0].repeat.set(0.0625       , 0.1875      );
    legSides[0].offset.set(0.125  + dx  , 0.5    + dy );
    legSides[1].repeat.set(0.0625       , 0.1875      );
    legSides[1].offset.set(0.0    + dx  , 0.5    + dy );
    legSides[2].repeat.set(0.0625       , 0.0625      );
    legSides[2].offset.set(0.0625 + dx  , 0.6875 + dy );            
    legSides[3].repeat.set(0.0625       , 0.0625      );
    legSides[3].offset.set(0.125  + dx  , 0.6875 + dy );            
    legSides[4].repeat.set(0.0625       , 0.1875      );
    legSides[4].offset.set(0.0625 + dx  , 0.5    + dy );            
    legSides[5].repeat.set(0.0625       , 0.1875      );
    legSides[5].offset.set(0.1875 + dx  , 0.5    + dy );
    var legMaterials = [];
    for (var i = 0; i < 6; i++){
        legMaterials.push(new THREE.MeshBasicMaterial( 
            {map:legSides[i], transparent:transparent, side:side}));
    }
    var leg = new THREE.Mesh( new THREE.BoxGeometry( 4 + size, 12 + size, 4 + size), legMaterials )
            leg.position.set(x_pos, y_pos, 0);
    return leg;
};

function createArm(x_pos, y_pos, dx, dy, owerlay) {
    /// TODO: SLIM SKIN
    var armSides  = []; 
    for (var i = 0; i < 6; i++){
        armSides.push(skinTexture.clone());
        armSides[i].magFilter = THREE.NearestFilter;
        armSides[i].needsUpdate = true;
    }
    var size, transparent, side;
    owerlay? size = 0.5 : size = 0;
    owerlay? transparent = true : transparent = false;   
    owerlay? side = THREE.DoubleSide: side = THREE.FrontSide; 
    armSides[0].repeat.set(0.0625       , 0.1875      );
    armSides[0].offset.set(0.125  + dx  , 0.5    + dy );
    armSides[1].repeat.set(0.0625       , 0.1875      );
    armSides[1].offset.set(0.0    + dx  , 0.5    + dy );
    armSides[2].repeat.set(0.0625       , 0.0625      );
    armSides[2].offset.set(0.0625 + dx  , 0.6875 + dy );            
    armSides[3].repeat.set(0.0625       , 0.0625      );
    armSides[3].offset.set(0.125  + dx  , 0.6875 + dy );            
    armSides[4].repeat.set(0.0625       , 0.1875      );
    armSides[4].offset.set(0.0625 + dx  , 0.5    + dy );            
    armSides[5].repeat.set(0.0625       , 0.1875      );
    armSides[5].offset.set(0.1875 + dx  , 0.5    + dy );
    var armMaterials = [];
    for (var i = 0; i < 6; i++){
        armMaterials.push(new THREE.MeshBasicMaterial( 
            {map:armSides[i], transparent:transparent, side:side}));
    }
    var arm = new THREE.Mesh( new THREE.BoxGeometry( 4 + size, 12 + size, 4 + size), armMaterials )
    arm.position.set(x_pos, y_pos, 0);
    return arm;
};

function createHead(x_pos, y_pos, dx, dy, owerlay) {
    var headSides  = [];
    
    for (var i = 0; i < 6; i++){
        headSides.push(skinTexture.clone());
        headSides[i].magFilter = THREE.NearestFilter;
        headSides[i].needsUpdate = true;
    }
    var size, transparent, side;
    owerlay? size = 1 : size = 0;
    owerlay? transparent = true : transparent = false;
    owerlay? side = THREE.DoubleSide: side = THREE.FrontSide;
    headSides[0].offset.set(0.25  + dx , 0.75 );
    headSides[1].offset.set(0     + dx , 0.75 );
    headSides[2].offset.set(0.125 + dx , 0.875);
    headSides[3].offset.set(0.375 + dx , 1    );
    headSides[3].rotation = Math.PI;
    headSides[4].offset.set(0.125 + dx , 0.75 );
    headSides[5].offset.set(0.375 + dx , 0.75 );         
    var headMaterials = [];
    for (var i = 0; i < 6; i++){
        headSides[i].repeat.set( 0.125 , 0.125 );
        headMaterials.push(new THREE.MeshBasicMaterial( 
            {map:headSides[i], transparent:transparent, side:side}));
    }
    var head = new THREE.Mesh( new THREE.BoxGeometry( 8 + size, 8 + size, 8 + size), headMaterials )
    head.position.set(x_pos, y_pos, 0);
    return head;
};

function createBody(x_pos, y_pos, dx, dy, owerlay) {
    var bodySides  = [];
    
    for (var i = 0; i < 6; i++){
        bodySides.push(skinTexture.clone());
        bodySides[i].magFilter = THREE.NearestFilter;
        bodySides[i].needsUpdate = true;
    }
    var size, transparent, side;
    owerlay? size = 0.5 : size = 0;
    owerlay? transparent = true : transparent = false;   
    bodySides[0].repeat.set(0.0625 , 0.1875 );
    bodySides[0].offset.set(0.4375 , 0.5 + dy);
    bodySides[1].repeat.set(0.0625 , 0.1875 );
    bodySides[1].offset.set(0.25   , 0.5 + dy);
    bodySides[2].repeat.set(0.125  , 0.0625 );
    bodySides[2].offset.set(0.3125 , 0.6875 + dy);            
    bodySides[3].repeat.set(0.125  , 0.0625 );
    bodySides[3].offset.set(0.4375 , 0.6875 + dy);
    bodySides[4].repeat.set(0.125  , 0.1875 );
    bodySides[4].offset.set(0.3125 , 0.5 + dy);            
    bodySides[5].repeat.set(0.125  , 0.1875 );
    bodySides[5].offset.set(0.5    , 0.5 + dy);
    var bodyMaterials = [];
    for (var i = 0; i < 6; i++){
        bodySides[i].repeat.set( 0.125 , 0.125 );
        bodyMaterials.push(new THREE.MeshBasicMaterial( 
            {map:bodySides[i], transparent:transparent, side:side}));
    }
    var body = new THREE.Mesh( new THREE.BoxGeometry( 8 + size, 12 + size, 4 + size), bodyMaterials )
    body.position.set(x_pos, y_pos, 0);
    return body;
};
//#endregion

function draw( drawContext, x, y, color ) {
    
    var roundedX = Math.round(x) ;
    var roundedY = Math.round(y) + 0.5;
    drawContext.translate(0.5, 0.5)
    drawContext.moveTo( drawStartPos.x, drawStartPos.y);
    drawContext.strokeStyle = '#000000'; //color of the line
    drawContext.lineWidth = 1;
    drawContext.lineCap = 'square';
    drawContext.lineJoin = 'bevel';
    drawContext.lineTo( roundedX, roundedY );
    drawContext.stroke();

    // reset drawing start position to current position.
    drawStartPos.set( roundedX, roundedY );
    // need to flag the map as needing updating.
    updateSkinTextures();
};

function updateSkinTextures() {
    skinModel.forEach(bodyPartsGroup => {
        bodyPartsGroup.children.forEach(bodyPartMesh => {
            for (var i = 0; i < 6; i++){
                bodyPartMesh.material[i].map.needsUpdate = true;
            }
        })
    })
};

function onWindowResize() {
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize( 500, 500 );
    //renderer.setSize( window.innerWidth, window.innerHeight );
};

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
};

class Redactor extends React.Component {
    componentDidMount() {        
		init();
		setupCanvasDrawing();
        skinInit();
        animate();
    }

    render() {
        return (
            <div>
                <canvas id="drawing-canvas" height="256" width="256"></canvas>
                <div ref={ref => (this.mount = ref)} />
            </div>
        )
    }
}

export default Redactor;