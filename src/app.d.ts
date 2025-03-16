// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string | null;
		}
		interface Locals {
			sessionId: number,
			user: {
				userId: number,
				username: string,
				birthdate: Date
			} | null;
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
