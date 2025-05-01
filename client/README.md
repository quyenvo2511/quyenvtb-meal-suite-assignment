# Client

This is the React implementation of the Tickets webapp.

## ⏱️ Time Spent

| Task                                                                   | Duration |
| ---------------------------------------------------------------------- | -------- |
| 🔧 Set up environment and base front-end structure                     | 8 hours  |
| 🧩 Develop Ticket List and Detail pages (including styling & services) | 12 hours |
| 🧠 Implement logic for option selection components and status filters  | 8 hours  |
| 🧪 Manual testing, bug fixes (logic & style)                           | 8 hours  |

**➡️ Total Time:** 36 hours

> 💡 **Note:** Styling the pages required additional time due to selecting a suitable color palette, sizing elements consistently, and defining global styles for reuse across components.

## Structure

.
Client/
└── src/
└── app/
├── assets/ # Static assets (icons)
├── components/ # Reusable/common UI components
├── providers/ # Context providers (e.g. fetch users once globally)
├── config/ # Routing configuration and other app-level configs
├── constants/ # App-wide constants (e.g. route names, statuses)
├── hooks/ # Custom React hooks
├── services/ # API service definitions
├── types/ # TypeScript types and interfaces
├── utils/ # Common utility functions
├── index.html # Main HTML file (handles font imports)
├── main.tsx # App entry point
└── styles.css # Global stylesheet for the application

### 📌 Route Configuration

- The app uses a `routeConfig` to manage routes:
  - The **root route** displays the **Ticket List**.
  - Each ticket has a **Detail Page** as a child route.

### 📥 Data Fetching

- When the **Ticket List** is displayed:
  - The app fetches both **tickets** and **users** from the API.
  - Since each ticket includes only an `assigneeId`:
    - The corresponding `assigneeName` is mapped from the previously fetched user list.

### 🛠️ Ticket Detail Behavior

- In the **Ticket Detail Page**, users can update the **Assignee** and **Status** of a ticket.
- When a change is made:
  - An **API call** is triggered to update the ticket.
  - If the API call **fails** (e.g. during assign/unassign actions):
    - The selected option will **revert** to the original value to keep the UI in sync with the backend state.
- User list options take from UserContext, instead of calling list user api again.
