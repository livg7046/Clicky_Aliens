import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from "./components/card/";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    score: 0,
    message: "Don't click the same card twice!",
    images: [
      {
          "url": "images/alien-awakening.png",
          "id": 1,
          "clicked": false
      },
      {
          "url": "images/alien_queen.jpg",
          "id": 2,
          "clicked": false
      },
      {
          "url": "images/aliens_newt.jpg",
          "id": 3,
          "clicked": false
      },
      {
          "url": "images/elevator.jpg",
          "id": 4,
          "clicked": false
      },
      {
          "url": "images/egg.png",
          "id": 5,
          "clicked": false
      },
      {
        "url": "images/get away.jpg",
        "id": 5,
        "clicked": false
    },
    {
      "url": "images/mouths.jpg",
      "id": 5,
      "clicked": false
    },
    {
      "url": "images/ripley_suit.png",
      "id": 5,
      "clicked": false
    }
  ]
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

  youLose = () => {
    this.setState({message:"You Lose!, try again!"});
    this.setState({
      score: 0
      
    })
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
          <h1 className="App-title">                <div id="score">
                  Score: {this.state.score}
                </div>
                <div id="message" >
                  {this.state.message}
                </div></h1>
        </header>
        <div className="App-main">
          <div className="container">
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
