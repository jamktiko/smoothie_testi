// universal reactivity luokka smoothie-korteille mitä voidaan käyttää missä vaan komponentissa
import type { SmoothieKortti } from '$lib/types/smoothieKortti';

class SmoothieKortit {
	private smoothieKortit: SmoothieKortti[] = $state([]);

	get() {
		return this.smoothieKortit;
	}

	set(x: SmoothieKortti[]) {
		this.smoothieKortit = x;
	}
}

export const smoothieKortit = new SmoothieKortit();
