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
