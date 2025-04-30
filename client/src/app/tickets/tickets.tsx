import { useCallback, useState } from "react";
import { FlatList } from "client/src/components/Flatlist";
import {
  useCreateTicket,
  useListTicket,
} from "client/src/hooks/tickets/useTickets";
import TicketItem from "./components/TicketItem";
import styles from "./tickets.module.css";
import SelectDropdown from "client/src/components/SelectDropdown";
import LoadingSpin from "client/src/components/LoadingSpin/LoadingSpin";
import { ticketStatusOptions } from "client/src/constants/ticket.constants";
import EmptySearch from "client/src/components/Empty/Empty";

function Tickets() {
  const [completedFilter, setCompletedFilter] = useState<boolean | null>(null);

  const { tickets, loading, refetch, isFirstLoad } =
    useListTicket(completedFilter);

  const memoizedRefetch = useCallback(() => {
    refetch();
  }, [refetch]);
  const { description, cancelCreating, setDescription, submitCreate } =
    useCreateTicket(memoizedRefetch);

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
      {isFirstLoad && loading ? (
        <LoadingSpin fullscreen />
      ) : (
        <>
          <div className={styles["header"]}>
            <h3 className={styles["header_page-title"]}>Tickets</h3>

            <div className={styles["select-dropdown"]}>
              <p className={styles["select-dropdown_indicator"]}>Filter by:</p>
              <div className={styles["select-dropdown_list"]}>
                <SelectDropdown
                  options={ticketStatusOptions}
                  value={
                    ticketStatusOptions.find(
                      (opt) => opt.value === completedFilter
                    ) || ticketStatusOptions[2]
                  }
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className={styles["title-container"]}>
              <div style={{ flex: 1, fontWeight: 700 }}>Code</div>
              <div style={{ flex: 3, fontWeight: 700 }}>Description</div>
              <div style={{ flex: 1, fontWeight: 700 }}>Status</div>
              <div style={{ flex: 1, fontWeight: 700 }}>Assignee</div>
            </div>
          </div>
          <div className={styles["content"]}>
            <FlatList
              loading={false}
              data={tickets}
              keyExtractor={(item) => String(item.id)}
              renderItem={(item, _index) => <TicketItem item={item} />}
              contentContainerStyle={{ gap: "0.5rem" }}
              horizontal={false}
              ListEmptyComponent={<EmptySearch />}
            />
            {!loading && (
              <div style={{ inset: 0 }}>
                <LoadingSpin mode="faded" />
              </div>
            )}

            <div className={styles["ticket-item-create"]}>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter ticket description"
                autoFocus
                className={styles["input-create"]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Tickets;
