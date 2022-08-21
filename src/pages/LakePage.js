import React, { Component, useEffect } from 'react';
import LoadingView from '../components/react-mobile-hackathon/devices/LoadingView';
import { HashLoader } from 'react-spinners';

const TIME_PER_STORY = 5000;

const Story = ({children, onNext, onPrev, style}) => {
  return (
    <div style={{position: 'relative', height: '100%', width: '100%', cursor: 'pointer', ...style}}>
      <div onClick={onPrev} style={{position: 'absolute', left: 0, width: 100, height: '100%', }} />
      <div onClick={onNext} style={{position: 'absolute', right: 0, width: 100, height: '100%', }} />
      {children}
    </div>
  );
}

const ThingStory = ({name, scientificName, description, funFacts, status, img, onNext, onPrev, style}) => {
  let statusColor = '#D88E1F';
  if (status === 'Endangered') statusColor = '#BD4018';
  return (
    <Story
        onPrev={onPrev}
        onNext={onNext}
        style={{
          display: 'flex', 
          flexDirection: 'column',
          width: 375,
          minWidth: 375,
          ...style,
        }}>
        <span style={{margin: '35px 24px 0', color: 'var(--dark)', font: 'var(--feature32)'}}>{name}</span>
        <span style={{margin: '12px 24px 0', color: 'var(--bluebell)', font: 'var(--copy14)'}}>Scientific name: {scientificName}</span>
        <span style={{margin: '24px 24px 0', color: 'var(--dark)', font: 'var(--copy16)'}}>{description}</span>

        <span style={{margin: '24px 24px 0', color: 'var(--dark)', font: 'var(--copy16)'}}>Fun facts:</span>
        <ul style={{margin: '12px 24px 0'}}>
          {funFacts.map(fact => (
            <li style={{marginLeft: 32, font: 'var(--copy16)'}}>{fact}</li>
          ))}
        </ul>

        <div style={{display: 'flex', flexDirection: 'column', background: statusColor, margin: '24px 24px 20px', padding: '16px 24px', borderRadius: 10}}>
          <span style={{color: 'var(--mist)', font: 'var(--copy12)'}}>Status</span>
          <span style={{marginTop: 4, color: 'var(--mist)', font: 'var(--feature18)'}}>{status}</span>
        </div>

        <img src={img} style={{position: 'absolute', bottom: 0, height: 200, width: '100%', borderRadius: '0 0 0 0'}} />
    </Story>
  );
}

const PlaceStory = ({place, description, grasslandClass, threatenedFauna, onPrev, onNext, style}) => {
  return (
    <Story
        onPrev={onPrev}
        onNext={onNext}
        style={{
          display: 'flex', 
          flexDirection: 'column',
          width: 375,
          minWidth: 375,
          ...style,
        }}>
        <span style={{margin: '35px 24px 0', color: 'var(--dark)', font: 'var(--feature32)'}}>{place}</span>
        <span style={{margin: '24px 24px 0', color: 'var(--dark)', font: 'var(--copy16)'}}>{description}</span>

        <div style={{marginTop: 24, backgroundImage: 'url(lake_top.png)', width: '100%', height: 563, padding: 24, display: 'flex', flexDirection: 'column'}}>
          <div style={{borderRadius: 10, background: 'var(--grass)', padding: '16px 24px', display: 'flex', flexDirection: 'column',}}>
            <span style={{color: 'var(--dark)', font: 'var(--copy12)'}}>Grassland Class</span>
            {grasslandClass.map(gc => (<span style={{marginTop: 4, font: 'var(--mini-feature)', color: 'var(--dark)'}}>{gc}</span>))}
          </div>
          
          <div style={{marginTop: 24, borderRadius: 10, background: 'var(--sunshine)', padding: '16px 24px', display: 'flex', flexDirection: 'column',}}>
            <span style={{color: 'var(--dark)', font: 'var(--copy12)'}}>Threatened Fauna</span>
            {threatenedFauna.map(tf => (<span style={{marginTop: 4, font: 'var(--mini-feature)', color: 'var(--dark)'}}>{tf}</span>))}
          </div>

          <div style={{flex: 1,}} />
          
          <div style={{justifySelf: 'flex-end', display: 'flex', flexDirection: 'column',}}>
            <img src="up_white.svg" style={{marginTop: 16, width: 24, height: 24, alignSelf: 'center',}} />
            <span style={{marginTop: 6, color: 'var(--snow)', font: 'var(--copy16)', alignSelf: 'center',}}>
              Swipe up to read more
            </span>
          </div>
        </div>

    </Story>
  );
}

const Bar = ({active, timeElapsed, isCurrent}) => {
  if (isCurrent) {
    const perc = timeElapsed/TIME_PER_STORY;
    console.log(perc);
    return (
      <div
          style={{
            height: 5,
            width: 56,
            borderRadius: 10,
            background: `var(--dark)`,
          }}>
        <div
            style={{
              height: 5,
              width: `${perc*56}px`,
              borderRadius: 10,
              background: `var(--sunshine)`,
          }}/>
      </div>
    );
  }
  return (
    <div style={{height: 5,
      width: 56, borderRadius: 10, background: `var(--${active ? 'sunshine' : 'dark'})`, }} />
  );
}

class ProfilePage extends Component {

    state = {
        ready: false,
        index: 0,
        timeElapsed: 0, 
        place: 'Lake Burley Griffin',
    };

    timer = -1;

    componentDidMount() {
        setTimeout(() => this.setState({ ready: true }), 500);
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.index !== this.state.index) {
        this.setState({timeElapsed: 0})
      }
      if ((this.state.ready && !prevState.ready) || prevState.index !== this.state.index) {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.setState({timeElapsed: this.state.timeElapsed + 30});
          if (this.state.timeElapsed >= TIME_PER_STORY) {
            clearInterval(this.timer);
            if (this.state.index < 4) {
              this.setState({
                index: this.state.index + 1,
              });
            }
          }
        }, 30);
      }
    }

    renderLoading = () => {
        return (
            <LoadingView
              style={{ background: "var(--mist)", position: "absolute", zIndex: 100 }}>
              <HashLoader color='#947AF7' loading={!this.state.ready} />
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
            <div style={{background: 'url(lake.png)', width: 375, backgroundPosition: 'cover', padding: '62px 24px 13px', display: 'flex', justifyContent: 'space-between',}}>
              <Bar active={true} timeElapsed={this.state.timeElapsed} isCurrent={this.state.index === 0} />
              <Bar active={this.state.index >= 1} timeElapsed={this.state.timeElapsed} isCurrent={this.state.index === 1} />
              <Bar active={this.state.index >= 2} timeElapsed={this.state.timeElapsed} isCurrent={this.state.index === 2} />
              <Bar active={this.state.index >= 3} timeElapsed={this.state.timeElapsed} isCurrent={this.state.index === 3} />
              <Bar active={this.state.index >= 4} timeElapsed={this.state.timeElapsed} isCurrent={this.state.index === 4} />
            </div>
            <div style={{display: 'flex', height: '100%', transition: 'margin-left 0.2s ease-in-out', marginLeft: -this.state.index*375}}>
              <PlaceStory 
                  place="Lake Burley Griffin"
                  description="As an important freshwater ecosystem, the Lake and its margins are a significant wildlife refuge and bird habitat."
                  grasslandClass={['Grassland', 'Urban Vegetation']}
                  threatenedFauna={['Golden Sun Moth', 'Striped Legless Lizard', 'Perunga Grasshopper',]}
                  onNext={() => {this.setState({index: this.state.index + 1})}}>
              </PlaceStory>
              <ThingStory 
                  name="Perunga Grasshopper"
                  scientificName="Perunga ochracea"
                  description="The Perunga Grasshopper is a flightless, short-winged grasshopper, growing up to 35 mm long. Its colour ranges from brown or grey in dry years, to green in wet years. In Canberra, the species is distinguished by a pale 'X' on its back. The species is restricted to local patches of suitable native vegetation that have become increasingly fragmented by land clearing."
                  funFacts={[
                    'They can leap over a metre high!',
                    'Females are twice as long as males, growing to about 30mm long.',
                  ]}
                  status='Endangered'
                  img="http://lh3.ggpht.com/UJfzJ_BMJZ_VBGRLG9qRQcgusx-9VSVFkPbHuThjc7_Z0Z2KFhrGMylSQYR9XYF9kwKDoG9Ex68L1TD000Vb=s600"
                  onPrev={() => {this.setState({index: this.state.index - 1})}}
                  onNext={() => {this.setState({index: this.state.index + 1})}}>
              </ThingStory>
              <ThingStory 
                  name="Striped Legless Lizard"
                  scientificName="Delma impar"
                  description="Once widespread and even found in Melbourne, Striped Legless Lizards persist in just a few remaining areas as agriculture and housing developments engulf their grassland habitat. They are unable to live in areas where the ground is disturbed by tilling or heavy grazing."
                  funFacts={[
                    'They look like snakes, but have tiny remnant hind limbs.',
                    'They are carnivores, feeding on spiders, crickets, grasshoppers, caterpillars and even cockroaches.',
                    'They can grow up to 30 cm long.',
                  ]}
                  status='Vulnerable'
                  img="https://museumsvictoria.com.au/media/12978/vic-stripedleglesslizard-large.jpg"
                  onPrev={() => {this.setState({index: this.state.index - 1})}}
                  onNext={() => {this.setState({index: this.state.index + 1})}}>
              </ThingStory>
              <ThingStory 
                  name="Golden Sun Moth"
                  scientificName="Synemon plana"
                  description="The Golden Sun Moth is vulnerable to loss and degradation of its habitat caused by human activity and invading weeds. Housing developments, agriculture, grazing and mowing are among the disturbances that endanger this species. Golden Sun Moths are unable to disperse more than a few hundred metres, which means that they cannot migrate into new areas."
                  funFacts={[
                    'This species is diurnal, meaning they are active during they day.',
                    'Adult moths live for only one to four days.',
                    'The females rarely fly. The males can be seen flying in a zig-zag pattern in the warmest part of the day looking for the females.',
                  ]}
                  status='Vulnerable'
                  img="https://media.australian.museum/media/dd/images/Golden_Sun_Moth_Synemon_plana.width-800.cd6ee22.jpg"
                  onPrev={() => {this.setState({index: this.state.index - 1})}}
                  onNext={() => {this.setState({index: this.state.index + 1})}}>
              </ThingStory>
              
              <Story
                  onPrev={() => {this.setState({index: this.state.index - 1})}}
                  style={{
                    display: 'flex', 
                    flexDirection: 'column',
                    width: 375,
                    minWidth: 375,
                  }}>
                  <span style={{margin: '35px 24px 0', color: 'var(--dark)', font: 'var(--feature32)'}}>Why is this happening?</span>

                  <span style={{margin: '24px 24px 0', color: 'var(--dark)', font: 'var(--copy16)'}}>The major threats to these threatened species are:</span>
                  <ul style={{margin: '12px 24px 0'}}>
                    <li style={{marginLeft: 32, font: 'var(--copy16)'}}>Clearing of native grasslands for pasture or cultivation improvement</li>
                    <li style={{marginLeft: 32, font: 'var(--copy16)'}}>Weed invasion in native grassland habitats</li>
                    <li style={{marginLeft: 32, font: 'var(--copy16)'}}>Overgrazing or close mowing</li>
                    <li style={{marginLeft: 32, font: 'var(--copy16)'}}>Excessive vegetation biomass</li>
                    <li style={{marginLeft: 32, font: 'var(--copy16)'}}>Widespread unplanned fires</li>
                    <li style={{marginLeft: 32, font: 'var(--copy16)'}}>Free range domestic pets becoming predators</li>
                  </ul>
                  
                  <span style={{margin: '24px 24px 0', color: 'var(--dark)', font: 'var(--copy16)'}}>
                    Does anything on this list apply to you or your household? Have you seen these things happening near your area?
                  </span>

                  <div style={{position: 'absolute', width: '100%', bottom: 0, background: 'var(--sunshine)', padding: '30px 24px', display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                      <span style={{color: 'var(--dark)', font: 'var(--feature32)'}}>What can<br/>we do to help?</span>
                      <img src="bluebell.svg" style={{width: 40}} />
                    </div>
                    <span style={{marginTop: 24, color: 'var(--dark)', font: 'var(--mini-title)'}}>Report a sighting</span>
                    <span style={{marginTop: 4, color: 'var(--dark)', font: 'var(--copy16)'}}>
                      If you’ve spotted a threatened species, reporting the sighting can help us better understand and manage the species.
                    </span>
                    <img src="up.svg" style={{marginTop: 16, width: 24, height: 24, alignSelf: 'center',}} />
                    <span style={{marginTop: 6, color: 'var(--dark)', font: 'var(--copy16)', alignSelf: 'center',}}>
                      Swipe up to learn more
                    </span>
                  </div>
              </Story>
            </div>
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
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--mist)',
    }
};

export default ProfilePage;
