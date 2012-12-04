/*jslint node:true*/

/**
 * Merges to objects together, favoring the second object's properties.
 *
 * Details:
 * Overwrites `first` properties with `second` properties and adds `second` properties if missing in `first`
 *
 * @param  {Object} first
 * @param  {Object} second
 * @return {Object} The merged objects
 */
function extend(first, second) {
	'use strict';

	var prop,
		result = {};

	for (prop in first) {
		if (first.hasOwnProperty(prop)) {
			result[prop] = first[prop];
		}
	}

	for (prop in second) {
		if (second.hasOwnProperty(prop)) {
			result[prop] = second[prop];
		}
	}

	return result;

}

module.exports = extend;
