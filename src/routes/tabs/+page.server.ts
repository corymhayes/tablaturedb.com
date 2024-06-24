import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { pb } from "$lib/pocketbase";

export const load: PageServerLoad = async ({ locals }) => {
	const records = await pb.collection("tabs").getFullList({
		filter: `users.id ?= "${locals.user.id}"`,
		sort: "song"
	});

	return { records };
};
