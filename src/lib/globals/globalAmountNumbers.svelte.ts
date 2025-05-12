// universal reactivity luokka ingredients amounteille mitä voidaan käyttää missä vaan komponentissa
// "amountNumbers" on taulukko joka määrittää kuinka monta desimaalilukua ja kokonaislukuja voidaan käyttää kun luodaan uuden smoothien ainesosia
class AmountNumbers {
	private amountNumbers: number[] = $state([]);

	constructor(mihinAstiDesimaaleja: number, mihinAstiLukuja: number) {
		for (let i = 0.25; i <= mihinAstiDesimaaleja; i += 0.25) {
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

export const amountNumbers = new AmountNumbers(4, 25);
