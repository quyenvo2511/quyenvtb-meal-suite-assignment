import { Ticket } from "@acme/shared-models";
import { useNavigate } from "react-router-dom";
import styles from "../tickets.module.css";
import clsx from "clsx";

interface ITicketItemProps {
  item: Ticket;
}

const TicketItem = ({ item }: ITicketItemProps) => {
  const navigate = useNavigate();
  const handleNavigateToDetail = () => {
    navigate(`/${item.id}`);
  };
  return (
    <div
      role="button"
      className={styles["ticket-item-container"]}
      onClick={handleNavigateToDetail.bind(this)}
    >
      <p className={clsx(styles["ticket-item-container_des"], "text-ellipsis")}>
        {item.description}
      </p>
      <div className={styles["ticket-item-container_status"]}>
        {item.completed ? "Completed" : "Todo"}
      </div>
      <div className={styles["ticket-item-container_assignee"]}>
        {item.assigneeName}
      </div>
    </div>
  );
};

export default TicketItem;
