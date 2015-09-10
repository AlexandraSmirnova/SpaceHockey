module.exports = function(grunt){
  /* Функция обертка, все внутри нее */

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

					server: { /* Подзадача */
							command: 'java -cp L1.2-1.0-jar-with-dependencies.jar main.Main 8080'
							/* запуск сервера */
					}

				}, /* grunt-shell */
				
				fest: {
						
						templates: { /* Цель */
								files: [{
										expand: true,
										cwd: 'templates', /* исходная директория */
										src: '*.xml', /* имена шаблонов */
										dest: 'public_html/js/tmpl' /* результирующая директория */
								}],
							 	options: { 
										
										template: function (data) { /* формат функции-шаблона */
												return grunt.template.process(
														/* присваиваем функцию-шаблон переменной */
														'var <%= name %>Tmpl = <%= contents %> ;',
														{data: data}
												);
										}

 								}
						 } /* grunt-fest-templates */

				},
				concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true /* Вывод логов */
            }
        }
   /* grunt-fest */

    });
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
	grunt.registerTask('default', ['concurrent']); /* задача по умолчанию */

}

