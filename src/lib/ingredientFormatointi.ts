// tämä funktio testaa onko ingredientin määrä kokonaisluku vai desimaaliluku ja palauttaa vastaavan ½, ¼ tai ¾
export function ingredientFormatointi(ingredientMaara: number) {
	// jos ingredientin määrä alkaa numerolla nolla, niin ei lisätä nollaa murto-osan eteen
	if (ingredientMaara < 1) {
		return ingredientMaara % 1 === 0
			? ingredientMaara.toString()
			: ingredientMaara % 0.75 === 0
				? `¾`
				: ingredientMaara % 0.5 === 0
					? `½`
					: ingredientMaara % 0.25 === 0
						? `¼`
						: null;
	} else {
		// jos ingredientin määrä alkaa numerolla yksi tai suurempi, niin lisätään kokonaisluku ennen murto-osaa
		return ingredientMaara % 1 === 0
			? ingredientMaara.toString()
			: ingredientMaara % 1 === 0.75
				? `${Math.floor(ingredientMaara)}¾`
				: ingredientMaara % 1 === 0.5
					? `${Math.floor(ingredientMaara)}½`
					: ingredientMaara % 1 === 0.25
						? `${Math.floor(ingredientMaara)}¼`
						: null;
	}
}
