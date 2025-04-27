import { Route } from "react-router-dom";

export interface IRouteConfig {
  path: string;
  element: JSX.Element;
}

export const configRoutes = (routes: IRouteConfig[]) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));
};
