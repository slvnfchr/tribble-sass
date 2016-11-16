
'use strict';

/**
 * Tribble SASS plugin
 */

const path = require('path');
const sass = require('node-sass');

module.exports = (input, output) => {
	const file = input.read();
	if (!path.basename(file.fullPath).match(/^_/)) { // ignore partials
		const result = sass.renderSync({
			data: file.contents,
			includePaths: [path.dirname(file.fullPath)],
			error: () => {},
		});
		Object.assign(file, {
			fullPath: file.fullPath.replace(/\.[^\.]+$/i, '.css'), // change extension
			contents: result.css.toString('utf8'), // update data
		});
		output.send(file);
	}
};
