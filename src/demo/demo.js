import * as Matrix from 'gl-matrix';
import vShader from './shader/demo.vert';
import fShader from './shader/demo.frag';


// 初始化gl
// 获取canvas 对象
const canvas = document.getElementById('myCanvas');

// 获取webgl上下文
const gl = canvas.getContext('webgl');

// 创建渲染程序
const program = gl.createProgram();

// 初始化shader源代码
const
	VSHADER_SOURCE = vShader,
	FSHADER_SOURCE = fShader;

/**
 * @param gl                webgl对象
 * @param sourceCode        shader的源代码
 * @param type                shader的类型
 * @return {WebGLShader}
 */
const createShader = (gl, sourceCode, type) => {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, sourceCode);
	gl.compileShader(shader);
	return shader;
};


// 初始化着色器
const vertexShader = createShader(gl, VSHADER_SOURCE, gl.VERTEX_SHADER);
const fragmentShader = createShader(gl, FSHADER_SOURCE, gl.FRAGMENT_SHADER);


gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.useProgram(program);

gl.program = program;


// 以下已经进入绘图过程
// 初始化顶点buffer
const initVertexBuffer = (gl) => {
	// 定义顶点集合(x, y)坐标
	const vertices = new Float32Array([
		0, 0.5, -0.5, -0.5, 0.5, -0.5,
	]);
	// 定义顶点数
	const n = 3;

	// 创建 buffer
	const vertexBuffer = gl.createBuffer();
	// 绑定缓冲区
	// 可选项: ELEMENT_ARRAY_BUFFER 带索引的buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	// 向buffer传数据
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	// get attribute a_position address in vertex shader
	const a_position = gl.getAttribLocation(gl.program, 'a_position');

	// bind buffer to vertex attribute,
	// a_position 读取到的vertex shader中的 attribute 地址
	// 每一次读入几位缓冲区中的数据(对应数组的几个)
	// 读取数据的格式
	gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

	// 启用a_position变量
	gl.enableVertexAttribArray(a_position);
	return n;
};

const initModelMatrix = (gl) => {
	// 创建自定义的变换矩阵
	let modelMatrix = Matrix.mat4.create();
	modelMatrix = Matrix.mat4.rotate(modelMatrix, modelMatrix, 0, Matrix.vec3.fromValues(0, 1, 0));
	// 获得顶点着色器中的u_ModelMatrix uniform类型变量的地址
	const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	// 向顶点着色器中的u_ModelMatrix uniform类型变量传递modelMatrix中的数据
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix);
};


// 传递顶点坐标数据给vertexShader
const n = initVertexBuffer(gl);
// 初始化变换矩阵
initModelMatrix(gl);
// 上一次动画的时间
let g_last = new Date();
// 现在的角度
let currentAngle = 0;
// 绘制每一帧的图像
const draw = () => {
	let modelMatrix = Matrix.mat4.create();
	modelMatrix = Matrix.mat4.rotate(modelMatrix, modelMatrix, currentAngle, Matrix.vec3.fromValues(0, 1, 0));
	const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix);
	// 清空上一帧的canvas
	gl.clear(gl.COLOR_BUFFER_BIT);
	// 参数：图元(模式), 从buffer的哪个位置开始取, 取几次
	gl.drawArrays(gl.TRIANGLES, 0, n);
};

const animate = () => {
	const now = Date.now();
	const duration = now - g_last;
	g_last = now;
	currentAngle = currentAngle + duration / 1000 * 4;
};

// 帧动画函数
const tick = () => {
	animate();
	draw();
	requestAnimationFrame(tick);
};




gl.clearColor(0, 0, 0, 1);
tick();