import { Ticket } from "@acme/shared-models";
import { useUserContext } from "client/src/providers/UserContext";
import {
  createATicket,
  getListTicket,
  getTicketDetail,
} from "client/src/services/tickets.services";
import {
  TTicketDetailRequest,
  TUseCreateTicket,
} from "client/src/types/tickets.model";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
export interface TicketWithAssignee extends Ticket {
  assigneeName?: string;
}

export const useListTicket = (completedFilter: boolean | null) => {
  const [tickets, setTickets] = useState<TicketWithAssignee[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const { users } = useUserContext();

  const fetchTickets = async () => {
    if (!users || users.length === 0) return;
    setLoading(true);
    try {
      const data = await getListTicket();
      if (data) {
        const filtered =
          completedFilter === null
            ? data
            : data.filter((ticket) => ticket.completed === completedFilter);

        const enriched = filtered.map((ticket) => {
          const user = users.find((u) => u.id === ticket.assigneeId);
          return {
            ...ticket,
            assigneeName: user?.name ?? "Unassign",
          };
        });

        setTickets(enriched);
      }
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      fetchTickets();
    }
  }, [completedFilter, users]);

  return { tickets, loading, isFirstLoad, refetch: fetchTickets };
};

export const useCreateTicket = (onCreated?: () => void): TUseCreateTicket => {
  const [isCreating, setIsCreating] = useState(false);
  const [description, setDescription] = useState("");

  const startCreating = () => setIsCreating(true);
  const cancelCreating = () => {
    setIsCreating(false);
    setDescription("");
  };

  const submitCreate = useCallback(async () => {
    if (description.trim() === "" || isCreating) return;

    setIsCreating(true);
    try {
      await createATicket({ description });
      cancelCreating();
      onCreated?.();
      toast.success("You just created a ticket successful!");
    } catch (error) {
      console.error("Failed to create ticket:", error);
      setIsCreating(false);
    }
  }, [description, isCreating, onCreated]);

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
