import { Ticket } from "@acme/shared-models";
import {
  TAssignTicketRequest,
  TCreateTicketRequest,
  TMarkTicketRequest,
  TUnassignTicketRequest,
} from "../types/tickets.model";
import { TICKET_URLS } from "./endpoint-url";
import { Api } from "./request";

export const getListTicket = async (): Promise<Ticket[]> => {
  const response = await Api.get(TICKET_URLS.GET_LIST_TICKET);
  return response;
};

export const getTicketDetail = async (id: number): Promise<Ticket> => {
  const response = await Api.get(
    `${TICKET_URLS.GET_DETAIL_TICKET_BY_ID}/${id}`
  );
  return response;
};

export const createATicket = async ({
  description,
}: TCreateTicketRequest): Promise<Ticket> => {
  const response = await Api.post(TICKET_URLS.CREATE_A_TICKET, {
    body: { description },
  });
  return response;
};

export const assignTicket = async ({
  ticketId,
  userId,
}: TAssignTicketRequest): Promise<Ticket> => {
  const response = await Api.put(
    `${TICKET_URLS.TICKETS}/${ticketId}/assign/${userId}`
  );
  return response;
};

export const unassignTicket = async ({
  ticketId,
}: TUnassignTicketRequest): Promise<Ticket> => {
  const response = await Api.put(`${TICKET_URLS.TICKETS}/${ticketId}/unassign`);
  return response;
};

export const markTicketComplete = async ({
  ticketId,
}: TMarkTicketRequest): Promise<Ticket> => {
  const response = await Api.put(`${TICKET_URLS.TICKETS}/${ticketId}/complete`);
  return response;
};

export const markTicketTodo = async ({
  ticketId,
}: TMarkTicketRequest): Promise<Ticket> => {
  const response = await Api.delete(
    `${TICKET_URLS.TICKETS}/${ticketId}/complete`
  );
  return response;
};
