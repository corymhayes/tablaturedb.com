<script lang="ts">
	import { db, type Tuning } from "$lib/db";
	import { liveQuery } from "dexie";

	import TIDialog from "$lib/components/TIDialog.svelte";

	import * as Select from "$lib/components/ui/select";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";

	let tunings = liveQuery(() => db.tunings.toArray());

	let tuning = "";

	const addTuning = async () => {
		try {
			await db.tunings.add({
				name: tuning
			});
		} catch (e) {
			console.log(e);
		}
	};
</script>

<TIDialog />
