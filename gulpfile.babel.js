import gulp from 'gulp';
import webpack from 'webpack';
import webpackConfig from './webpack.config';



gulp.task('build', (cb) => {

  webpack(webpackConfig, (err) => {
    cb();
  });

});
