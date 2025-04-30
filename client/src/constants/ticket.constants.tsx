import { TOption } from "../types/tickets.model";

export const ticketOptions: TOption[] = [
  {
    label: "COMPLETED",
    value: true,
  },
  {
    label: "TO DO",
    value: false,
  },
];

export const ticketStatusOptions = [
  { label: "COMPLETED", value: true },
  { label: "TO DO", value: false },
  { label: "ALL", value: null },
];
