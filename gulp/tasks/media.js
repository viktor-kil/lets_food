import { src, dest } from "gulp";
import plumber from "gulp-plumber";

import paths from "../config/path.js";
import { showNotify } from "../config/app.js";

const media = () => {
	return src(paths.media.src, {
		encoding: false,
	})
		.pipe(plumber(showNotify("Media")))
		.pipe(dest(paths.media.dest));
};

export default media;
