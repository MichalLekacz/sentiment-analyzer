import axios from 'axios';
import type { Analysis } from '$lib/types/analysis';

export async function analyzeSentiment(text: string, token: string): Promise<Analysis> {
	const response = await axios.post(
		'https://api-inference.huggingface.co/models/ProsusAI/finbert',
		{ inputs: text },
		{
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		}
	);

	const data = response.data;

	if (!Array.isArray(data) || !Array.isArray(data[0])) {
		throw new Error('Invalid response from API');
	}

	const sorted = [...data[0]].sort((a, b) => b.score - a.score);
	const [best] = sorted;

	const label = best.label.toUpperCase() as Analysis['label'];

	return {
		text,
		label,
		score: best.score
	};
}
