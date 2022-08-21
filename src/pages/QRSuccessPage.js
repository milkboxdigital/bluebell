import React, { Component } from "react";
import ScrollView from "../components/react-mobile-hackathon/devices/ScrollView";
import LoadingView from "../components/react-mobile-hackathon/devices/LoadingView";
import { HashLoader } from "react-spinners";
import Button from "../components/button";
import AnimatedTick from "../components/animated-tick";
import BottomBar from "../components/bottom-bar/BottomBar";

class QRSuccessPage extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ ready: true }), 500);
  }

  renderLoading = () => {
    return (
      <LoadingView
        style={{ background: "var(--bark)", position: "absolute", zIndex: 100 }}
      >
        <HashLoader color="#947AF7" loading={!this.state.ready} />
      </LoadingView>
    );
  };

  renderBody = () => {
    return (
      <React.Fragment>
        <ScrollView>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "0 48px",
            }}
          >
            <AnimatedTick />
            <span
              style={{
                marginTop: 32,
                font: "var(--title)",
              }}
            >
              Location unlocked!
            </span>
            <span
              style={{
                marginTop: 16,
                font: "var(--copy16)",
              }}
            >
              You’ve made it this far, and that’s amazing.
            </span>
            <span
              style={{
                marginTop: 8,
                font: "var(--copy16)",
              }}
            >
              Let’s discover, protect, and enjoy our region’s environment
              together.
            </span>

            <Button
              to="/lake"
              label="Lake Burley Story"
              style={{ marginTop: 32 }}
            />
            <Button
              to={{ pathname: "/collection", state: { isFromCheckIn: true } }}
              label="See in collection"
              variant="secondary"
              style={{ marginTop: 16 }}
            />
          </div>
          <img
            src="qrSuccessBg.svg"
            alt=""
            style={{
              position: "absolute",
              bottom: "-16px",
              pointerEvents: "none",
            }}
          />
        </ScrollView>
        <BottomBar />
      </React.Fragment>
    );
  };

  render() {
    return (
      <div style={styles.container}>
        {this.renderBody()}
        {this.state.ready ? null : this.renderLoading()}
      </div>
    );
  }
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "var(--sunshine)",
  },
};

export default QRSuccessPage;
