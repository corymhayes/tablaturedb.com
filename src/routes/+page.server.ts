import type { PageLoad } from "./$types";
// import PocketBase from "pocketbase";

import { loginSchema, signupSchema } from "$lib/schema";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

// const pb = new PocketBase("https://pocketbase.tablaturedb.com");

export const load: PageLoad = async ({ fetch, params }) => {
	const loginForm = await superValidate(zod(loginSchema));
	const signupForm = await superValidate(zod(signupSchema));

	return { loginForm, signupForm };
};
