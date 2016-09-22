
'use strict';

/**
 * Tribble SASS plugin
 */

const path = require('path');
const plugin = require('tribble-plugin');
const sass = require('node-sass');

module.exports = plugin(
	[plugin.mediatypes.scss, plugin.mediatypes.sass], // input file type
	plugin.mediatypes.css, // output file type
	plugin.types.PREPROCESSOR,
	function(input, output, error) {
		const file = input.read();
		const result = sass.renderSync({
			data: file.data,
			includePaths: [path.dirname(file.fullPath)],
			error: (err) => error.write(err),
		});
		Object.assign(file, { type: plugin.mediatypes.css, data: result.css.toString('utf8') });
		output.write(file);
	}
);
