import { getListUser } from "client/src/services/user.services";
import { useEffect, useMemo, useState } from "react";
import {
  assignTicket,
  unassignTicket,
} from "client/src/services/tickets.services";
import { toast } from "react-toastify";
import { TicketWithAssignee } from "./useTickets";

export const useAssignOrUnassignTicket = (
  ticket: TicketWithAssignee | null,
  ticketId: number
) => {
  const [users, setUsers] = useState<{ label: string; value: number }[]>([]);
  const [localAssigneeId, setLocalAssigneeId] = useState<number | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchUsers = async () => {
    const res = await getListUser();
    const mappingUersToOptions = res.map((u) => ({
      label: u.name,
      value: u.id,
    }));
    setUsers([{ label: "Unassign", value: -1 }, ...mappingUersToOptions]);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

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

  const selectedAssignee = useMemo(() => {
    return users.find((u) => u.value === localAssigneeId) ?? users[0];
  }, [users, localAssigneeId]);

  return {
    options: users,
    selectedAssignee,
    handleAssigneeChange,
    loading: updating,
    ticket,
  };
};
