import type { SmoothieKortti } from '$lib/types/smoothieKortti';
import { fruits as globalFruits } from '$lib/globalFruits.svelte';
import { smoothieKortit as globalSmoothieKortit } from '$lib/globalSmoothieKortit.svelte';
import type { Smoothie } from '$lib/types/smoothie';
import type { NutritionInfo } from '$lib/types/nutritionInfo';

export const luoSmoothieKortti = (smoothie: Smoothie, lisataankoAlkuun: boolean = false) => {
	const uusiSmoothieKortti: SmoothieKortti = {
		ID: smoothie.id,
		smoothie: smoothie,
		hedelmat: [],
		hedelmatMaara: smoothie.ingredientsAmount,
		ravintoarvot: [],
		ravintoarvotYht: {
			calories: 0,
			carbohydrates: 0,
			protein: 0,
			fat: 0,
			sugar: 0
		},
		pic: smoothie.pic,
		valmistusAika: smoothie.preparationTimeMinutes,
		notes: smoothie.notes
	};

	for (let i = 0; i < smoothie.ingredients.length; i++) {
		const ingredient = smoothie.ingredients[i];

		const loytynytIngredient = globalFruits.get().find((fruit) => {
			return fruit.name === ingredient;
		});

		uusiSmoothieKortti.hedelmat.push(loytynytIngredient?.name);
		uusiSmoothieKortti.ravintoarvot.push(loytynytIngredient?.nutritions);
	}
	uusiSmoothieKortti.ravintoarvotYht = laskeRavintoarvotYhteensa(
		uusiSmoothieKortti.ravintoarvot,
		uusiSmoothieKortti.hedelmatMaara
	);

	if (lisataankoAlkuun) {
		globalSmoothieKortit.get().unshift(uusiSmoothieKortti);
	} else {
		globalSmoothieKortit.get().push(uusiSmoothieKortti);
	}

	return uusiSmoothieKortti;
};

// laskee smoothienKortin ravintoarvojen yhteenlasketut arvot
const laskeRavintoarvotYhteensa = (ravintoarvot: NutritionInfo[], maara: number[]) => {
	const yhteensa = {
		calories: 0,
		carbohydrates: 0,
		protein: 0,
		fat: 0,
		sugar: 0
	};
	for (let i = 0; i < ravintoarvot.length; i++) {
		for (let j = 0; j < maara[i]; j++) {
			yhteensa.calories += ravintoarvot[i].calories;
			yhteensa.carbohydrates += ravintoarvot[i].carbohydrates;
			yhteensa.protein += ravintoarvot[i].protein;
			yhteensa.fat += ravintoarvot[i].fat;
			yhteensa.sugar += ravintoarvot[i].sugar;
		}
	}
	return yhteensa;
};
