import React from "react";
import { Link } from "react-router-dom";
import DeviceBar from "../react-mobile-hackathon/devices/DeviceBar";

const Button = ({ img, label }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <img src={img} />
      <span
        style={{ marginTop: 4, font: "var(--copy12)", color: "var(--snow)" }}
      >
        {label}
      </span>
    </div>
  );
};

const BottomBar = ({ children, style }) => {
  return (
    <DeviceBar
      title="Bottom Bar"
      position="bottom"
      titleStyle={{
        color: "rgb(250, 250, 255)",
      }}
      style={{
        ...style,
        justifySelf: "flex-end",
        background: "var(--grass)",
        boxShadow: "0px 0px 4px rgba(151, 151, 151, 0.4)",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Button img="profile.svg" label="Profile" />
      <Button img="collection.svg" label="Collection" />
      <Link to="/qr" style={{ textDecoration: "none" }}>
        <Button img="check-in.svg" label="Check In" />
      </Link>
      <Button img="location.svg" label="Locations" />
    </DeviceBar>
  );
};

export default BottomBar;
