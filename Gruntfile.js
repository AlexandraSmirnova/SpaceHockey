module.exports = function(grunt){
  /* Функция обертка, все внутри нее */

	grunt.initConfig({
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

				} /* grunt-fest */

    });

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-fest');
	grunt.registerTask('default', [ 'fest', 'shell' ]);

}

