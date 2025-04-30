import { Ticket } from "@acme/shared-models";
import {
  createATicket,
  getListTicket,
  getTicketDetail,
} from "client/src/services/tickets.services";
import {
  TTicketDetailRequest,
  TUseCreateTicket,
} from "client/src/types/tickets.model";
import { useEffect, useRef, useState } from "react";
export interface TicketWithAssignee extends Ticket {
  assigneeName?: string;
}

export const useListTicket = (completedFilter: boolean | null) => {
  const [tickets, setTickets] = useState<TicketWithAssignee[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getListTicket();
      if (data) {
        // Filter tickets based on completedFilter
        const filteredTickets = completedFilter
          ? data.filter((ticket) => ticket.completed === completedFilter)
          : data; // If no filter, return all tickets

        setTickets(filteredTickets);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [completedFilter]);

  return { tickets, loading, refetch: fetchTickets };
};

export const useCreateTicket = (onCreated?: () => void): TUseCreateTicket => {
  const [isCreating, setIsCreating] = useState(false);
  const [description, setDescription] = useState("");

  const startCreating = () => setIsCreating(true);
  const cancelCreating = () => {
    setIsCreating(false);
    setDescription("");
  };

  const submitCreate = async () => {
    if (description.trim() === "") return;
    await createATicket({ description });
    cancelCreating();
    onCreated?.();
  };

  return {
    isCreating,
    description,
    startCreating,
    cancelCreating,
    setDescription,
    submitCreate,
  };
};

export const useTicketDetail = ({ id }: TTicketDetailRequest) => {
  const [ticketDetail, setTicketDetail] = useState<TicketWithAssignee | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const userCache = useRef<Record<number, string>>({});

  const fetchTicketDetail = async () => {
    try {
      setLoading(true);

      const data = await getTicketDetail(id);

      if (data?.assigneeId !== null) {
        const assigneeId = data.assigneeId;
        const name = userCache.current[assigneeId] ?? "Unknown";

        (data as TicketWithAssignee).assigneeName = name;
      } else if (data) {
        (data as TicketWithAssignee).assigneeName = "Unknown";
      }

      setTicketDetail(data as TicketWithAssignee);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketDetail();
  }, []);

  return {
    ticket: ticketDetail,
    loading,
    refetch: fetchTicketDetail,
  };
};
