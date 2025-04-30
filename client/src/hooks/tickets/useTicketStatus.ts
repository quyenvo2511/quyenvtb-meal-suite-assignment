import {
  markTicketComplete,
  markTicketTodo,
} from "client/src/services/tickets.services";
import { TMarkTicketRequest } from "client/src/types/tickets.model";
import { useEffect, useState } from "react";
import { TicketWithAssignee } from "./useTickets";

export const useTicketStatus = (
  ticket: TicketWithAssignee | null,
  id: number
) => {
  const [updating, setUpdating] = useState(false);
  const [localCompleted, setLocalCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    if (ticket) {
      setLocalCompleted(ticket.completed);
    }
  }, [ticket]);

  const handleChangeStatus = async (selected: {
    label: string;
    value: boolean;
  }) => {
    if (!ticket) return;

    const previousStatus = localCompleted;
    const optimisticStatus = selected.value;

    // Optimistically update
    setLocalCompleted(optimisticStatus);
    setUpdating(true);

    try {
      const payload: TMarkTicketRequest = { ticketId: id };
      if (optimisticStatus) {
        await markTicketComplete(payload);
      } else {
        await markTicketTodo(payload);
      }
    } catch (error) {
      // Revert if failed
      setLocalCompleted(previousStatus);
      console.error("Failed to update ticket status", error);
    } finally {
      setUpdating(false);
    }
  };

  return {
    ticket,
    loading: updating,
    completed: localCompleted, // use local completed
    handleChangeStatus,
  };
};
