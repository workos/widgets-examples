import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getSignUpUrl } from "@workos-inc/authkit-react-router";

export async function loader(_args: LoaderFunctionArgs) {
  const signUpUrl = await getSignUpUrl();
  return redirect(signUpUrl);
}
