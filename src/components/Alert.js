import React from "react";

export default function Alert({ alert }) {
  return (
    <>
      {alert && (
        <div className={`alert alert-${alert.type} sticky-top`} role="alert">
          <strong>{alert.type} : </strong>
          {alert.message}
        </div>
      )}
    </>
  );
}
