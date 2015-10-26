module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: 'eslint.json'
            },
            target: [
                'src/**/*.js'
            ]
        }
    });

    grunt.registerTask('test', [
        'eslint'
    ]);

    grunt.registerTask('default', [
        'test'
    ]);
};
