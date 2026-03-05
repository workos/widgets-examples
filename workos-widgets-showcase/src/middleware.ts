import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware({ debug: true });

export const config = {
  matcher: [
    "/",
    "/examples/:path*",
    "/((?!_not-found|auth|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
