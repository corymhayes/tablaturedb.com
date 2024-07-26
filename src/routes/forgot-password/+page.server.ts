import type { PageServerLoad } from "./$types.js";
import PocketBase from "pocketbase";

import { forgotPasswordSchema } from "$lib/schema";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

const pb = new PocketBase("https://pocketbase.tablaturedb.com");

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(forgotPasswordSchema));

	return { form };
};

export const actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(forgotPasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// Do something with the validated form.data
		try {
			const pass = await locals.pb.collection("users").getFirstListItem(`email="coryhmc@gmail.com"`);

			if (pass.status != 404) {
				await pb.collection("users").requestPasswordReset(`${form.data.email}`);
			}
		} catch (e) {
			console.log(e);
			return message(form, "Email not found");
		}

		return message(form, "Password reset sent!");
	}
};
