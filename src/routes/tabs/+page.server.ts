import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { pb } from "$lib/pocketbase";
import { message, fail, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { addTabSchema, updateTabSchema, settingsSchema, tuningSchema, instrumentSchema } from "$lib/schema";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user == null) {
		redirect(303, "/");
	}

	const addTabForm = await superValidate(zod(addTabSchema));
	const updateTabForm = await superValidate(zod(updateTabSchema));
	const settingsForm = await superValidate(zod(settingsSchema));
	const tuningForm = await superValidate(zod(tuningSchema));

	const records = await pb.collection("tabs").getFullList({
		filter: `users.id ?= "${locals.user.id}"`
		// sort: "song"
	});

	return { records, addTabForm, updateTabForm, settingsForm, tuningForm };
};

export const actions: Actions = {
	addTab: async ({ locals, request }) => {
		const addTabForm = await superValidate(request, zod(addTabSchema));

		if (!addTabForm.valid) {
			return fail(400, { addTabForm });
		}

		try {
			await locals.pb.collection("tabs").create({
				song: addTabForm.data.song.toLowerCase() || null,
				artist: addTabForm.data.artist.toLowerCase() || null,
				tuning: addTabForm.data.tuning.toLowerCase() || null,
				instrument: addTabForm.data.instrument.toLowerCase() || null,
				users: locals.user.id,
				link: addTabForm.data.link.toLowerCase() || null
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
				song: updateTabForm.data.song.toLowerCase() || null,
				artist: updateTabForm.data.artist.toLowerCase() || null,
				tuning: updateTabForm.data.tuning.toLowerCase() || null,
				instrument: updateTabForm.data.instrument.toLowerCase() || null,
				users: locals.user.id,
				link: updateTabForm.data.link.toLowerCase() || null
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
	},
	addTuning: async ({ locals, request }) => {
		const tuningForm = await superValidate(request, zod(tuningSchema));

		const records = await pb.collection("users").getOne(`${locals.user.id}`);
		const tunings = records.settings.tunings;
		tunings.push(tuningForm.data.tuning);
		records.settings.tunings = tunings;

		try {
			await locals.pb.collection("users").update(`${locals.user.id}`, {
				settings: records.settings
			});
		} catch (e) {
			console.log(e);
		}

		return message(tuningForm, "Tuning added!");
	},
	deleteTuning: async ({ locals, request }) => {
		const tuningForm = await superValidate(request, zod(tuningSchema));

		const records = await pb.collection("users").getOne(`${locals.user.id}`);
		const tunings = records.settings.tunings;
		const tuningIndex = tunings.indexOf(tuningForm.data.tuning);
		tunings.splice(tuningIndex, 1);

		records.settings.tunings = tunings;

		try {
			await locals.pb.collection("users").update(`${locals.user.id}`, {
				settings: records.settings
			});
		} catch (e) {
			console.log(e);
		}

		return message(tuningForm, "Tuning deleted!");
	},
	addInstrument: async ({ locals, request }) => {
		const instrumentForm = await superValidate(request, zod(instrumentSchema));

		const records = await pb.collection("users").getOne(`${locals.user.id}`);
		const instruments = records.settings.instruments;
		instruments.push(instrumentForm.data.instrument);
		records.settings.instruments = instruments;

		try {
			await locals.pb.collection("users").update(`${locals.user.id}`, {
				settings: records.settings
			});
		} catch (e) {
			console.log(e);
		}

		return message(instrumentForm, "Tuning added!");
	},
	deleteInstrument: async ({ locals, request }) => {
		const instrumentForm = await superValidate(request, zod(instrumentSchema));

		const records = await pb.collection("users").getOne(`${locals.user.id}`);
		const instruments = records.settings.instruments;
		const instrumentIndex = instruments.indexOf(instrumentForm.data.instrument);
		instruments.splice(instrumentIndex, 1);

		records.settings.instruments = instruments;

		try {
			await locals.pb.collection("users").update(`${locals.user.id}`, {
				settings: records.settings
			});
		} catch (e) {
			console.log(e);
		}

		return message(instrumentForm, "Tuning deleted!");
	}
};
