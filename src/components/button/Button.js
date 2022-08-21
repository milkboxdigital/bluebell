import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Button = ({ label, to, variant, small, onClick, style }) => {
  if (to) {
    return (
      <Link
        to={to}
        type="button"
        onClick={onClick}
        className={`button button--${variant} ${small ? "button--small" : ""}`}
        style={{cursor: 'pointer', textDecoration: 'none', ...style}}
      >
        {label}
      </Link>
    );
  }
  return (
    <div
      type="button"
      onClick={onClick}
      className={`button button--${variant} ${small ? "button--small" : ""}`}
      style={{ cursor: "pointer", textDecoration: "none", ...style }}
    >
      {label}
    </div>
  );
};

Button.defaultProps = {
  variant: "primary",
};

export default Button;
