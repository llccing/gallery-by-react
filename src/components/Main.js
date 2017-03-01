require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
let json = require('../data/imagesDatas.json');
console.log(json);
let imgsArr  = [];
(function(imgsArr){
  for(let i =1;i<=10;i++){
    imgsArr.push(require(`../images/imgs/${i}.jpg`));
  }
  return imgsArr;
})(imgsArr);

console.log(imgsArr);

let imgs = imgsArr.map(function (item) {
  return (
    <li>
      <img src={item} title/>
    </li>
  );
});
console.log(imgs);

let ImgFigure = React.createClass({
  render(){
    return (
      <figure>
        <img src={this.props.data.fileNme} title="img not found"/>
        <figcaption>
          <h2>title</h2>
        </figcaption>
      </figure>
    );
  }
});

class AppComponent extends React.Component {
  render() {
    var controllerUnits = [],
        imgFigures = [];
        imgsArr.forEach(function (value) {
          imgFigures.push(<ImgFigure data={value}/>)
        });
    return (
      <section className="stage">
        <section className="controller">
          {imgFigures}
        </section>
        <nav className="nav">
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
