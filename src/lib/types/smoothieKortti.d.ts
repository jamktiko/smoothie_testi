interface SmoothieKortti {
	ID: number;
	smoothie: Smoothie;
	hedelmat: Fruit[];
	ravintoarvot: NutritionInfo[];
	ravintoarvotYht: NutritionInfo;
	picURL?: string;
}

export type { SmoothieKortti };
