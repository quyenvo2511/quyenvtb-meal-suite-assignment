import { Route, RouteObject } from "react-router-dom";

export type TRouteConfig = RouteObject;

export const configRoutes = (routes: TRouteConfig[]): React.ReactNode[] => {
  return routes.map((route) => {
    if (route.children && route.children.length > 0) {
      return (
        <Route
          key={route.path ?? "index"}
          path={route.path}
          element={route.element}
          index={route.index}
        >
          {configRoutes(route.children)}
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
