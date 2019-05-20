attribute vec4 a_position;
// 变换矩阵
uniform mat4 u_ModelMatrix;
void main () {
	gl_Position = u_ModelMatrix * a_position;
}
