import { User } from "@acme/shared-models";
import { getListUser } from "client/src/services/user.services";
import { TOption } from "client/src/types/tickets.model";
import { useEffect, useState } from "react";

export const useUserList = () => {
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

  return {
    users,
    options,
    loading,
    refetch: fetchUsers,
  };
};
