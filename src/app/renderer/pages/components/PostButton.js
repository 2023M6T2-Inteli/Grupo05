import React from 'react';
import Button from '@mui/material/Button';

class PostButton extends React.Component {
  handleClick = () => {
    const postData = {
      origin: "coordenada de ínicio",
      points: "pontos que o robo vai passar",
      maze: "labirinto"
    };

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
