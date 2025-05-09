// universal reactivity luokka fruitseille mitä voidaan käyttää missä vaan komponentissa
import type { Ingredient } from '$lib/types/ingredient';

class Ingredients {
	private fruits: Ingredient[] = $state([]);

	get() {
		return this.fruits;
	}

	set(x: Ingredient[]) {
		this.fruits = x;
	}
}

export const ingredients = new Ingredients();
