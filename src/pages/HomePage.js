import React, { Component } from 'react';
import ScrollView from '../components/react-mobile-hackathon/devices/ScrollView';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import { HashLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import Button from '../components/button';


class HomePage extends Component {

    state = {
        ready: false
    };

    componentDidMount() {
        setTimeout(() => this.setState({ ready: true }), 500);
    }

    renderLoading = () => {
        return (
          <LoadingView
            style={{ background: "var(--bark)", position: "absolute", zIndex: 100 }}>
            <HashLoader color='#947AF7' loading={!this.state.ready} />
          </LoadingView>
        );
    };

    renderBody = () => {
        return (
            <ScrollView>
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 48px'}}>
                <img src="logo.svg" style={{width: 241}} />
                <span style={{marginTop: 56, color: 'var(--snow)', font: 'var(--title)'}}>
                  Uncovering<br/> Canberra's bushland
                </span>
                <span style={{marginTop: 12, color: 'var(--snow)', font: 'var(--copy16)'}}>
                  Canberra is unique city, designed to include pockets of nature – we are truly the ‘bush capital’. 
                  <br />
                  <br />
                  Discover Canberra’s environment and biodiversity and how it plays a large part in our everyday lives.
                </span>

                <Button to="/profile" label="Sign In" style={{marginTop: 56}} />
                <Button to="/register" label="Register" variant="secondary" style={{marginTop: 16}} />

                <Link to="/reset-password" style={{color: 'var(--navy)', marginTop: 16, font: 'var(--copy14)'}}>Forgot your password?</Link>

                <img src="branch.svg" style={{width: '100%', position: 'absolute', bottom: 14, pointerEvents: 'none'}} />
              </div>
            </ScrollView>
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
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bark)',
    }
};

export default HomePage;
