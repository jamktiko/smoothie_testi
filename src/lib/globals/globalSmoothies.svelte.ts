// universal reactivity luokka smoothieille mitä voidaan käyttää missä vaan komponentissa
// "smoothies" on taulukko joka sisältää kaikki smoothie-objektit
import type { Smoothie } from '$lib/types/smoothie';

class Smoothies {
	private smoothies: Smoothie[] = $state([]);

	get() {
		return this.smoothies;
	}

	set(x: Smoothie[]) {
		this.smoothies = x;
	}
}

export const smoothies = new Smoothies();
