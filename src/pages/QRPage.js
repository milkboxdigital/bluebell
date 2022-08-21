import React, { Component } from "react";
import ScrollView from "../components/react-mobile-hackathon/devices/ScrollView";
import LoadingView from "../components/react-mobile-hackathon/devices/LoadingView";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Button from "../components/button";

class QRPage extends Component {
  state = {
    ready: false,
    isScanning: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ ready: true }), 500);
    setTimeout(() => this.setState({ isScanning: true }), 1000);
    setTimeout(() => this.props.history.push("/qr-success"), 1500);
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

  renderScanning = () => {
    return (
      <div
        style={{
          width: "200px",
          height: "200px",
          border: "5px solid red",
          position: "absolute",
          bottom: "129px",
          left: "67px",
        }}
      ></div>
    );
  };

  renderBody = () => {
    return (
      // <ScrollView>
      //   <div style={{
      //     height: '100%',
      //     display: 'flex',
      //     flexDirection: 'column',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     textAlign: 'center',
      //     padding: '0 48px'}}>
      //     <img src="logo.svg" style={{width: 241}} />
      //     <span style={{marginTop: 56, color: 'var(--snow)', font: 'var(--title)'}}>
      //       Uncovering<br/> Canberra's bushland
      //     </span>
      //     <span style={{marginTop: 12, color: 'var(--snow)', font: 'var(--copy16)'}}>
      //       Canberra is unique city, designed to include pockets of nature – we are truly the ‘bush capital’.
      //       <br />
      //       <br />
      //       Discover Canberra’s environment and biodiversity and how it plays a large part in our everyday lives.
      //     </span>

      //     <Button to="/profile" label="Sign In" style={{marginTop: 56}} />
      //     <Button to="/register" label="Register" variant="secondary" style={{marginTop: 16}} />

      //     <Link to="/reset-password" style={{color: 'var(--navy)', marginTop: 16, font: 'var(--copy14)'}}>Forgot your password?</Link>
      //   </div>
      // </ScrollView>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "url(QR_post.jpeg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <svg
          width="271"
          height="271"
          viewBox="0 0 271 271"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M58.5641 1C58.8402 1 59.0641 0.776142 59.0641 0.5C59.0641 0.223858 58.8402 0 58.5641 0H0.5L0.499989 -5.11984e-06C0.223846 -5.14398e-06 -1.14637e-05 0.223852 -1.14878e-05 0.499995C-1.14879e-05 0.501138 -7.65463e-06 0.502279 -1.50806e-10 0.50342L-2.55992e-06 58.5641C-2.57199e-06 58.8402 0.223855 59.0641 0.499997 59.0641C0.77614 59.0641 0.999997 58.8402 0.999997 58.5641L1 0.999995L58.5641 1Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M212.436 270C212.16 270 211.936 270.224 211.936 270.5C211.936 270.776 212.16 271 212.436 271L270.5 271C270.776 271 271 270.776 271 270.5C271 270.499 271 270.498 271 270.497L271 212.436C271 212.16 270.776 211.936 270.5 211.936C270.224 211.936 270 212.16 270 212.436L270 270L212.436 270Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 212.436C1 212.16 0.776142 211.936 0.5 211.936C0.223858 211.936 -9.7852e-09 212.16 -2.18558e-08 212.436L-2.18557e-08 270.5L-2.55992e-06 270.5C-2.57199e-06 270.776 0.223855 271 0.499997 271C0.50114 271 0.502282 271 0.503423 271L58.5641 271C58.8402 271 59.0641 270.776 59.0641 270.5C59.0641 270.224 58.8402 270 58.5641 270L0.999997 270L1 212.436Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M270 58.5641C270 58.8402 270.224 59.0641 270.5 59.0641C270.776 59.0641 271 58.8402 271 58.5641L271 0.499989C271 0.223846 270.776 -1.14734e-05 270.5 -1.15097e-05C270.499 -1.15098e-05 270.498 -7.67659e-06 270.497 -2.21556e-08L212.436 -5.11984e-06C212.16 -5.14398e-06 211.936 0.223852 211.936 0.499995C211.936 0.776137 212.16 0.999995 212.436 0.999995L270 1L270 58.5641Z"
            fill="white"
          />
        </svg>
        {this.state.isScanning && this.renderScanning()}
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
    background: "var(--bark)",
  },
};

export default QRPage;
