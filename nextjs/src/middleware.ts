import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware({ debug: true });

export const config = {
  matcher: [
    "/",
    "/users/:path*",
    "/settings/:path*",
    "/((?!_not-found|auth|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
