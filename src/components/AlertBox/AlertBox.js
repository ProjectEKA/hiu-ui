import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

export default function AlertBox({ type, title, message }) {
  return (
    <Alert severity={type}>
      <AlertTitle>
        <strong>{title}</strong>
      </AlertTitle>
      {message}
    </Alert>
  );
}
