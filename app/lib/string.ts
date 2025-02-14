export function stringCipher(s: string, n = 3): string {
	return s
		.split("")
		.map((char) => {
			const code = char.charCodeAt(0);
			if (code >= 32 && code <= 126) {
				// Keep within printable ASCII range (32-126)
				const shifted = ((code - 32 + n) % 95) + 32;
				return String.fromCharCode(shifted);
			}
			return char;
		})
		.join("");
}
