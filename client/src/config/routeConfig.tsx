import { Route, RouteObject } from "react-router-dom";

export type TRouteConfig = RouteObject;

export const configRoutes = (routes: TRouteConfig[]) => {
  return routes.map((route) => {
    if (route.children && route.children.length > 0) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((childRoute) => (
            <Route
              key={`${route.path}-${childRoute.path ?? "index"}`}
              path={childRoute.path}
              element={childRoute.element}
              index={childRoute.index}
            />
          ))}
        </Route>
      );
    }

    return (
      <Route
        key={route.path ?? "index"}
        path={route.path}
        element={route.element}
        index={route.index}
      />
    );
  });
};
