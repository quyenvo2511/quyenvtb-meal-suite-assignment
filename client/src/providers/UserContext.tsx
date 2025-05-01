import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@acme/shared-models";
import { getListUser } from "client/src/services/user.services";
import { TOption } from "client/src/types/tickets.model";

type UserContextType = {
  users: User[];
  options: TOption[];
  loading: boolean;
  refetch: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [options, setOptions] = useState<TOption[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await getListUser();
      if (result) {
        setUsers(result);
        setOptions(
          result.map((user) => ({
            label: user.name,
            value: user.id,
          }))
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, options, loading, refetch: fetchUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
