import Tag from "../components/Tag";
import { TOption } from "../types/tickets.model";

export const ticketOptions: TOption[] = [
  {
    label: "COMPLETED",
    value: true,
    display: <Tag type="completed" label="COMPLETED" />,
  },
  {
    label: "TO DO",
    value: false,
    display: <Tag type="todo" label="TO DO" />,
  },
];

export const ticketStatusOptions = [
  {
    label: "COMPLETED",
    value: true,
    display: <Tag type="completed" label="COMPLETED" />,
  },
  { label: "TO DO", value: false, display: <Tag type="todo" label="TO DO" /> },
  { label: "ALL", value: null, display: <Tag type="all" label="ALL" /> },
];
