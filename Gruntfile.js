module.exports = function (grunt) {

  grunt.initConfig({
    // uglify: {
    //   options: {
    //     compress: {
    //       unused: true
    //     }
    //   },
    //   my_target: {
    //     files: {
    //       'dist/assets/_main.js': ['dist/assets/_main.js'],
    //     }
    //   }
    // },
    critical: {
      dist: {
        options: {
          base: './',
          dimensions: [{
            width: 1300,
            height: 900
          },
          {
            width: 500,
            height: 900
          }],
        },
        files: [
          {
            expand: true,
            cwd: 'dist/', // Set the current working directory
            src: ['index.html', 'posts/**/*.html'], // Specify source files
            dest: 'dist/' // Specify the destination directory
          }
        ]
      }
    }
  });

  // Load the plugins
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-critical');


  // Default tasks.
  grunt.registerTask('default', ['critical']);
};