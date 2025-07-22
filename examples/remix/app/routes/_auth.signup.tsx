import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getSignUpUrl } from "@workos-inc/authkit-remix";

export async function loader(_args: LoaderFunctionArgs) {
  const signUpUrl = await getSignUpUrl();
  return redirect(signUpUrl);
}
