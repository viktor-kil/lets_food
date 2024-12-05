import { parallel, series, watch } from "gulp";
import browserSync from "browser-sync";

import clean from "./gulp/tasks/clean.js";
import images from "./gulp/tasks/images.js";
import sprite from "./gulp/tasks/sprite.js";
import fonts from "./gulp/tasks/fonts.js";
import pugs from "./gulp/tasks/pug.js";
import scss from "./gulp/tasks/scss.js";
import scripts from "./gulp/tasks/scripts.js";
import media from "./gulp/tasks/media.js";

import paths from "./gulp/config/path.js";
import { app } from "./gulp/config/app.js";

const watcher = () => {
	browserSync.init({
		server: {
			baseDir: paths.root,
		},
		notify: false,
	});

	watch(paths.images.watch, images).on("all", browserSync.reload);
	watch(paths.sprite.watch, sprite).on("all", browserSync.reload);
	watch(paths.fonts.watch, fonts).on("all", browserSync.reload);
	watch(paths.pug.watch, pugs).on("all", browserSync.reload);
	watch(paths.scss.watch, scss).on("all", browserSync.reload);
	watch(paths.scripts.watch, scripts).on("all", browserSync.reload);
	watch(paths.media.watch, media).on("all", browserSync.reload);
};

const build = series(clean, parallel(images, sprite, fonts, pugs, scss, scripts, media));
const dev = series(build, watcher);

export { clean };
export { images };
export { sprite };
export { fonts };
export { pugs };
export { scss };
export { scripts };
export { media };

export default app.isProd ? build : dev;
