import type { Actions, PageServerLoad } from "./$types";

import { loginSchema, signupSchema } from "$lib/schema";
import { fail, superValidate, setError } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	const loginForm = await superValidate(zod(loginSchema));
	const signupForm = await superValidate(zod(signupSchema));

	return { loginForm, signupForm };
};

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb
				.collection("users")
				.authWithPassword(form.data.email, form.data.password);
		} catch {
			return setError(form, "password", "Email and/or password do not match");
		}

		redirect(303, "/tabs");
	},
	signup: async ({ locals, request }) => {
		const form = await superValidate(request, zod(signupSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection("users").create({
				firstName: form.data.firstName || null,
				lastName: form.data.lastName || null,
				email: form.data.email,
				emailVisibility: true,
				password: form.data.password,
				passwordConfirm: form.data.confirmPassword
			});
			await locals.pb
				.collection("users")
				.authWithPassword(form.data.email, form.data.password);
		} catch (e) {
			console.log(e);
			return setError(form, "email", "User already exists");
		}

		redirect(303, "/tabs");
	}
};
