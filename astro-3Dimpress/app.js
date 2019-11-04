
// var webgl = document.getElementById('webgl');
// var gl = webgl.getContext('webgl');

var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75,
//                                          window.innerWidth / window.innerHeight,
//                                          0.1,
//                                          1000);
var width = 480;    //window.innerWidth;
var height = 240;   //window.innerHeight;
var camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
var renderer = new THREE.WebGLRenderer({canvas: shader});
renderer.setSize(width, height);
// document.body.appendChild( renderer.domElement );

var geometry = new THREE.PlaneBufferGeometry(width, height, 1, 1);
var shaderMaterial = new THREE.ShaderMaterial( {
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        ratio: {
            value: 0.1
        }
    }
});
// var material = new THREE.MeshBasicMaterial ( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, shaderMaterial );
scene.add(cube);

camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    renderer.render( scene, camera);
}

animate();

