<script lang="ts">
	import "../app.css";
	import type { PageData } from "./$types";

	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";
	import { currentUser } from "$lib/stores/user";

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
		<Button>Logout</Button>
	</form>
{/if}

<slot />
