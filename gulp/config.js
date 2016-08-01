'use strict';

export default {
	root: './',
	client: './client/',
	temp: './temp/',
	build: './build/',
	port: 9000,
	UIPort: 3001,

	inject:['./build/js/lib.js',
			'./build/js/app.js',
			'./build/styles/lib.css',
			'./build/styles/app.css'],

	gzip: {
	    src: './build/*/*.{html,xml,json,css,js,js.map,css.map}',
	    dest: './build/',
	    options: {}
	},

	styles: {
		src: ['client/styles/*.scss','client/**/**/styles/*.scss'],
		prodSourcemap: false,
		sassIncludePaths:[],
		temp: 'temp/css',
		dest: 'build/styles'
	},

	images: {
    src: 'client/images/*',
		temp: 'temp/images',
    dest: 'build/images'
  },

	scripts: {
		mainMdl: 'client/main.mdl.js',
		all: 'client/**/*.js',
		components:[
			'client/**/main.mdl.js',
			'client/**/*.mdl.js',
			'client/**/*.js',
			'!' + 'client/**/*.spec.js'
		],
		order:[
			'**/main.mdl.js',
			'**/*.mdl.js',
			'**/*.js'
		],
		temp: 'temp/js',
		dest: './build/js'
	},

	assetExtensions: [
	    'js',
	    'css',
	    'png',
	    'jpe?g',
	    'gif',
	    'svg',
	    'eot',
	    'otf',
	    'ttc',
	    'ttf',
	    'woff2?'
	],

	views: {
		index: 'client/index.html',
		templates: [
			'client/components/**/views/*.html'
		],
		templatesOptions: {
			file: 'templates.js',
			options: {
				module: 'gettAroom',
				standAlone: false
			}
		},
		temp: 'temp/js',
		dest: 'build/js'
	},

	bowerOptions: {
		json: './bower.json',
        directory: './bower_components/',
        ignorePath: '../'
	},

	extraLibs: {
		src: 'client/libs/**/*.js',
		file: 'extraLibs.js'
	},

	packages: [
        './package.json',
        './bower.json'
    ],

    browserify: {
    	bundleName: 'main.mdl.js',
    	prodSourcemap: false
  	},

  	unitTest: {
	    config: './karma.conf.js',
	    lib: 'temp/js/lib.js',
	    templates: 'temp/js/templates.js',
	    mainModule: 'temp/js/main.mdl.js',
	    specs: 'client/**/tests/unit/**/*.js'
	}
};
