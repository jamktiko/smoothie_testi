interface SmoothieKortti {
	ID: number;
	smoothie: Smoothie;
	hedelmat: Fruit[];
	hedelmatMaara: number[];
	ravintoarvot: NutritionInfo[];
	ravintoarvotYht: NutritionInfo;
	pic: string;
	valmistusAika: number;
	notes: string;
}

export type { SmoothieKortti };
