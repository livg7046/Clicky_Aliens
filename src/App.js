import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ReactTimeout from 'react-timeout'
import Card from "./components/card/";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Alert from './components/alert';
import data from './images.json';

class App extends Component {
  state = {
    score: 0,
    message: "Click on each image to win!  But only click each one once...",
    images: data,
    isHidden: true
  }
  
  randomize(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handleImageClick = index  => {
    let imageArray = this.state.images;
    let tempScore = this.state.score;
  
    if (this.state.images[index].clicked === false) {
      imageArray[index].clicked = true;
      console.log(this.state.images[index])
      tempScore++;
      this.setState({
        images: imageArray, 
        score: tempScore
      })

      
      if(tempScore===this.state.images.length){
        this.youWin()

      }

    } else {
      this.youLose();
    }
  }

  toggle = () => {
    this.setState({isHidden: !this.state.isHidden})
  }

  youLose = () => {
    console.log(this.state.images)
    this.setState({message:"You Lose!, try again!", score: 0});
    this.setState({isHidden: false});
    setTimeout(this.newGame, 2000);
    console.log(this.state.images)
    // this.setState({
    //   score: 0
    // });
  }

  newGame = () => {
    this.toggle();
    this.initArray();
  };

  initArray = () => {
    var i;
    let imageArray = this.state.images;
    for(i=0; i < imageArray.length; i++) {
      imageArray[i].clicked= false;
    }
    this.setState({images : imageArray, message: "In space, no one can hear you scream..." })
  }
  
  youWin = () => {
    this.setState({message:"You Win!, try again!"});
    this.setState({
      score: 0
    })
  }
  
  render() {
    console.log('render')
    this.randomize(this.state.images);
    return (
      <div className="App">
        <header className="App-header">
          <img src="images/title2.png" className="App-logo" alt="logo" />

                
              <div id="message" >
                {this.state.message}
              </div>
          
                <div id="score">
            Score: {this.state.score}/12
            </div>
        </header>
        <div className="App-main">
          { !this.state.isHidden && <Alert /> }
          <div className="container" id="cardDiv">
          {
            
            this.state.images.map((image, index) =>
              <Card action={this.handleImageClick.bind(this, index)} key={index} url={image.url}/>  
            )
          }
          

              
          </div>
        </div>
      </div>
    );
  }
}

export default App;
