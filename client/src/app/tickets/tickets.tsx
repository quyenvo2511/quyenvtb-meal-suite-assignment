import { useState } from "react";
import { FlatList } from "client/src/components/Flatlist";
import {
  useCreateTicket,
  useListTicket,
} from "client/src/hooks/tickets/useTickets";
import TicketItem from "./components/TicketItem";
import styles from "./tickets.module.css";
import SelectDropdown from "client/src/components/SelectDropdown";

const ticketStatusOptions = [
  { label: "Completed", value: true },
  { label: "To Do", value: false },
  { label: "All", value: null }, // To show all tickets
];

function Tickets() {
  const [completedFilter, setCompletedFilter] = useState<boolean | null>(null);
  const { tickets, loading } = useListTicket(completedFilter);
  const {
    isCreating,
    description,
    startCreating,
    cancelCreating,
    setDescription,
    submitCreate,
  } = useCreateTicket();

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await submitCreate();
    } else if (e.key === "Escape") {
      cancelCreating();
    }
  };

  const handleFilterChange = (selectedOption: {
    label: string;
    value: boolean | null;
  }) => {
    setCompletedFilter(selectedOption.value);
  };

  return (
    <div className={styles["tickets"]}>
      <h3>Tickets</h3>
      <p>Filter</p>
      <SelectDropdown
        options={ticketStatusOptions}
        value={
          ticketStatusOptions.find((opt) => opt.value === completedFilter) ||
          ticketStatusOptions[2]
        }
        onChange={handleFilterChange}
      />
      <FlatList
        loading={loading}
        data={tickets}
        keyExtractor={(item) => String(item.id)}
        renderItem={(item, _index) => <TicketItem item={item} />}
        contentContainerStyle={{
          gap: 8,
        }}
        horizontal={false}
      />
      {isCreating && (
        <div className={styles["create-ticket-input"]}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter ticket description"
            autoFocus
          />
        </div>
      )}
      <button onClick={startCreating}>+</button>
    </div>
  );
}

export default Tickets;
