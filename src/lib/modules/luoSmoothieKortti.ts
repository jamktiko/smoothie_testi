// ----------------------- IMPORTIT ---------------------------

import type { Smoothie } from '$lib/types/smoothie';
import type { NutritionInfo } from '$lib/types/nutritionInfo';
import type { SmoothieKortti } from '$lib/types/smoothieKortti';
import { ingredients as globalIngredients } from '$lib/globals/globalIngredients.svelte';
import { smoothieKortit as globalSmoothieKortit } from '$lib/globals/globalSmoothieKortit.svelte';

// ----------------------- FUNKTIOT ---------------------------

// luo SmoothieKortin ja lisää sen SmoothieKortit taulukkoon
export const luoSmoothieKortti = (smoothie: Smoothie, lisataankoAlkuun: boolean = false) => {
	const uusiSmoothieKortti: SmoothieKortti = {
		ID: smoothie.id,
		smoothie: smoothie,
		ainesosat: [],
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

		const loytynytIngredient = globalIngredients.get().find((fruit) => {
			return fruit.name === ingredient;
		});

		uusiSmoothieKortti.ainesosat.push(loytynytIngredient?.name);
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

// laskee SmoothienKortin ravintoarvojen yhteenlasketut arvot
const laskeRavintoarvotYhteensa = (ravintoarvot: NutritionInfo[], maara: number[]) => {
	const yhteensa = {
		calories: 0,
		carbohydrates: 0,
		protein: 0,
		fat: 0,
		sugar: 0
	};

	for (let i = 0; i < ravintoarvot.length; i++) {
		yhteensa.calories += ravintoarvot[i].calories * maara[i];
		yhteensa.carbohydrates += ravintoarvot[i].carbohydrates * maara[i];
		yhteensa.protein += ravintoarvot[i].protein * maara[i];
		yhteensa.fat += ravintoarvot[i].fat * maara[i];
		yhteensa.sugar += ravintoarvot[i].sugar * maara[i];
	}
	return yhteensa;
};
