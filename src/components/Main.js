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

// 图片组件
class ImgFigure extends React.Component{
  constructor(){
    super();
    this.state={
      data:change(json)
    }
  }

  changePosition(){
    this.setState({
      data:change(json)
    });
  }


  componentDidMount(){

  }

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
}

// 外层组件
class AppComponent extends React.Component {
  constructor(){
    super();

    const constant={
      centPos:{
        left:0,
        right:0
      },
      hPosRange:{ // 水平方向取值
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{
        x:[0,0],
        topY:[0,0]
      }
    };
  }
  // state={
    // count:0
  // }

  // 组件加载后，计算图片位置范围
  componentDidMount(){
    console.log(this);
    var stageDOM = React.findDOMNode(this.refs.stage);
    console.log(stageDOM);
  }

  render() {
    var controllerUnits = [],
        imgFigures = [];
        json.forEach(function (value) {
          imgFigures.push(<ImgFigure data={value}/>)
          controllerUnits.push(<li></li>)
        });

    return (
      <section className="stage" ref="stage">
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
