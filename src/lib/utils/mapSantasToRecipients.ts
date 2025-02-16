/* eslint-disable prefer-const */
export function mapSantasToRecipients(userIds: number[], lastYearMap: Map<number, number>) {
	let santasToRecipients = new Map<number, number>();
	let recipients: number[] = [...userIds];
	for (const santaId of userIds) {
		if (recipients.length === 0) {
			return new Map();
		} else if (recipients.length === 1) {
			if (recipients[0] === lastYearMap.get(santaId) || recipients[0] === santaId) {
				return new Map();
			}
		}

		// randomly chose a recipient
		const randomIndex: number = getRandomRecipientIndex(recipients, lastYearMap, santaId);
		santasToRecipients.set(santaId, recipients[randomIndex]);
		recipients.splice(randomIndex, 1);
	}

	return santasToRecipients;
}

function getRandomRecipientIndex(
	recipients: number[],
	lastYearMap: Map<number, number>,
	santaId: number
): number {
	const randomIndex = Math.floor(Math.random() * recipients.length);

	// if it matches the recipient from last year, then choose another
	if (recipients[randomIndex] === lastYearMap.get(santaId) || recipients[randomIndex] === santaId) {
		return getRandomRecipientIndex(recipients, lastYearMap, santaId);
	} else {
		return randomIndex;
	}
}
