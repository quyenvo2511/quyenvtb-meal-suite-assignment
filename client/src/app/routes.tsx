import { Outlet } from "react-router-dom";
import { TRouteConfig } from "../config/routeConfig";
import { ROUTING_PATHS } from "../config/routing";
import TicketDetail from "./tickets/TicketDetail";
import Tickets from "./tickets/tickets";

const TicketsLayout = () => {
  return <Outlet />;
};

export const routes: TRouteConfig[] = [
  {
    path: ROUTING_PATHS.HOME,
    element: <TicketsLayout />,
    children: [
      {
        index: true,
        element: <Tickets />,
      },
      {
        path: ":id",
        element: <TicketDetail />,
      },
    ],
  },
];
