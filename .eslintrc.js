module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-dupe-keys': ['error'],
		'use-isnan': ['warn'],
		'dot-location': ['warn'],
		'no-useless-escape': ['error'],
		'no-useless-return': ['error'],
		'no-unused-vars': ['error'],
		'no-console': ['off'],
		'prefer-const': ['error']
	},
};
