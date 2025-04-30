import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Tickets from "./tickets";
import * as ticketHooks from "client/src/hooks/tickets/useTickets";
import { act } from "react-dom/test-utils";

// Mock ticket data
const mockTickets = [
  { id: 1, description: "Ticket 1", completed: true },
  { id: 2, description: "Ticket 2", completed: false },
];

// Mock hook return values
jest.mock("client/src/hooks/tickets/useTickets");

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
    render(<Tickets />);
    expect(screen.getByText("Tickets")).toBeInTheDocument();
    expect(screen.getByText("Ticket 1")).toBeInTheDocument();
    expect(screen.getByText("Ticket 2")).toBeInTheDocument();
  });

  it("should filter tickets when selecting status", async () => {
    render(<Tickets />);

    const dropdown = screen.getByRole("combobox"); // Assuming SelectDropdown uses <select> or role combobox

    // Select "Completed"
    await act(async () => {
      fireEvent.change(dropdown, { target: { value: "true" } });
    });

    await waitFor(() => {
      const calledWith = (ticketHooks.useListTicket as jest.Mock).mock.calls;
      expect(calledWith[calledWith.length - 1][0]).toBe(true);
    });

    // Select "To Do"
    await act(async () => {
      fireEvent.change(dropdown, { target: { value: "false" } });
    });

    await waitFor(() => {
      const calledWith = (ticketHooks.useListTicket as jest.Mock).mock.calls;
      expect(calledWith[calledWith.length - 1][0]).toBe(false);
    });
  });

  it("should not call getListTicket multiple times on initial render", () => {
    render(<Tickets />);
    const calls = (ticketHooks.useListTicket as jest.Mock).mock.calls.length;
    // Since we only expect 1 render for this hook per render
    expect(calls).toBe(1);
  });
});
