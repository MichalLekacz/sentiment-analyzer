export function validateInput(text: string): string | null {
	if (!text.trim()) {
		return 'Text field cannot be empty.';
	}
	if (text.length > 500) {
		return 'Maximum character limit is 500.';
	}
	return null;
}
