var package = require('./package.json');
var taskConfig = {
  path: {
    dir     : __dirname,
    js      : __dirname + '/public/js',
    css     : __dirname + '/public/css',
    scss    : __dirname + '/public/scss',
    images  : __dirname + '/public/images',
    configRb: __dirname + '/public/config.rb'
  },
  server: {
    indexFile : './server',
    port      : '4848'
  },
  version: package.version,
  app_name: package.name
};
var tasks = require('./tasks')(taskConfig);

tasks.gulp.task('compass', tasks.compass);
tasks.gulp.task('lint', tasks.lint);
tasks.gulp.task('nodemon', tasks.nodemon);
tasks.gulp.task('package', tasks.package);
tasks.gulp.task('minify', tasks.minify);
tasks.gulp.task('watch', function(){
  tasks.gulp.watch(['./public/scss/**/*.scss'], ['compass']);
  tasks.gulp.watch(['./public/js/**/*.js', '!./public/js/**/*pkg*.js'], ['package']);
});

tasks.gulp.task('version', tasks.version);

tasks.gulp.task('default', ['watch', 'package', 'compass', 'nodemon']);
tasks.gulp.task('staging', tasks.gulpsync.sync(['compass', 'package', 'minify', 'version']));
