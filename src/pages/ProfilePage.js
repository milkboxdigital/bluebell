import React, { Component } from "react";
import ScrollView from "../components/react-mobile-hackathon/devices/ScrollView";
import LoadingView from "../components/react-mobile-hackathon/devices/LoadingView";
import { HashLoader } from "react-spinners";
import BottomBar from "../components/bottom-bar/BottomBar";
import Button from "../components/button/Button";
import { Link } from "react-router-dom";
import Slide from "../components/slide/Slide";
import locations from "../constants/locations";

const Stamp = ({ stampName, date, style, bgName }) => {
  return (
    <div
      style={{
        boxShadow: "0px 0px 4px rgba(151, 151, 151, 0.4)",
        borderRadius: 10,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${bgName})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        filter: date ? "none" : "grayscale(1)",
        ...style,
      }}
    >
      <span style={{ color: "var(--dark)", font: "var(--feature18)" }}>
        {stampName || "Stamp Name"}
      </span>
      <span style={{ marginTop: 4, font: "var(--copy12)" }}>
        {date && `Obtained ${date}`}
      </span>
    </div>
  );
};

class ProfilePage extends Component {
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
              background: "var(--sunshine)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "60px 24px 26px",
            }}
          >
            <span style={{ color: "var(--dark)", font: "var(--feature32)" }}>
              Bobby Ross
            </span>
            <img src="gear.svg" style={{ width: 24, height: 24 }} />
          </div>
          <div
            style={{
              background: "var(--mist)",
              display: "flex",
              flexDirection: "column",
              padding: "0 24px",
            }}
          >
            <span
              style={{
                marginTop: 32,
                color: "var(--dark)",
                font: "var(--title)",
              }}
            >
              Recent Stamps
            </span>
            <div
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {locations
                .filter((location) => !!location.date)
                .slice(0, 2)
                .map((location) => (
                  <Stamp
                    stampName={location.name}
                    date={location.date}
                    style={{ width: "154px", cursor: 'pointer', }}
                    bgName={location.bgName}
                  />
                ))}
            </div>
            <Stamp
              stampName={locations[2].name}
              date={locations[2].date}
              style={{ marginTop: "12px", backgroundSize: "110%" }}
              bgName={locations[2].bgName}
            />
            <Button
              to="/collection"
              label="See full collection"
              style={{ marginTop: 32, alignSelf: "center" }}
            />

            <div
              style={{
                marginTop: 44,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "var(--dark)", font: "var(--title)" }}>
                Stamps Near You
              </span>
              <Link
                to="/stamps-near-you"
                style={{
                  textDecoration: "none",
                  color: "var(--bluebell)",
                  font: "var(--copy14)",
                }}
              >
                See all
              </Link>
            </div>

            <Slide style={{ marginTop: 16 }}>
              <Stamp
                stampName={locations[3].name}
                bgName="stamp/lake-small.svg"
              />
              <Stamp
                stampName={locations[9].name}
                bgName="stamp/percival-small.svg"
              />
              <Stamp
                stampName={locations[10].name}
                bgName="stamp/urambi-small.svg"
              />
            </Slide>

            <span
              style={{
                marginTop: 44,
                color: "var(--dark)",
                font: "var(--title)",
              }}
            >
              Article of the week
            </span>

            <a
              target="_blank"
              href="https://www.abc.net.au/news/2022-08-20/sydney-council-considers-coal-gas-oil-advertising-ban-motion/101352790"
              style={{
                boxShadow: "0px 0px 4px rgba(151, 151, 151, 0.4)",
                borderRadius: 10,
                margin: "16px 0",
                padding: "16px 24px",
                display: "flex",
                textDecoration: "none",
                color: "initial",
              }}
            >
              <img
                src="https://live-production.wcms.abc-cdn.net.au/04735f3fcbe87901266dca0b4ab93ce2?impolicy=wcms_crop_resize&cropH=394&cropW=700&xPos=0&yPos=0&width=862&height=485"
                style={{ width: 80, height: 80, background: "#D9D9D9" }}
              />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 16,
                }}
              >
                <span
                  style={{ color: "var(--dark)", font: "var(--mini-title)" }}
                >
                  City of Sydney to consider ban on fossil fuel advertising to
                  fight climate change, pollution
                </span>
                <span
                  style={{
                    marginTop: 4,
                    color: "var(--slate)",
                    font: "var(--copy14)",
                  }}
                >
                  ABC Radio Sydney
                  <br />
                  By Rosemary Bolger
                </span>
              </div>
            </a>
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

export default ProfilePage;
