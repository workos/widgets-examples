import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),

  route("auth/callback", "routes/auth.callback.ts"),

  route("signin", "routes/_auth.signin.tsx"),
  route("signout", "routes/_auth.signout.tsx"),
  route("signup", "routes/_auth.signup.tsx"),

  layout("routes/_dashboard.tsx", [
    route("dashboard", "routes/_dashboard.dashboard.tsx"),
    route("users", "routes/_dashboard.users.tsx"),
  ]),
] satisfies RouteConfig;
