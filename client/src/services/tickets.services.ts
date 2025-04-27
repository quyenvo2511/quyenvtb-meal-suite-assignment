import { Ticket } from "@acme/shared-models";
import { TTicketDetailRequest } from "../types/tickets.model";
import { TICKET_URLS } from "./endpoint-url";
import { Api } from "./request";

export const getListTicket = async (): Promise<Ticket[]> => {
  const response = await Api.get(TICKET_URLS.GET_LIST_TICKET);
  return response;
};

export const getTicketDetail = async (
  id: TTicketDetailRequest
): Promise<Ticket> => {
  const response = await Api.get(TICKET_URLS.GET_DETAIL_TICKET_BY_ID, id);
  return response;
};
