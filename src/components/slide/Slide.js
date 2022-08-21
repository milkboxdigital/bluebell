import Glide from "@glidejs/glide";
import React from "react";

class Slide extends React.Component {
  componentDidMount() {
    new Glide(".glide", {
      perView: 2,
      peek: { before: 0, after: 30 },
      dragThreshold: 80,
      gap: 12,
    }).mount();
  }

  render() {
    return (
      <div class="glide" style={{ ...this.props.style }}>
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides" style={{ padding: 4 }}>
            {React.Children.map(this.props.children, (child) => (
              <li class="glide__slide">{React.cloneElement(child)}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Slide;
