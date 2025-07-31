import type { ActionFunctionArgs } from "react-router";
import { signOut } from "@workos-inc/authkit-react-router";

export async function action(args: ActionFunctionArgs) {
  return await signOut(args.request);
}
