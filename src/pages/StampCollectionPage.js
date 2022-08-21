import React, { Component } from "react";
import ScrollView from "../components/react-mobile-hackathon/devices/ScrollView";
import LoadingView from "../components/react-mobile-hackathon/devices/LoadingView";
import { HashLoader } from "react-spinners";
import BottomBar from "../components/bottom-bar/BottomBar";
import { Link } from "react-router-dom";
import locations from "../constants/locations";
import Button from "../components/button";

const Stamp = ({ stampName, date, bgName, animate, push }) => {
  return (
    <div
      style={{
        boxShadow: "0px 0px 4px rgba(151, 151, 151, 0.4)",
        borderRadius: 10,
        padding: "16px 24px 32px",
        display: "flex",
        flexDirection: "column",
        background: `url(${bgName})`,
        marginBottom: "12px",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "110%",
        backgroundPosition: "center",
        position: "relative",
        cursor: date ? "pointer" : "auto",
      }}
      className={`${animate ? "animated-grayscale" : "grayscale"} ${
        date ? (animate ? "amimated-ungrayscale" : "ungrayscale") : ""
      }`}
      role="button"
      onClick={() => {
        if (date) {
          push("/lake");
        }
      }}
    >
      <span style={{ color: "var(--dark)", font: "var(--feature18)" }}>
        {stampName || "Stamp Name"}
      </span>
      <span
        style={{ marginTop: 4, color: "var(--dark)", font: "var(--copy12)" }}
      >
        {date ? `Obtained ${date}` : "Locked"}
      </span>
    </div>
  );
};

class StampCollectionPage extends Component {
  state = {
    ready: false,
    animateUnlockLake: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ ready: true }), 500);

    setTimeout(() => {
      if (
        this.props.location.state &&
        this.props.location.state.isFromCheckIn
      ) {
        setTimeout(() => {
          this.setState({ animateUnlockLake: true });
        }, 500);
        document
          .querySelector(".scroll--simple")
          .scroll({ top: 400, behavior: "smooth" });
      }
    }, 800);
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
      <div
        style={{
          flex: 1,
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ScrollView>
          <div
            style={{
              background: "var(--bark)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "60px 24px 26px",
              textAlign: "center",
              position: "relative",
              height: "225px",
            }}
          >
            <Link
              to="/profile"
              style={{ position: "absolute", top: "40px", left: "24px" }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7919 11.299C13.2332 10.8617 13.2364 10.1494 12.799 9.70806C12.3617 9.26677 11.6494 9.26359 11.2081 9.70096L8.51596 12.3691C7.50201 13.3741 6.67329 14.1954 6.08558 14.9272C5.47444 15.6882 5.03204 16.4606 4.91386 17.3878C4.86205 17.7943 4.86205 18.2057 4.91386 18.6122C5.03204 19.5394 5.47444 20.3118 6.08558 21.0728C6.6733 21.8046 7.50201 22.6259 8.51598 23.6309L11.2081 26.299C11.6494 26.7364 12.3617 26.7332 12.799 26.2919C13.2364 25.8506 13.2332 25.1383 12.7919 24.701L10.1475 22.08C9.07424 21.0163 8.33804 20.2842 7.83989 19.6639C7.678 19.4624 7.55169 19.2849 7.45362 19.125H30C30.6213 19.125 31.125 18.6213 31.125 18C31.125 17.3787 30.6213 16.875 30 16.875H7.45362C7.55169 16.7151 7.678 16.5376 7.83989 16.3361C8.33804 15.7158 9.07424 14.9837 10.1475 13.92L12.7919 11.299Z"
                  fill="#1E1E1E"
                />
              </svg>
            </Link>
            <p
              style={{
                font: "var(--title)",
                color: "var(--snow)",
                width: "215px",
              }}
            >
              Billy’s Bluebell Stamp Collection
            </p>
            <p
              style={{
                font: "var(--copy14)",
                color: "var(--snow)",
                width: "215px",
                marginTop: "12px",
              }}
            >
              Look back at the great parts of the bushlands you’ve explored and
              what you’ve yet to uncover!
            </p>
            <img
              src="collection-bg.svg"
              alt=""
              style={{ position: "absolute", bottom: 0, width: "100%" }}
            />
          </div>
          <div
            style={{
              background: "var(--mist)",
              display: "flex",
              flexDirection: "column",
              padding: "32px 24px",
              alignItems: "center",
            }}
          >
            {locations.map((location, index) => (
              <Stamp
                stampName={location.name}
                bgName={location.bgName}
                date={
                  index === 3 && this.state.animateUnlockLake
                    ? "Jan 1, 2022"
                    : location.date
                }
                animate={index === 3}
                push={this.props.history.push}
              />
            ))}
            <Button
              label="Share your achievements"
              small
              style={{ marginTop: "32px" }}
            />
          </div>
        </ScrollView>
        <BottomBar />
      </div>
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
    background: "var(--mist)",
  },
};

export default StampCollectionPage;
