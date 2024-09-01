import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useLocalStorage } from "@uidotdev/usehooks";

function AddArticle({ className }) {
  const [user, setUser] = useLocalStorage("user");
  if (!user?.role == "admin") {
    return <Dashboard />;
  }
  return (
    <Link to="/dashboard/new">
      <button className={className}>Add new Article</button>
    </Link>
  );
}

export default AddArticle;
