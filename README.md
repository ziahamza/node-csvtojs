# csvtojs
NPM module to convert CSV data to an importable CommonJS module. Each row is exported as an object.
The first row value is used as the object key, and the row values are object properties of the
exported row.


## Installation
```
npm install -g csvtojs
```

## Example
sample.csv
```
key,version1,version2
num_builds,2,10
speed,200,10
```
Convert using the following command
```
csvtojs ./sample.csv
```
This will generate the following javascript in the file `sample.js`
```
module.exports = {
	num_builds: {
		version1: "2",
		version2: "10",
	},
	speed: {
		version1: "200",
		version2: "10",
	},
};
```


