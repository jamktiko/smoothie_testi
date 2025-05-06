// universal reactivity luokka fruitseille mitä voidaan käyttää missä vaan komponentissa
import type { Fruit } from '$lib/types/fruit';

class Fruits {
	private fruits: Fruit[] = $state([]);

	get() {
		return this.fruits;
	}

	set(x: Fruit[]) {
		this.fruits = x;
	}
}

export const fruits = new Fruits();
