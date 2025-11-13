import { handleAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

// export const GET = handleAuth({ returnPathname: "/users" });

export const GET = handleAuth({
  onError: async ({ error }) => {
    console.log({
      error,
      type: typeof error,
      instanceof: error instanceof Error,
      name: error instanceof Error ? error.name : undefined,
    });

    const params = new URLSearchParams();
    const encodedError = btoa("authkit_error");
    params.set("error", encodedError);

    // TODO: Handle specific error cases
    return redirect(`/auth/error?${params.toString()}`);
  },
});
