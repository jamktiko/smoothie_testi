class AmountNumbers {
	private amountNumbers: number[] = $state([]);

	constructor(mihinAstiDesimaaleja: number, mihinAstiLukuja: number) {
		for (let i = 0; i <= mihinAstiDesimaaleja; i += 0.25) {
			this.amountNumbers.push(i);
		}

		for (let i = mihinAstiDesimaaleja + 1; i <= mihinAstiLukuja; i++) {
			this.amountNumbers.push(i);
		}
	}

	get() {
		return this.amountNumbers;
	}
}

export const amountNumbers = new AmountNumbers(3, 25);
