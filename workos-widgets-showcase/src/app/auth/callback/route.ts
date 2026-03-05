import { handleAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export const GET = handleAuth({
  returnPathname: "/",
  onError: async ({ error }) => {
    console.error("Auth error:", error);
    const params = new URLSearchParams();
    params.set("error", btoa("authkit_error"));
    return redirect(`/auth/error?${params.toString()}`);
  },
});
