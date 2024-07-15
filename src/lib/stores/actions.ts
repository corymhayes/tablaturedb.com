import { writable } from "svelte/store";

export const addTab = writable(false);
export const editTab = writable(false);
export const deleteTab = writable(false);
export const tabInfo = writable([]);
export const showSettings = writable(false);
