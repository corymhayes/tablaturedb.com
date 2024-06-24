<script lang="ts">
	import "../app.css";
	import type { PageData } from "./$types";

	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
	import { currentUser } from "$lib/stores/user";

	import * as Form from "$lib/components/ui/form";
	import { Button } from "$lib/components/ui/button";
	import { Toaster } from "$lib/components/ui/sonner";

	export let data: PageData;

	$: currentUser.set(data.user);
</script>

<Toaster />

{#if $currentUser}
	<form
		method="POST"
		action="/logout"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.clear();
				await applyAction(result);
			};
		}}
	>
		<Form.Button>Logout</Form.Button>
	</form>
{/if}

<slot />
