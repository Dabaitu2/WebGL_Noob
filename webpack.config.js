const path = require('path');
const webpack = require('webpack');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
	// 入口
	entry: {
		index: './src/index.js',
		demo: './src/demo/demo.js',
		threeDemo: './src/threeDemo/threeDemo.js'
	},

	// 出口
	output: {
		path: path.resolve(__dirname, 'dist'), // 解析当前文件夹名称/dist
		filename: '[name].bundle.[hash].js',   // 划分chunk，设置hash
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
			{
				test: /\.(vert|frag|geom)$/,
				use: 'raw-loader'
			}
		],
	},

	// 代码模块路径解析
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'src')],
		extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
		alias: {
			configs$: path.resolve(__dirname, 'src/configs/'),  // 精确匹配的全局别名
		},
	},

	plugins: [
		new UglifyPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html', // 输出文件名和路径
			template: 'assets/index.html', // 配置文件模板
			chunks: ['index'],
		}),
		new HtmlWebpackPlugin({
			filename: 'demo.html', // 输出文件名和路径
			template: 'src/demo/demo.html', // 配置文件模板
			chunks: ['demo'],
		}),
		new HtmlWebpackPlugin({
			filename: 'threeDemo.html',
			template: 'src/threeDemo/threeDemo.html',
			chunks: ['threeDemo'],
		}),
		new ExtractTextPlugin('index.css'),
		new webpack.HotModuleReplacementPlugin(),	// 启动模块热替换
		new webpack.NamedModulesPlugin(),			// 启动模块热替换时显示模块的相对路径
		new FriendlyErrorsWebpackPlugin()
	],

	devServer: {
		hot: true, // 开启热重载
		quiet: true // 不产生输出，让friendlyError插件来做
	},
};
