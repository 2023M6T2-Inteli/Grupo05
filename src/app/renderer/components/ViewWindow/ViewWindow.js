import React, {Component} from "react";
import './ViewWindow.css';

export default class ViewWindow extends Component {
    content = {
        src: 'https://img.freepik.com/free-vector/gradient-heat-map-background_23-2149528517.jpg',
        type: '',
        alt: '',
    };
    
    render(){
        const content = this.content

        return (
        <div className="wrapper">
            <img src={content.src} className="content" alt={content.alt}/>
        </div>
        );
    };
}

