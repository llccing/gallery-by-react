require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let json = require('../data/imagesDatas.json');

json = (function(json){
  for(let i =0;i<json.length;i++){
      json[i].url = `../images/imgs/${json[i].fileName}`;
  }
  return json;
})(json);



function change (json) {
  let width = document.body.clientWidth-340;
  let height = document.body.clientHeight - 520;
  let rotate,left,top;
  for(let i = 0;i<json.length;i++){
    json[i].rotate = `rotate(${(Math.random()*90-45)}deg)`;
    json[i].left = (Math.random()*width)+"px";
    json[i].top = (Math.random()*height)+"px";
  }
  return json;
}

console.log(json);

let ImgFigure = React.createClass({
  getInitialState(){
    return {data:change(json)};
  },

  changePosition(){
    this.setState({
      data:change(json)
    });
  },

  render(){
    let data = this.state.data;
    return (
      <figure onClick={this.changePosition} style={{left:this.props.data.left,top:this.props.data.top,transform:this.props.data.rotate}}>
        <img className="figure-img" src={this.props.data.url} title="img not found"/>
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
});

let circleLi = React.createClass({
  render(){
    return(
      <li className="circle-li">o</li>
    );
  }
});

class AppComponent extends React.Component {
  render() {
    var controllerUnits = [],
        imgFigures = [];
        json.forEach(function (value) {
          imgFigures.push(<ImgFigure data={value}/>)
          controllerUnits.push(<li></li>)
        });

    return (
      <section className="stage">
        <section className="controller">
          {imgFigures}
        </section>
        <nav className="nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
