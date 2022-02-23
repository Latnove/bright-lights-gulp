import fileinclude from 'gulp-file-include'
import webpHtmlNosvg from 'gulp-webp-html-nosvg-lv'
import versionNumber from 'gulp-version-number'
import htmlmin from 'gulp-htmlmin'

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML - damn you',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(fileinclude())
    .pipe(
      app.plugins.if(
        app.isBuild,
        htmlmin({ collapseWhitespace: true, removeComments: true })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())
}
