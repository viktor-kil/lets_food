import { deleteAsync } from 'del';

import paths from '../config/path.js';

const clean = () => {
	return deleteAsync(paths.root);
};

export default clean;
