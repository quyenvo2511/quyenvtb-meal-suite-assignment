import Tag from "../components/Tag";
import { TicketStatusFilter, TOption } from "../types/tickets.model";

export const ticketOptions: TOption[] = [
  {
    label: "COMPLETED",
    value: TicketStatusFilter.COMPLETED,
    display: <Tag type="completed" label="COMPLETED" />,
  },
  {
    label: "TO DO",
    value: TicketStatusFilter.TODO,
    display: <Tag type="todo" label="TO DO" />,
  },
];

export const ticketStatusOptions = [
  {
    label: "COMPLETED",
    value: TicketStatusFilter.COMPLETED,
    display: <Tag type="completed" label="COMPLETED" />,
  },
  {
    label: "TO DO",
    value: TicketStatusFilter.TODO,
    display: <Tag type="todo" label="TO DO" />,
  },
  {
    label: "ALL",
    value: TicketStatusFilter.ALL,
    display: <Tag type="all" label="ALL" />,
  },
];

export const ticketStatusToBoolean = (
  status: TicketStatusFilter
): boolean | null => {
  switch (status) {
    case TicketStatusFilter.COMPLETED:
      return true;
    case TicketStatusFilter.TODO:
      return false;
    case TicketStatusFilter.ALL:
    default:
      return null;
  }
};

export const booleanToTicketStatus = (
  value: boolean | null
): TicketStatusFilter => {
  if (value === true) return TicketStatusFilter.COMPLETED;
  if (value === false) return TicketStatusFilter.TODO;
  return TicketStatusFilter.ALL;
};

export const UNASSIGNED = "Unassigned";

export enum AssigneeValue {
  UNASSIGNED = -1,
}
