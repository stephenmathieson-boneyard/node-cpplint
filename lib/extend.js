/*jslint node:true*/

/**
 * Merges to objects together, favoring the second object's properties.
 *
 * Details:
 * Overwrites `first` properties with `second` properties and adds `second` properties if missing in `first`
 *
 * @param  {Object}  first
 * @param  {Object}  second
 * @param  {Boolean} deep   Deep-extend the objects
 * @return {Object}  The    merged objects
 */
function extend(first, second, deep) {
	'use strict';

	var prop, value,
		result = {};

	// mirror the first object
	for (prop in first) {
		if (first.hasOwnProperty(prop)) {
			result[prop] = first[prop];
		}
	}

	for (prop in second) {
		if (second.hasOwnProperty(prop)) {
			value = second[prop];
			// deep extend an object's objects (when deep is truthy)
			if (typeof value === 'object' && deep) {
				result[prop] = extend(result[prop], second[prop]);
			} else {
				result[prop] = second[prop];
			}
		}
	}

	return result;
}

module.exports = extend;
