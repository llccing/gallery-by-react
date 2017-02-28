require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

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

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-list">
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
