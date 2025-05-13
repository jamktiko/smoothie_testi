// universal reactivity luokka smoothieille mitä voidaan käyttää missä vaan komponentissa
import type { Smoothie } from '$lib/types/smoothie';

class globalLocalStorage {
	private inventory: Smoothie[] = $state([]);

	get() {
		return this.inventory;
	}

	set(x: Smoothie[]) {
		this.inventory = x;
	}
}

export const globalLocalStorage2 = new globalLocalStorage();
