import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const isProd = process.env.NODE_ENV === 'production';

const rollupConfig = {
	input: 'src/index.js',
	plugins: [
		babel({
			babelHelpers: 'bundled',
		}),
		isProd && terser(),
		isProd && filesize(),
	],
	output: [
		{
			format: 'es',
			file: 'dist/dom-hints.esm.js',
		},
		{
			format: 'umd',
			file: 'dist/dom-hints.js',
			name: 'DomHints',
		},
	],
};

export default rollupConfig;
