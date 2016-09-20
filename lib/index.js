
'use strict';

/**
 * Tribble SASS plugin
 */

const path = require('path');
const plugin = require('tribble-plugin');
const sass = require('node-sass');

module.exports = plugin(
	[plugin.types.scss, plugin.types.sass], // input file type
	plugin.types.css, // output file type
	(file, done) => {
		const result = sass.renderSync({
			data: file.data,
			includePaths: [path.dirname(file.fullPath)],
			error: () => done(file),
		});
		Object.assign(file, { type: plugin.types.css, data: result.css.toString('utf8') });
		done(file);
	}
);
