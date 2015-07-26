var gulp    = require('gulp');
var compass = require('gulp-compass');
var nodemon = require('gulp-nodemon');
var jshint  = require('gulp-jshint');
var merge   = require('merge-stream');
var concat  = require('gulp-concat');
var rename  = require('gulp-rename');
var uglify  = require('gulp-uglify');
var fs      = require('fs');
var path    = require('path');
var gulpsync     = require('gulp-sync')(gulp);
var nodeInspector = require('gulp-node-inspector');

var _config;


module.exports = function(config){
  _config = config;
  var _self = this;
  this.gulp = gulp;
  this.gulpsync = gulpsync;

  this.compass = function(){
    gulp.src(_config.path.scss)
      .pipe(compass({
        config_file: _config.path.configRb,
        css: _config.path.css,
        sass: _config.path.scss
      }))
      .pipe(gulp.dest(_config.path.css));
  };

  this.lint = function(){
    gulp.src('./**/*.js')
      .pipe(jshint())
  };

  this.nodemon = function(){
    nodemon({
      script: _config.server.indexFile,
      nodeArgs: ['--debug='+_config.server.port],
      ext: 'js html',
      env: {
        'DEBUG' : 'template:server'
        ,'NODE_ENV' : 'development'
      },
      ignore: [_config.path.dir+'/public']
    })
      .on('change', ['lint'])
      .on('restart', function () {
        console.log('server restarted!')
      })
  };


  this.package = function(){
    var folders = getFolders(_config.path.js);

    var tasks = folders.map(function(folder) {
      return gulp.src([path.join(_config.path.js, folder, '/*.js'), '!'+_config.path.js+'/**/*-pkg*.js'])
        .pipe(concat(folder + '-pkg.js'))
        .pipe(gulp.dest(path.join(_config.path.js, folder)));
    });

    return merge(tasks);
  };

  this.minify = function(){
    var folders = getFolders(config.path.js);

    var tasks = folders.map(function(folder) {
      return gulp.src([path.join(_config.path.js, folder, '/*-pkg.js')])
        .pipe(uglify())
        .pipe(rename(folder + '-pkg.js'))
        .pipe(gulp.dest(path.join(_config.path.js, folder)));
    });

    return merge(tasks);
  };

  this.version = function(){
    return gulp.src([path.join(_config.path.dir, 'public/**/*'), '!public/*.rb', '!public/scss/*'])
        .pipe(gulp.dest(path.join(_config.path.dir, 'public', _config.version)));

  };

  this.debug = function() {
    return gulp.src([]).pipe(nodeInspector());
  };

  function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }

  return this;
};