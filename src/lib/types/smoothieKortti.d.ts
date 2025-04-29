interface SmoothieKortti {
	ID: number;
	smoothie: Smoothie;
	hedelmat: Fruit[];
	ravintoarvot: NutritionInfo[];
	ravintoarvotYht: NutritionInfo;
	pic: string;
}

export type { SmoothieKortti };
