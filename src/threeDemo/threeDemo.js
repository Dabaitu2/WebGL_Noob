const THREE = require('three-js/three');

const width = 400,
	height = 400;

// 获取canvas
const canvas = document.getElementById('myCanvas');

// 指定渲染器
const renderer =  new THREE.WebGLRenderer({
	canvas: canvas
});

// 创建场景
const scene = new THREE.Scene();

// 创建正交相机
const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -1000, 1000);

renderer.setClearColor(new THREE.Color(0x000000), 1.0);
renderer.setSize(400, 400);

// 类似于图元？
const triangleShape = new THREE.Shape();
triangleShape.moveTo(0, 100);
triangleShape.lineTo(-100, -100);
triangleShape.lineTo(100, -100);
triangleShape.lineTo(0, 100);

// 类似于顶点着色器
const geometry = new THREE.ShapeGeometry(triangleShape);
// 类似于片元着色器
const material = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	side: THREE.DoubleSide
});

// 根据顶点和片元创建mesh网格
const mesh = new THREE.Mesh(geometry, material);
// 设置网格位置（z轴稍微移动一点防止和摄像机重叠）
mesh.position = {x: 0, y: 0, z: 1};
scene.add(mesh);

camera.positiom = {x: 0, y: 0, z: 0};
camera.lookAt(new THREE.Vector3(0, 0, 1));

let currentAngle = 0;
let lastTimeStamp = Date.now();

const animate = () => {
	const now = Date.now();
	const duration = now - lastTimeStamp;
	lastTimeStamp = now;
	currentAngle = currentAngle + (duration / 100 * Math.PI);
};

const render = () => {
	animate();
	mesh.rotation.set(0, currentAngle, 0);
	renderer.render(scene, camera);
	requestAnimationFrame(render);
};

render();
