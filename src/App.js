import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "af0bc547ce794f42887db5740e47dc08"
});

const particleOptions = {
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {}
    };
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    console.log(box);
    this.setState({ box: box });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(error => console.log("Uh oh, something went wrong", error));

    // app.models
    //   .initModel({
    //     id: Clarifai.GENERAL_MODEL,
    //     version: "aa7f35c01e0642fda5cf400f543e7c40"
    //   })
    //   .then(generalModel => {
    //     return generalModel.predict(
    //       "https://samples.clarifai.com/metro-north.jpg"
    //     );
    //   })
    //   .then(response => {
    //     var concepts = response["outputs"][0]["data"]["concepts"];
    //   });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
