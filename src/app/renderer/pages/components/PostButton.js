import React from 'react';
import Button from '@mui/material/Button';

class PostButton extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {

    const divisionsValue = document.getElementById('divisions').value;
    const xOrigin = document.getElementById('x-origin').value;
    const yOrigin = document.getElementById('y-origin').value;
    const xDestiny = document.getElementById('x-destiny').value;
    const yDestiny = document.getElementById('y-destiny').value;

    const postData = {
      origin: `(${xOrigin}, ${yOrigin})`,
      points: [(xDestiny, yDestiny)],
      divisions: `${divisionsValue}`,
      maze: "labirinto"
    };

    console.log(postData);

    fetch('http://localhost:3000/input-dados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => {
        if (response.ok) {
          console.log("Response OK!");
        } else {
          console.log("Response not OK");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center" onClick={this.handleClick}>Iniciar Rotina</Button>
    );
  }
}

export default PostButton;
