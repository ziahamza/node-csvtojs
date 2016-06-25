// @flow
var parse = require('csv-parse');
var fs = require('fs');

function toKeyName(name) {
	return name.replace(' ', '_');
}

function toVal(val) {
	return '"' + val + '"';
}

module.exports = function(srcPath, outPath, cb) {
	fs.readFile(srcPath, function(err, data) {
		if (err) {
			return cb(err);
		}

		parse(data.toString(), function(err, data) {
			if (err) {
				return cb(err);
			}

			var fileStr = [
				'// @flow',
				'module.exports = {\n'
			].join('\n');

			var columns = data[0];

			fileStr += data.slice(1).map(function(row) {
				if (!row.length) {
					return '';
				}

				var str = '\t' + toKeyName(row[0]) + ': ';
				if (row.length == 1) {
					return str + 'true,';
				}

				str += '{\n';

				str += row.slice(1).map(function(val, index) {
					return '\t\t' + toKeyName(columns[index + 1]) + ': ' + toVal(val) + ',';
				}).join('\n') + '\n';

				str += '\t},';

				return str;
			}).join('\n') + '\n';

			fileStr += '};';

			fs.writeFile(outPath, fileStr, cb);
		});
	});
};
