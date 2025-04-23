export type Analysis = {
	text: string;
	label: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
	score: number;
};
