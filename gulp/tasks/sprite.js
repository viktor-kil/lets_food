import { src, dest } from "gulp";
import plumber from "gulp-plumber";

import svgSprite from "gulp-svg-sprite";

import paths from "../config/path.js";
import { app, showNotify } from "../config/app.js";

const sprite = () => {
	return src(paths.sprite.src, { encoding: false })
		.pipe(plumber(showNotify("SVG-Sprite")))
		.pipe(svgSprite(app.sprite))
		.pipe(dest(paths.sprite.dest));
};

export default sprite;
