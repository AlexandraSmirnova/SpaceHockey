module.exports = function (grunt) {
	grunt.initConfig({
		watch: {
			fest: {
				files: ['templates/*.xml'],
				tasks: ['fest'],
				options: {
					interrupt: true,
					atBegin: true
				}
			},
			sass: {
				files: ['public_html/css/scss/*.scss'],
				tasks: ['sass:build'],
			},
			server: {
				files: [
					'public_html/js/**/*.js', /* следим за статикой*/
					'public_html/css/**/*.css'
				],
				options: {
					interrupt: true,
					livereload: true /* перезагрузить страницу */
				}
			}
		},
		shell: {
			server: {
				command: 'java -cp Server.jar main.Main 8080'
			}
		},
		fest: {
			templates: {
				/* Цель */
				files: [{
					expand: true,
					cwd: 'templates', /* исходная директория */
					src: '*.xml', /* имена шаблонов */
					dest: 'public_html/js/tmpl' /* результирующая директория */
				}],
				options: {
					template: function (data) {
						return grunt.template.process(
							// 'var <%= name %>Tmpl = <%= contents %> ;',
							'define(function () { return <%= contents %> ; });',
							{data: data}
						);
					}
				}
			}
		},
		concurrent: {
			target: ['watch', 'shell'],
			options: {
				logConcurrentOutput: true /* Вывод логов */
			}
		},
		sass: {
			build: {
				options: {
					style: 'expended'
				},
				files: [{
					expand: true,
					cwd: 'public_html/css/scss',
					src: 'main.scss',
					dest: 'public_html/css',
					ext: '.css'
				}]
			},

		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'public_html/css',
					src: ['*.css', '!*.min.css'],
					dest: 'public_html/css',
					ext: '.min.css'
				}]
			}
		},

		requirejs: {
			/* grunt-contrib-requirejs */
			build: {
				/* Подзадача */
				options: {
					almond: true,
					baseUrl: 'public_html/js',
					mainConfigFile: 'public_html/js/main.js',
					name: 'main',
					optimize: 'none',
					out: 'public_html/js/build/main.js'
				}
			}
		},
		concat: {
			/* grunt-contrib-concat */
			build: {
				/* Подзадача */
				separator: ';\n',
				src: [
					'public_html/js/lib/almond.js',
					'public_html/js/build/main.js'
				],
				dest: 'public_html/js/build.js'
			}
		},
		uglify: {
			/* grunt-contrib-uglify */
			build: {
				/* Подзадача */
				files: {
					'public_html/js/build.min.js': ['public_html/js/build.js']
				}
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concurrent']);
	/* задача по умолчанию */
	grunt.registerTask('build', ['sass:build', 'cssmin', 'requirejs:build', 'concat:build', 'uglify:build']);
	grunt.registerTask('prod', ['shell']);
	//grunt.registerTask('build', ['sass:build']);


}

