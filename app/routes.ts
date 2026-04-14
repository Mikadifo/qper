import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/navbar.tsx", [
    index("routes/home.tsx"),
    route("app", "routes/app.tsx"),
  ]),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("report/:projectId", "routes/report.tsx"),
] satisfies RouteConfig;
