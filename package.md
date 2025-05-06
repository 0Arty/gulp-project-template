# Project setup with Gulp, Webpack, Babel and other tools

----------------------------------------------------------------------
# Front-end project in VScode using front.code-workspace
----------------------------------------------------------------------

## Installing packages

```bash
    npm i gulp gulp gulp-sass sass gulp-file-include gulp-clean gulp-server-livereload gulp-sourcemaps gulp-plumber gulp-notify gulp-group-css-media-queries --save-dev
```


## Package Description:
 - gulp - Task manager for automating processes
 - gulp-sass - Collection of SASS / SCSS files
 - sass - Necessary for SASS / SCSS compilation
 - gulp-file-include - One to one file connection (HTML include)
 - gulp-clean - Delete files
 - gulp-server-livereload - Server with automatic page update
 - gulp-sourcemaps - Creating source maps for CSS
 - gulp-plumber - Processing of errors during builds
 - gulp-notify - Annunciation during task execution
 - gulp-group-css-media-queries - Grouping CSS media-queries

----------------------------------------------------------------------

### Setup for working with scripts
### Install babel:

```bash
    npm i gulp-babel @babel/core @babel/preset-env
```

----------------------------------------------------------------------

### Installing Webpack:

```bash
npm i webpack-stream style-loader css-loader --save-dev
```

#### Application with Datepicker
```bash
npm i air-datepicker -S
```


````bash
JS:
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

document.addEventListener('DOMContentLoaded', () => {
	new AirDatepicker('#my-element');
});

HTML:
<input type=“text” id=“my-element”>
```
----------------------------------------------------------------------

## Work with images:
````bash
npm i gulp-imagemin@7 --save-dev

.pipe(imagemin({ verbose: true }))
```

----------------------------------------------------------------------

Compilation acceleration

````bash
npm install --save-dev gulp-changed
```

- use in pictures, HTML, JS, CSS


----------------------------------------------------------------------

web-p
````bash
npm i gulp-webp gulp-webp-html gulp-webp-css --save-dev
```

## if you want to disable component folder creation, you need to find 

```bash
.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
and add , '!./src/html/folder name/*.html'.
```