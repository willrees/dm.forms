module.exports = function (grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
       
        concat: {
            dist: {
                src: [                    
                    'scripts/src/dm.forms.js',
                    //'scripts/src/dm.forms.validation.js',
                    //'scripts/src/dm.forms.dataApi.js',
                    //'scripts/src/dm.forms.terms.js',
                ],
                dest: 'scripts/dist/dm.forms.js',
            }
        },
        uglify: {
            dist: {
                files: {
                    'scripts/dist/dm.forms.min.js': 'scripts/dist/dm.forms.js',
                    'css/dm.forms.min.css': 'css/dm.forms.css'
                }
            }
        },
        less: {
            development: {
                files: {
                     "css/dm.forms.css": "less/dm.forms.less"
                }
            }
        },                  
        watch: {
            scripts: {
                files: ['scripts/**/*.js'],
                tasks: ['less', 'concat', 'uglify'],
                options: {
                    spawn: false
                },
            },
            styles: {
                files: ['less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');        
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['less','concat', 'uglify']);
};
