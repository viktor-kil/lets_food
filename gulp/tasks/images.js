import { src, dest } from "gulp";
import plumber from "gulp-plumber";
import newer from "gulp-newer";
import gulpIf from "gulp-if";

import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";
import avif from "gulp-avif";
import webp from "gulp-webp";

import paths from "../config/path.js";
import { app, showNotify } from "../config/app.js";

const images = () => {
	return (
		src(paths.images.src, { encoding: false })
			.pipe(plumber(showNotify("Pug")))
			.pipe(newer(paths.images.dest))
			.pipe(avif(app.imageAvif))
			.pipe(dest(paths.images.dest))

			// webp
			.pipe(src(paths.images.src, { encoding: false }))
			.pipe(newer(paths.images.dest))
			.pipe(webp(app.imageWebp))
			.pipe(dest(paths.images.dest))

			// jpg, png, svg
			.pipe(src([paths.images.src, paths.images.svg], { encoding: false }))
			.pipe(newer(paths.images.dest))
			.pipe(
				gulpIf(
					app.isProd,
					imagemin({ verbose: true }, [
						gifsicle(app.imageMinGif),
						mozjpeg(app.imageMinJpeg),
						optipng(app.imageMinPng),
						svgo(app.imageMinSvg),
					])
				)
			)
			.pipe(dest(paths.images.dest))
	);
};

export default images;
