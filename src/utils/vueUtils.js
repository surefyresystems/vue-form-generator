import Vue from "vue";


// taken from https://github.com/bhoriuchi/vue-deepset/blob/master/src/index.js
function isNumberLike(value) {
	return String(value).match(/^\d+$/);
}

function toPath(pathString) {
	if (Array.isArray(pathString)) return pathString;
	if (typeof pathString === "number") return [pathString];
	pathString = String(pathString);

	// taken from lodash - https://github.com/lodash/lodash
	let pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
	let pathArray = [];

	pathString.replace(pathRx, (match, number, quote, string) => {
		pathArray.push(
			quote
				? string
				: number !== undefined
				? Number(number)
				: match
		);
		return pathArray[pathArray.length - 1];
	});
	return pathArray;
}

function hasOwnProperty(object, property) {
	return Object.prototype.hasOwnProperty.call(object, property);
}

export function vueSet(obj, path, value) {
	let fields = Array.isArray(path) ? path : toPath(path);
	let prop = fields.shift();

	if (!fields.length) return Vue.set(obj, prop, value);
	if (!hasOwnProperty(obj, prop) || obj[prop] === null) {
		const objVal = fields.length >= 1 && isNumberLike(fields[0]) ? [] : {};
		Vue.set(obj, prop, objVal);
	}
	vueSet(obj[prop], fields, value);
}

export function vueDelete(obj, path) {
	let fields = Array.isArray(path) ? path : toPath(path);
	const prop = fields.shift();

	if (!obj[prop]) {
		return;
	}
	if (!fields.length) {
		Vue.delete(obj, prop);
		return;
	}
	vueDelete(obj[prop], fields);
}



