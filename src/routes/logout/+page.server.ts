import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	default: async ({ locals }) => {
		console.log("HER");
		locals.pb.authStore.clear();
		locals.user = null;
		redirect(303, "/");
	}
};
