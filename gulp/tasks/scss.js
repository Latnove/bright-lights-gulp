import dartSass from 'sass' // Sass препроцессор
import gulpSass from 'gulp-sass' // Плагин для запуска
import rename from 'gulp-rename' // Стили в *min.css
import cleanCss from 'gulp-clean-css' // Сжатие css файла
import webpcss from 'gulp-webpcss' // Вывод WEBP изображения
import autoprefixer from 'gulp-autoprefixer' // Добавление префиксов (--webkit)
import groupCssMediaQueries from 'gulp-group-css-media-queries' // Группировка медиа запросов

const sass = gulpSass(dartSass)

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'SCSS - damn you',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(
        sass({
          outputStyle: 'expanded',
        })
      )
      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          webpcss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
          })
        )
      )
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoprefixer({
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true,
          })
        )
      )
      // Раскомментировать, если нужен не сжатый дубль файла стилей
      // .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.if(app.isBuild, cleanCss()))
      .pipe(
        rename({
          extname: '.min.css',
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream())
  )
}
