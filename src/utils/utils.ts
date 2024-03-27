import { PixelRatio } from 'react-native';

/**
 * Converts a percentage value to density pixels (DP) relative to a specified dimension (width or height).
 *
 * @param {string | number} percent - The percentage value to convert. Can be a string or a number.
 * @param {number} relativeTo - The dimension (width or height) to which the percentage should be relative.
 * @returns {number} - The converted value in density pixels (DP) or the original input if it's not a percent string.
 * @example
 * // Convert 50% of the width to DP
 * const dpWidth = percentToDP('50%', screenWidth);
 *
 * // Convert a specific number to DP (returns the same number)
 * const fixedValue = percentToDP(25, screenHeight);
 */
export const percentToDP = (percent: string | number, relativeTo: number) => {
	if (typeof percent === 'string') {
		const elemDimNumber = parseFloat(percent);
		return PixelRatio.roundToNearestPixel((relativeTo * elemDimNumber) / 100);
	}
	return percent;
}
