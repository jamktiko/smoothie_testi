// fruits universal reactivityllä tehtynä
import type { Fruit } from '$lib/types/fruit';

class Fruits {
	private fruits: Fruit[] = $state([]);

	// palauttaa kaikki fruits
	get() {
		return this.fruits;
	}

	// jos halutaan päivittää fruits muuttujaa
	set(x: Fruit[]) {
		this.fruits = x;
	}
}

export const globalFruits = new Fruits();
