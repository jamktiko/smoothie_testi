// smoothies universal reactivityllä tehtynä
import type { Smoothie } from '$lib/types/smoothie';

class Smoothies {
	private smoothies: Smoothie[] = $state([]);

	// palauttaa kaikki smoothies
	get() {
		return this.smoothies;
	}

	// jos halutaan päivittää smoothies-muuttujaa
	set(x: Smoothie[]) {
		this.smoothies = x;
	}
}

export const globalSmoothies = new Smoothies();
