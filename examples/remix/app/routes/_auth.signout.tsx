import type { ActionFunctionArgs } from "@remix-run/node";
import { signOut } from "@workos-inc/authkit-remix";

export async function action(args: ActionFunctionArgs) {
  return await signOut(args.request);
}
