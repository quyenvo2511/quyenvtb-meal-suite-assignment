import { useParams } from "react-router-dom";
import styles from "./TicketDetail.module.css";
import SelectDropdown from "client/src/components/SelectDropdown";
import { useTicketStatus } from "client/src/hooks/tickets/useTicketStatus";
import { useMemo } from "react";
import { useAssignOrUnassignTicket } from "client/src/hooks/tickets/useAssignOrUnassignTicket";
import { useTicketDetail } from "client/src/hooks/tickets/useTickets";
const ticketOptions = [
  { label: "Completed", value: true },
  { label: "To Do", value: false },
];
const TicketDetail = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const { ticket } = useTicketDetail({ id: numericId });
  const { completed, handleChangeStatus } = useTicketStatus(ticket, numericId);
  const { options, selectedAssignee, handleAssigneeChange } =
    useAssignOrUnassignTicket(ticket, numericId);

  const selectedStatus = useMemo(() => {
    return (
      ticketOptions.find((opt) => opt.value === completed) ?? ticketOptions[1]
    );
  }, [completed]);

  return (
    <div className={styles["container"]}>
      <div className={styles["left-side"]}>
        <div className={styles["left-side_code"]}>
          <div>Back</div>
          <div>{ticket?.id}</div>
        </div>
        <div className={styles["left-side_des"]}>{ticket?.description}</div>
      </div>
      <div className={styles["right-side"]}>
        <div>
          <SelectDropdown
            options={ticketOptions}
            value={selectedStatus}
            onChange={handleChangeStatus}
          />
        </div>
        <SelectDropdown
          options={options}
          value={selectedAssignee}
          onChange={handleAssigneeChange}
        />
      </div>
    </div>
  );
};

export default TicketDetail;
