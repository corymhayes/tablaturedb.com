import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { pb } from "$lib/pocketbase";
import { message, fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { addTabSchema, updateTabSchema } from "$lib/schema";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user == null) {
		redirect(303, "/");
	}

	const addTabForm = await superValidate(zod(addTabSchema));
	const updateTabForm = await superValidate(zod(updateTabSchema));

	const records = await pb.collection("tabs").getFullList({
		filter: `users.id ?= "${locals.user.id}"`,
		sort: "song"
	});

	return { records, addTabForm, updateTabForm };
};

export const actions: Actions = {
	addTab: async ({ locals, request }) => {
		const addTabForm = await superValidate(request, zod(addTabSchema));

		if (!addTabForm.valid) {
			return fail(400, { addTabForm });
		}

		try {
			await locals.pb.collection("tabs").create({
				song: addTabForm.data.song || null,
				artist: addTabForm.data.artist || null,
				tuning: addTabForm.data.tuning || null,
				instrument: addTabForm.data.instrument || null,
				users: locals.user.id,
				link: addTabForm.data.link || null
			});
		} catch (e) {
			console.log(e);
			throw e;
		}

		return message(addTabForm, "Tab created!");
	},
	updateTab: async ({ locals, request }) => {
		const updateTabForm = await superValidate(request, zod(updateTabSchema));

		if (!updateTabForm.valid) {
			return fail(400, { updateTabForm });
		}

		try {
			await locals.pb.collection("tabs").update(`${updateTabForm.data.id}`, {
				song: updateTabForm.data.song || null,
				artist: updateTabForm.data.artist || null,
				tuning: updateTabForm.data.tuning || null,
				instrument: updateTabForm.data.instrument || null,
				users: locals.user.id,
				link: updateTabForm.data.link || null
			});
		} catch (e) {
			console.log(e);
			throw e;
		}

		return message(updateTabForm, "Tab updated!");
	},
	deleteTab: async ({ locals, request }) => {
		const updateTabForm = await superValidate(request, zod(updateTabSchema));

		if (!updateTabForm.valid) {
			return fail(400, { updateTabForm });
		}

		try {
			await locals.pb.collection("tabs").delete(`${updateTabForm.data.id}`);
		} catch (e) {
			console.log(e);
			throw e;
		}

		return message(updateTabForm, "Tab deleted!");
	}
};
