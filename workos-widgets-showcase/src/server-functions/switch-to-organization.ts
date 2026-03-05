import { refreshSession } from "@workos-inc/authkit-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { workos } from "~/app/workos";

export const switchToOrganization = async ({
  organizationId,
  pathname,
}: {
  organizationId: string;
  pathname: string;
}) => {
  "use server";

  try {
    await refreshSession({ organizationId, ensureSignedIn: true });
  } catch (err: unknown) {
    const error = err as { rawData?: { authkit_redirect_url?: string }; error?: string };
    if (error.rawData?.authkit_redirect_url) {
      redirect(error.rawData.authkit_redirect_url);
    } else {
      const args = {
        organizationId,
        clientId: process.env.WORKOS_CLIENT_ID!,
        provider: "authkit",
        redirectUri: "http://localhost:4040/auth/callback",
      };

      if (error.error === "sso_required" || error.error === "mfa_enrollment") {
        const url = workos.userManagement.getAuthorizationUrl(args);
        redirect(url);
      }
      throw err;
    }
  }

  revalidatePath(pathname);
  redirect(pathname);
};
