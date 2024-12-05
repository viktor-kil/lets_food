import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import rename from "gulp-rename";
import gulpIf from "gulp-if";

import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import gcmq from "gulp-group-css-media-queries";
import csso from "gulp-csso";

const sass = gulpSass(dartSass);

import paths from "../config/path.js";
import { app, showNotify } from "../config/app.js";

const scss = () => {
	return src(paths.scss.src, { sourcemaps: app.isDev })
		.pipe(plumber(showNotify("SCSS")))
		.pipe(sass())
		.pipe(autoprefixer(app.autoprefixer))
		.pipe(gcmq())
		.pipe(dest(paths.scss.dest, { sourcemaps: app.isDev }))
		.pipe(gulpIf(app.isProd, rename({ suffix: ".min" })))
		.pipe(gulpIf(app.isProd, csso()))
		.pipe(dest(paths.scss.dest, { sourcemaps: app.isDev }));
};

export default scss;
