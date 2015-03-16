# gulp-bower-versions

> Writes bower component versions to a file

## Usage

### All components

```js
var bower_versions = require('gulp-bower-versions');
var fs = require('fs');

var bower_dir = fs.existsSync('.bowerrc') ? (require('./.bowerrc').directory || 'bower_components') : 'bower_components';

gulp.task('bower:versions', function () {
  gulp.src(bower_dir + '/*/.bower.json')
    .pipe(bower_versions())
    .pipe(gulp.dest('build/bower_versions.json'));
});
```

### Specific component(s)

```js
var bower_versions = require('gulp-bower-versions');
var fs = require('fs');

var bower_dir = fs.existsSync('.bowerrc') ? (require('./.bowerrc').directory || 'bower_components') : 'bower_components';

gulp.task('bower:versions', function () {
  gulp.src([bower_dir + '/jquery/.bower.json', bower_dir + '/font_awesome/.bower.json'])
    .pipe(bower_versions())
    .pipe(gulp.dest('build/bower_versions.json'));
});
```

### Save results in a JS variable

This simply wraps the resulting JSON in `var [variable] = [JSON];`

```js
var bower_versions = require('gulp-bower-versions');
var fs = require('fs');

var bower_dir = fs.existsSync('.bowerrc') ? (require('./.bowerrc').directory || 'bower_components') : 'bower_components';

gulp.task('bower:versions', function () {
  gulp.src([bower_dir + '/*/.bower.json'])
    .pipe(bower_versions({ variable: 'BowerComponents' }))
    .pipe(gulp.dest('build/bower_versions.json'));
});
```