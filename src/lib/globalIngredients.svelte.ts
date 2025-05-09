// universal reactivity luokka ingredientseille mitä voidaan käyttää missä vaan komponentissa
// "ingredients" on taulukko joka sisältää kaikki Ingredient-objektit
import type { Ingredient } from '$lib/types/ingredient';

class Ingredients {
	private ingredients: Ingredient[] = $state([]);

	get() {
		return this.ingredients;
	}

	set(x: Ingredient[]) {
		this.ingredients = x;
	}
}

export const ingredients = new Ingredients();
