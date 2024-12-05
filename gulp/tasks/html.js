import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import gulpIf from "gulp-if";

import fileinclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import typograf from "gulp-typograf";

import paths from "../config/path.js";
import { app, showNotify } from "../config/app.js";

const html = () => {
	return src(paths.html.src)
		.pipe(plumber(showNotify("HTML")))
		.pipe(fileinclude())
		.pipe(typograf(app.typograf))
		.pipe(gulpIf(app.isProd, htmlmin(app.htmlmin)))
		.pipe(dest(paths.html.dest));
};

export default html;
