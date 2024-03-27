import * as base64 from "base-64";
import * as numUtils from "./number-utils";

/**
 * This function generates a base64 encoded string of a triangle waveform from 1 to 50 as a 32-bit integer
 * @param {durationInSeconds} - The duration of the waveform in seconds
 * @param {sampleRate} - The sample rate of the waveform
 * @return {base64String} - The base64 encoded string of the waveform
 */
export function generateIntegerTriangleWaveform(durationInSeconds: number, sampleRate: number): string {
	const numSamples = durationInSeconds * sampleRate;
	const halfPeriod = numSamples / 2;
	const waveform: string[] = [];
	const decimalSamples: string[] = [];

	for (let i = 0; i < numSamples; i++) {
		if (i < halfPeriod) {
			let v = Math.floor(1 + (i / halfPeriod) * 49);
			waveform.push((v >>> 0).toString(2).padStart(32, "0"));
			decimalSamples.push(v.toFixed(1));
		} else {
			let v = Math.floor(1 + ((numSamples - i) / halfPeriod) * 49);
			decimalSamples.push(v.toFixed(1));
			waveform.push((v >>> 0).toString(2).padStart(32, "0"));
		}
	}
	let concated: number[] = [];
	for (let num of waveform) {
		let byteArray = new Uint8Array(4);
		for (let i = 0; i < 4; i++) {
			byteArray[i] = parseInt(num.substr(i * 8, 8), 2);
		}
		concated = [...concated, ...byteArray];
	}

	const base64String = base64.encode(String.fromCharCode(...concated));

	return base64String;
}

/**
 * This function generates a base64 encoded string of a triangle waveform from 1.0 to 50.0 as a 32-bit decimal
 * @param {durationInSeconds} - The duration of the waveform in seconds
 * @param {sampleRate} - The sample rate of the waveform
 * @return {base64String} - The base64 encoded string of the waveform
 */
export function generateDecimalTriangleWaveform(durationInSeconds: number, sampleRate: number): string {
	const numSamples = durationInSeconds * sampleRate;
	const halfPeriod = numSamples / 2;
	const waveform: string[] = [];
	const decimalSamples: string[] = [];

	for (let i = 0; i < numSamples; i++) {
		if (i < halfPeriod) {
			let v = Math.floor(1 + (i / halfPeriod) * 49);
			waveform.push((v >>> 0).toString(2).padStart(32, "0"));
			decimalSamples.push(v.toFixed(1));
		} else {
			let v = Math.floor(1 + ((numSamples - i) / halfPeriod) * 49);
			decimalSamples.push(v.toFixed(1));
			waveform.push((v >>> 0).toString(2).padStart(32, "0"));
		}
	}
	let concated: number[] = [];
	for (let num of decimalSamples) {
		let res = numUtils.float2bin(num);
		let byteArray = new Uint8Array(4);
		for (let i = 0; i < 4; i++) {
			byteArray[i] = parseInt(res.substr(i * 8, 8), 2);
		}
		concated = [...concated, ...byteArray];
	}
	const base64String = base64.encode(String.fromCharCode(...concated));

	return base64String;
}