import React from "react";

export default function NotFound404Page({ location }) {
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}
