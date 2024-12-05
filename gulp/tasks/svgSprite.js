import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";

import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";

import paths from "../config/path.js";

const sprite = () => {
	return src(paths.sprite.src, { encoding: false })
		.pipe(
			plumber({
				errorHandler: notify.onError(error => ({
					title: "SVG-SPRITE",
					message: error.message,
				})),
			})
		)
		.pipe(
			svgmin({
				js2svg: {
					pretty: true,
				},
			})
		)
		.pipe(
			cheerio({
				run: function ($) {
					$("[fill]").removeAttr("fill");
					$("[stroke]").removeAttr("stroke");
					$("[style]").removeAttr("style");
				},
				parserOptions: {
					xmlMode: true,
				},
			})
		)
		.pipe(replace("&gt;", ">"))
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: "../sprite.svg",
						example: true,
					},
				},
			})
		)
		.pipe(dest(paths.sprite.dest));
};

export default sprite;
