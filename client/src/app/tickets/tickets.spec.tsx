import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as ticketHooks from "client/src/hooks/tickets/useTickets";
import { MemoryRouter } from "react-router-dom";
import Tickets from "./tickets";

const mockTickets = [
  { id: 1, description: "Ticket 1", completed: true },
  { id: 2, description: "Ticket 2", completed: false },
];

jest.mock("client/src/hooks/tickets/useTickets");

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

describe("Tickets", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (ticketHooks.useListTicket as jest.Mock).mockImplementation(() => ({
      tickets: mockTickets,
      loading: false,
    }));

    (ticketHooks.useCreateTicket as jest.Mock).mockReturnValue({
      isCreating: false,
      description: "",
      startCreating: jest.fn(),
      cancelCreating: jest.fn(),
      setDescription: jest.fn(),
      submitCreate: jest.fn(),
    });
  });

  it("should render successfully with all tickets", () => {
    render(
      <MemoryRouter>
        <Tickets />
      </MemoryRouter>
    );
    expect(screen.getByText("Tickets")).toBeInTheDocument();
    expect(screen.getByText("Ticket 1")).toBeInTheDocument();
    expect(screen.getByText("Ticket 2")).toBeInTheDocument();
  });

  it("should filter tickets when selecting status", async () => {
    render(
      <MemoryRouter>
        <Tickets />
      </MemoryRouter>
    );

    const button = screen.getByTestId("status-filter-button");
    fireEvent.click(button);

    const completedOption = await screen.findByTestId("filter-completed");
    fireEvent.click(completedOption);

    await waitFor(() => {
      const calls = (ticketHooks.useListTicket as jest.Mock).mock.calls;
      expect(calls[calls.length - 1][0]).toBe(true);
    });

    fireEvent.click(button);
    const todoOption = await screen.findByTestId("filter-to do");
    fireEvent.click(todoOption);

    await waitFor(() => {
      const calls = (ticketHooks.useListTicket as jest.Mock).mock.calls;
      expect(calls[calls.length - 1][0]).toBe(false);
    });

    const ticketList = screen.getAllByTestId("ticket-item");
    expect(ticketList.length).toBeGreaterThanOrEqual(1);
  });
  it("should display the correct ticket ID when a ticket is clicked", async () => {
    render(
      <MemoryRouter>
        <Tickets />
      </MemoryRouter>
    );

    const ticketItem = await screen.findByText("Ticket 1");
    fireEvent.click(ticketItem);

    await waitFor(() => {
      expect(screen.getByText("TICKET-1")).toBeInTheDocument();
    });
  });
});
