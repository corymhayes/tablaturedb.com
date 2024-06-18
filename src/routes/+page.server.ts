import type { PageLoad } from "./$types";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://pocketbase.tablaturedb.com")


export const load: PageLoad = async ({ fetch, params }) => {
  const user = await pb.collection("users").getOne("ut9ah3hbelduve0")

  return { user }
}