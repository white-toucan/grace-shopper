export const padZeros = (num, length) => {
	let numLength = num.toString().length;
	return Array(length - numLength).fill(0).join('').concat(num);
};

export const convertTime = (timeString) => {
	const months = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December']
	let year = timeString.slice(0, 4);
	let month = months[+timeString.slice(5, 7)];
	let date = timeString.slice(8, 10);
	return `${month} ${date}, ${year}`;
};

export const centsToDollars = (amount) => (amount / 100).toFixed(2);
