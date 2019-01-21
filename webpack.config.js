const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	// 入口
	entry: './src/index.js',

	// 出口
	output: {
		path: path.resolve(__dirname, 'dist'), // 解析当前文件夹名称/dist
		filename: 'bundle.js',
	},

	// 模块
	module: {
		// 处理js文件
		rules: [
			// 使用的规则
			{
				test: /\.jsx?/, // 匹配什么文件
				include: [
					// 解析什么位置下的
					path.resolve(__dirname, 'src'),
				],
				use: 'babel-loader', // 使用什么处理
			},
			// 处理样式文件
			{
				test: /\.(c|sc|sa|le)ss$/,
				include: [path.resolve(__dirname, 'src')],
				use: ExtractTextPlugin.extract({
					// 将css-loader解析后的代码抽成单独的css文件
					fallback: 'style-loader', // 如果extractText插件没有生效就执行这个，
					use: [
						// 将css解析后的结果转变为js代码，通过运行时动态插入style的方式执行css
						'less-loader',
						'sass-loader',
						'css-loader', // 解析css代码，处理css的一些依赖和外部声明，import等
					],
				}),
			},
			// 处理静态资源
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {},
					},
				],
			},
		],
	},

	// 代码模块路径解析
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'src')],

		extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
	},

	plugins: [
		new UglifyPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html', // 输出文件名和路径
			template: 'assets/index.html', // 配置文件模板
		}),
		new ExtractTextPlugin('index.css'),
	],
};
