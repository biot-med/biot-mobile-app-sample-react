// @author - {N.Md Faizaan}
// @email - {aulisius7[at]gmail[dot]com}
// @title - Converts decimal float to binary 32 format float
// @ref - https://en.wikipedia.org/wiki/Single-precision_floating-point_format
// @license - MIT
// https://gist.github.com/aulisius/c0b678f30138aace9978

/**
* float2bin - Convert decimal number to binary32 format
* @param {input} - The number to be converted either in Number or String type
* @return {bin32float} - The binary32 representation 
**/
export function float2bin(num: string) {

	let input = Number(num)
	let bin32exp, bin32mantissa;

	let normalPart = parseInt(Math.abs(input).toString())

	let fracPart = Math.abs(input) - normalPart

	const sign = Math.abs(input) === input ? '0' : '1'
	let base2float = convert2bin(normalPart) + '.' + frac2bin(fracPart)

	let exp = base2float.indexOf('.') - base2float.indexOf('1')
	if (exp > 0){
		exp = exp - 1
	}

	if (exp !== 1) {
		bin32exp = pad(convert2bin(127 + exp), 8, 1)
	}
	else {
		bin32exp = pad('', 8, 1)
	}

	// Get the 23-bit mantissa part
	bin32mantissa = pad(binary32mantissa(base2float, exp), 23, 0)

	// Return the 32-bit binary32 representation
	const bin32float = (bin32exp + bin32mantissa).slice(0, 31)
	return sign + bin32float
}

/**
 * convert2bin - Convert decimal number to binary format
 * @param {input} - The number to be converted
 * @return {bin} - The binary representation
 * */
function convert2bin(input: number) {
	if (input === 0 || input === 1) {
		return '' + input
	}
	let bin = ''
	while (input !== 0) {
		bin = bin + input % 2
		input = parseInt('' + (input / 2))
	}
	return bin.split('').reverse().join('')
}

/**
* frac2bin - Convert fractional part to binary representation 
* @param {input} - The fractional part
* @return {bin} - The binary representation
**/
function frac2bin(input: number) {
	if (input === 0) {
		return '' + input
	}
	let limit = 0
	let bin = ''
	while (input !== 0 && limit < 32) {
		input = input * 2
		if (input >= 1) {
			bin = bin + '1'
			input -= 1
		}
		else {
			bin = bin + '0'
		}
		limit++
	}
	return bin
}

/**
* binary32mantissa - Returns the mantissa from the normalized number
* @param {input} - The normalized number
* @param {exp} - The 'e' value required to get the normalized number
* @return {result} - The mantissa portion 
**/
function binary32mantissa(input: string, exp: number) {
	input = input.replace(/\./, '')
	return (exp > 0) ? input.slice(1, input.length) : input.slice(1 - (exp), input.length)
}

/**
* pad - To pad the number to expected length
* @param {input} - The string to be padded
* @param {total} - The max length of the string
* @param {dir} - The direction to add the padded bits
* @return {result} - The padded String
**/
function pad(input: string, total: number, dir: number) {

	let padLen = total - input.length
	let padStr = ''
	while (padLen-- > 0) {
		padStr = padStr.concat('0')
	}
	return (dir === 1) ? padStr.concat(input) : input.concat(padStr)
}