import { User } from "@acme/shared-models";

type TTicketDetailRequest = {
  id: number;
};

type TCreateTicketRequest = {
  description: string;
};

type TAssignTicketRequest = {
  ticketId: number;
  userId: number;
};

type TUnassignTicketRequest = {
  ticketId: number;
};

type TMarkTicketRequest = {
  ticketId: number;
};

type TUseCreateTicket = {
  isCreating: boolean;
  description: string;
  startCreating: () => void;
  cancelCreating: () => void;
  setDescription: (desc: string) => void;
  submitCreate: () => Promise<void>;
};

type TOption = {
  label: string;
  value: any;
  display?: React.ReactNode;
};

interface IUserWithDisplay extends User {
  display?: React.ReactNode;
}

export enum TicketStatusFilter {
  ALL = "ALL",
  COMPLETED = "COMPLETED",
  TODO = "TODO",
}

export {
  TTicketDetailRequest,
  TCreateTicketRequest,
  TUseCreateTicket,
  TOption,
  TAssignTicketRequest,
  TUnassignTicketRequest,
  TMarkTicketRequest,
  IUserWithDisplay,
};
