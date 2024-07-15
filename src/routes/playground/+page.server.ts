import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { settingsSchema } from "$lib/schema.js";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
	const settingsForm = await superValidate(zod(settingsSchema));

	return settingsForm;
};
