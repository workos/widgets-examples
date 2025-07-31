import * as React from "react";
import { redirect, useNavigate } from "react-router";

export default function IndexRoute() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/signin", { replace: true });
  }, [navigate]);
}
