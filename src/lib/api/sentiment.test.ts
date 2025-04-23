import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { analyzeSentiment } from './sentiment';

vi.mock('axios');

describe('analyzeSentiment', () => {
	it('returns correct analysis object', async () => {
		const mockResponse = {
			data: [
				[
					{ label: 'POSITIVE', score: 0.9 },
					{ label: 'NEGATIVE', score: 0.1 }
				]
			]
		};

		(axios.post as any).mockResolvedValue(mockResponse);

		const result = await analyzeSentiment('Stocks are up!', 'fake-token');

		expect(result).toEqual({
			text: 'Stocks are up!',
			label: 'POSITIVE',
			score: 0.9
		});
	});
});
