import { Outlet } from "react-router-dom";
import { TRouteConfig } from "../config/routeConfig";
import { ROUTING_PATHS } from "../config/routing";
import TicketDetail from "./tickets/TicketDetail";
import Tickets from "./tickets/tickets";
import { UserProvider } from "../providers/UserContext";

const TicketsLayout = () => {
  return <Outlet />;
};

export const routes: TRouteConfig[] = [
  {
    path: ROUTING_PATHS.HOME,
    element: (
      <UserProvider>
        <TicketsLayout />
      </UserProvider>
    ),
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
