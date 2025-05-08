export function createSmoothieTime(maxnumber: number) {
	const smoothieTime: number[] = [];
	for (let i = 1; i <= maxnumber; i++) {
		smoothieTime.push(i);
	}

	return smoothieTime;
}
export const SmoothieTime = createSmoothieTime(30);
