import { createBrowserRouter } from "react-router";
// routes
import * as RootRoute from "./root";
import * as IndexRoute from "./routes/_index";
import * as AuthCallbackRoute from "./routes/auth.callback";
import * as SignInRoute from "./routes/_auth.signin";
import * as DashboardLayoutRoute from "./routes/_dashboard";
import * as DashboardRoute from "./routes/_dashboard.dashboard";
import * as UsersRoute from "./routes/_dashboard.users";

export const router = createBrowserRouter([
  {
    id: "root",
    Component: RootRoute.default,
    ErrorBoundary: RootRoute.ErrorBoundary,
    children: [
      {
        id: "index",
        path: "/",
        loader: IndexRoute.loader,
      },
      {
        id: "auth/callback",
        path: "/auth/callback",
        Component: AuthCallbackRoute.default,
      },
      {
        id: "signin",
        path: "/signin",
        Component: SignInRoute.default,
      },
      {
        id: "dashboard-layout",
        Component: DashboardLayoutRoute.default,
        children: [
          {
            id: "dashboard",
            path: "/dashboard",
            Component: DashboardRoute.default,
          },
          {
            id: "users",
            path: "/users",
            Component: UsersRoute.default,
          },
        ],
      },
    ],
  },
]);
