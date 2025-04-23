import { describe, it, expect } from 'vitest';
import { validateInput } from './input';

describe('validateInput', () => {
	it('returns error if text is empty', () => {
		expect(validateInput('')).toBe('Text field cannot be empty.');
	});

	it('returns error if text exceeds 500 chars', () => {
		const longText = 'a'.repeat(501);
		expect(validateInput(longText)).toBe('Maximum character limit is 500.');
	});

	it('returns null for valid input', () => {
		expect(validateInput('Valid text')).toBeNull();
	});
});
