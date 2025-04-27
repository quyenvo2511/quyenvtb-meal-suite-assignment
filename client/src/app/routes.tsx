import { IRouteConfig } from "../config/routeConfig";
import Tickets from "./tickets/tickets";

export const routes: IRouteConfig[] = [{ path: "/", element: <Tickets /> }];
