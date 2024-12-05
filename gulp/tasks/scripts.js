import { src, dest } from "gulp";
import plumber from "gulp-plumber";

import babel from "gulp-babel";
import webpack from "webpack-stream";

import paths from "../config/path.js";
import { app, showNotify } from "../config/app.js";

const scripts = () => {
	return src(paths.scripts.src, { sourcemaps: app.isDev })
		.pipe(plumber(showNotify("Scripts")))
		.pipe(babel(app.babel))
		.pipe(webpack(app.webpack))
		.pipe(dest(paths.scripts.dest, { sourcemaps: app.isDev }));
};

export default scripts;
