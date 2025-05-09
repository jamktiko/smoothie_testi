// universal reactivity luokka smoothieTime mitä voidaan käyttää missä vaan komponentissa
// smoothieTime on taulukko joka sisältää numerot maxnumber asti
function createSmoothieTime(maxnumber: number) {
	const smoothieTime: number[] = [];
	for (let i = 1; i <= maxnumber; i++) {
		smoothieTime.push(i);
	}

	return smoothieTime;
}
export const smoothieTime = createSmoothieTime(30);
