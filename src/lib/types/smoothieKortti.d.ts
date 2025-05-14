interface SmoothieKortti {
	ID: number;
	smoothie: Smoothie;
	ainesosat: Fruit[];
	ainesosatMaara: number[];
	ravintoarvot: NutritionInfo[];
	ravintoarvotYht: NutritionInfo;
	pic: string;
	valmistusAika: number;
	notes: string;
}

export type { SmoothieKortti };
