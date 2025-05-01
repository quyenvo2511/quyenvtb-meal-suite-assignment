import { useUserContext } from "client/src/providers/userContext";
import {
  assignTicket,
  unassignTicket,
} from "client/src/services/tickets.services";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { TicketWithAssignee } from "./useTickets";

export const useAssignOrUnassignTicket = (
  ticket: TicketWithAssignee | null,
  ticketId: number
) => {
  const { options: userOptions, loading: userLoading } = useUserContext();
  const [localAssigneeId, setLocalAssigneeId] = useState<number | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (ticket) {
      setLocalAssigneeId(ticket.assigneeId ?? -1);
    }
  }, [ticket]);

  const handleAssigneeChange = async (selected: {
    label: string;
    value: number;
  }) => {
    if (!ticket) return;

    const prevAssignee = localAssigneeId;
    const nextAssignee = selected.value;
    setLocalAssigneeId(nextAssignee);
    setUpdating(true);

    try {
      if (nextAssignee === -1) {
        await unassignTicket({ ticketId });
      } else {
        await assignTicket({ ticketId, userId: nextAssignee });
      }
    } catch (err) {
      setLocalAssigneeId(prevAssignee);
      toast.error("Failed to update assignee.");
    } finally {
      setUpdating(false);
    }
  };

  const options = useMemo(
    () => [{ label: "Unassign", value: -1 }, ...userOptions],
    [userOptions]
  );

  const selectedAssignee = useMemo(() => {
    return options.find((u) => u.value === localAssigneeId) ?? options[0];
  }, [options, localAssigneeId]);

  return {
    options,
    selectedAssignee,
    handleAssigneeChange,
    loading: updating || userLoading,
    ticket,
  };
};
