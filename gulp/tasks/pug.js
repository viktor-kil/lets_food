import { src, dest } from "gulp";
import plumber from "gulp-plumber";

import pug from "gulp-pug";
import typograf from "gulp-typograf";

import paths from "../config/path.js";
import { app, showNotify } from "../config/app.js";

const pugs = () => {
	return src(paths.pug.src)
		.pipe(plumber(showNotify("Pug")))
		.pipe(pug(app.pug))
		.pipe(typograf(app.typograf))
		.pipe(dest(paths.pug.dest));
};

export default pugs;
