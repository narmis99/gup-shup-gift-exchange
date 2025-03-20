export function computeCountdownValues(futureDate: Date) {
	const now = new Date();
	const diff = futureDate.getTime() - now.getTime();

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
