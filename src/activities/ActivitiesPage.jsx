import useMutation from "../api/useMutation";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import { useApi } from "../api/ApiContext";
import ActivityListItem from "./ActivityListItem";

export default function ActivitiesPage() {
  const [errorMessage, setErrorMessage] = useState("");
  // const data = useQuery("/activities");
  // console.log(data);
  const { token } = useAuth();
  console.log(token);
  const {
    data: fitnessActivities,
    loading,
    error,
  } = useQuery("/activities", "activities");
  const { request } = useApi();
  const {
    mutate: add,
    loading: mutationLoading,
    error: mutationError,
  } = useMutation("POST", "/activities", ["activities"]);
  const addActivity = (FormData) => {
    const obj = {
      name: FormData.get("name"),
      description: FormData.get("description"),
    };
    add(obj);
  };

  return (
    <>
      <h1>Activities</h1>
      <p>Imagine all the activities!</p>
      <div>
        {fitnessActivities?.map((element) => (
          <ActivityListItem element={element} />
        ))}
      </div>
      {token && (
        <form action={addActivity}>
          <h2>Add a new activity</h2>
          <div className="form-group">
            <label for="activityName">Name of Activity</label>
            <input type="text" className="form-control" name="name" />
          </div>
          <div className="form-group">
            <label for="activityDescription">Description of Activity</label>
            <input type="text" className="form-control" name="description" />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </>
  );
}
