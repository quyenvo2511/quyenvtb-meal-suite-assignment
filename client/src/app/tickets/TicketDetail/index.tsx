import LoadingSpin from "client/src/components/LoadingSpin/LoadingSpin";
import SelectDropdown from "client/src/components/SelectDropdown";
import { useAssignOrUnassignTicket } from "client/src/hooks/tickets/useAssignOrUnassignTicket";
import { useTicketDetail } from "client/src/hooks/tickets/useTickets";
import { useTicketStatus } from "client/src/hooks/tickets/useTicketStatus";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TicketDetail.module.css";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const { ticket, loading } = useTicketDetail({ id: numericId });
  const { selectedStatus, filteredTicketOptions, handleChangeStatus } =
    useTicketStatus(ticket, numericId);

  const { options, selectedAssignee, handleAssigneeChange } =
    useAssignOrUnassignTicket(ticket, numericId);

  const handleOnGoBack = () => {
    navigate(-1);
  };

  if (loading) return <LoadingSpin fullscreen />;

  return (
    <div className={styles["container"]}>
      <div className={styles["container-header"]}>
        <div
          role="button"
          onClick={handleOnGoBack}
          className={styles["btn-back"]}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9999 10.9996H7.82991L13.4199 5.4096L11.9999 3.9996L3.99991 11.9996L11.9999 19.9996L13.4099 18.5896L7.82991 12.9996H19.9999V10.9996Z"
              fill="#79747E"
            />
          </svg>
        </div>

        <div className={styles["header_title"]}>Ticket - {ticket?.id}</div>
      </div>

      <div className={styles["content"]}>
        <div className={styles["content_left-side"]}>
          <p className={styles["content_left-side_title"]}>Description</p>
          <div className={styles["left-side_des"]}>{ticket?.description}</div>
        </div>
        <div className={styles["content_right-side"]}>
          <div className={styles["content_right-side_item"]}>
            <p>Status</p>
            <SelectDropdown
              options={filteredTicketOptions}
              value={selectedStatus}
              onChange={handleChangeStatus}
            />
          </div>
          <div className={styles["content_right-side_item"]}>
            <p>Assignee</p>
            <SelectDropdown
              options={options}
              value={selectedAssignee}
              onChange={handleAssigneeChange}
              showSearch
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
