<script lang="ts">
	import type { PageData } from "./$types";
	import * as Form from "$lib/components/ui/form";

	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$lib/pocketbase";

	import { currentUser } from "$lib/stores/user";
	export let data: PageData;

	// $: currentUser.set(data.user);
</script>

<!-- {#if $currentUser} -->
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
	<Form.Button variant="link">Logout</Form.Button>
</form>
<!-- {/if} -->
