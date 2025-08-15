import React from "react";
import { useApi } from "../api/ApiContext";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function ActivityListItem({ element }) {
  const { token } = useAuth();
  const {
    mutate: onDelete,
    loading,
    error,
  } = useMutation("DELETE", `/activities/${element.id}`, ["activities"]);
  return (
    <li>
      {element.name}
      {error}
      {token && <button onClick={() => onDelete()}>Delete</button>}
    </li>
  );
}
