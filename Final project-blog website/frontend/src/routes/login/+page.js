import { goto } from "$app/navigation";
import { browser } from "$app/environment";


//data transfer from parent
export async function load({ parent }) {
  if (!browser) return;
  const { isLoggedIn } = await parent();
  if (isLoggedIn) goto("/", { replaceState: true });
}
