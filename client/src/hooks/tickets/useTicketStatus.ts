import {
  markTicketComplete,
  markTicketTodo,
} from "client/src/services/tickets.services";
import { TMarkTicketRequest } from "client/src/types/tickets.model";
import { useEffect, useMemo, useState } from "react";
import { TicketWithAssignee } from "./useTickets";
import { ticketOptions } from "client/src/constants/ticket.constants";
import { toast } from "react-toastify";

export const useTicketStatus = (
  ticket: TicketWithAssignee | null,
  id: number
) => {
  const [updating, setUpdating] = useState(false);
  const [completed, setCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    if (ticket) {
      setCompleted(ticket.completed);
    }
  }, [ticket]);

  const handleChangeStatus = async (selected: {
    label: string;
    value: boolean;
  }) => {
    if (!ticket) return;

    const previousStatus = completed;
    const optimisticStatus = selected.value;

    setCompleted(optimisticStatus);
    setUpdating(true);

    try {
      const payload: TMarkTicketRequest = { ticketId: id };
      if (optimisticStatus) {
        await markTicketComplete(payload);
        toast.success("Ticket marked as COMPLETED.");
      } else {
        await markTicketTodo(payload);
        toast.info("Ticket marked as TO DO.");
      }
    } catch (error) {
      // Revert if failed
      setCompleted(previousStatus);
      console.error("Failed to update ticket status", error);
    } finally {
      setUpdating(false);
    }
  };

  const selectedStatus = useMemo(() => {
    return (
      ticketOptions.find((opt) => opt.value === completed) ?? ticketOptions[1]
    );
  }, [completed]);

  const filteredTicketOptions = useMemo(() => {
    return ticketOptions.filter((opt) => opt.value !== selectedStatus.value);
  }, [selectedStatus]);

  return {
    ticket,
    loading: updating,
    completed: completed, // use local completed
    filteredTicketOptions,
    selectedStatus,
    handleChangeStatus,
  };
};
