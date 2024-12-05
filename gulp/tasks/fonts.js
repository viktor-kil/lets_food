import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import newer from "gulp-newer";

import ttf2woff2 from "gulp-ttf2woff2";

import paths from "../config/path.js";
import { showNotify } from "../config/app.js";

const fonts = () => {
	return src(paths.fonts.src, {
		encoding: false,
		removeBOM: false,
	})
		.pipe(plumber(showNotify("Fonts")))
		.pipe(newer(paths.fonts.dest))
		.pipe(ttf2woff2())
		.pipe(dest(paths.fonts.dest));
};

export default fonts;
