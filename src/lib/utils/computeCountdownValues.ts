export function computeCountdownValues(birthdate: Date) {
	const month = birthdate.getUTCMonth();
	const day = birthdate.getUTCDate();

	const now = new Date();

	if (now.getMonth() === month && now.getDate() === day) {
		return {
			message: 'Happy Birthday 🎂',
			months: 0,
			days: 0,
			hours: 0,
			minutes: 0
		};
	}

	const currentYear = now.getUTCFullYear();
	const nextBirthday = new Date(currentYear, month, day, 0, 0, 0, 0);

	if (now > nextBirthday) {
		nextBirthday.setFullYear(currentYear + 1);
	}

	// difference in milliseconds
	const diff = nextBirthday.getTime() - now.getTime();

	const remainingMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)); // approximate
	const remainingDays = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
	const remainingHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

	// console.log(`Time until next birthday: ${remainingMonths} months, ${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes.`);
	return {
		months: remainingMonths,
		days: remainingDays,
		hours: remainingHours,
		minutes: remainingMinutes
	};
}
