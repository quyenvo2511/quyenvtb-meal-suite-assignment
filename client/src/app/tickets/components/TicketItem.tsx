import { TicketWithAssignee } from "client/src/hooks/tickets/useTickets";
import { useTicketStatus } from "client/src/hooks/tickets/useTicketStatus";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import styles from "../tickets.module.css";
import Avatar from "boring-avatars";
import { UNASSIGNED } from "client/src/constants/ticket.constants";

interface ITicketItemProps {
  item: TicketWithAssignee;
}

const TicketItem = ({ item }: ITicketItemProps) => {
  const navigate = useNavigate();
  const { selectedStatus } = useTicketStatus(item, item.id);

  const handleNavigateToDetail = () => {
    navigate(`/${item.id}`);
  };
  return (
    <div
      role="button"
      className={styles["ticket-item-container"]}
      onClick={handleNavigateToDetail.bind(this)}
    >
      <p
        className={clsx(
          styles["ticket-item-container_status"],
          "text-ellipsis"
        )}
        title={`Go to see detail of TICKET-${item.id}`}
        data-testid="ticket-item"
      >
        TICKET-{item.id}
      </p>
      <p
        className={clsx(styles["ticket-item-container_des"], "text-ellipsis")}
        title={item.description}
      >
        {item.description}
      </p>
      <div
        className={styles["ticket-item-container_status"]}
        title={selectedStatus.label}
      >
        {selectedStatus.display}
      </div>
      <div
        className={styles["ticket-item-container_assignee"]}
        title={item.assigneeName}
      >
        <Avatar
          variant="beam"
          size="30px"
          name={item.assigneeName ?? UNASSIGNED}
        />{" "}
        {item.assigneeName}
      </div>
    </div>
  );
};

export default TicketItem;
