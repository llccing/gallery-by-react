require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

let json = require('../data/imagesDatas.json');

json = (function (json) {
  for (let i = 0; i < json.length; i++) {
    json[i].url = `../images/imgs/${json[i].fileName}`;
  }
  return json;
})(json);

function change(json) {
  let width = document.body.clientWidth - 340;
  let height = document.body.clientHeight - 520;
  let rotate, left, top;
  for (let i = 0; i < json.length; i++) {
    json[i].rotate = `rotate(${(Math.random() * 90 - 45)}deg)`;
    json[i].left = (Math.random() * width) + "px";
    json[i].top = (Math.random() * height) + "px";
  }
  return json;
}

// 图片组件
class ImgFigure extends React.Component {
  constructor() {
    super();
    this.state = {
      data: change(json)
    }
  }

  changePosition() {
    this.setState({
      data: change(json)
    });
  }


  componentDidMount() {

  }

  render() {


    let data = this.state.data;
    return (
      <figure onClick={this.changePosition.bind(this)} style={{ left: this.props.data.left, top: this.props.data.top, transform: this.props.data.rotate }}>
        <img className="figure-img" src={this.props.data.url} title="img not found" />
        <figcaption>
          <h2>{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

// 外层组件
class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    const constant = {
      centPos: {
        left: 0,
        top: 0
      },
      hPosRange: { // 水平方向取值
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    };
  }


  // 组件加载后，计算图片位置范围
  componentDidMount() {
    console.log(this);
    // 首先拿到舞台的大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);

    console.log(stageW);
    console.log(stageH);
    console.log(halfStageW);
    console.log(halfStageH);

    // 拿到一个imageFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imageFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // 计算中心图片的位置点
    this.constant.centPos = {
      left: halfImgW - halfImgW,
      top: halfStageH - halfImgH
    };

    // 左侧和右侧的位置点
    this.constant.hPosRange.leftSecX[0] = -halfImgW; // 左侧最小
    this.constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3; // 左侧最大
    this.constant.hPosRange.rightSecX[0] = halfStageW + halfImgW; // 右侧最小
    this.constant.hPosRange.rightSecX[1] = stageW - halfImgW; // 右侧最大
    this.constant.hPosRange.y[0] = -halfImgH;
    this.constant.hPosRange.y[1] = stageH - halfImgH;

    // 上侧区域的取值范围
    this.constant.vPosRange.top[0] = -halfImgH;
    this.constant.vPosRange.top[1] = stageH - halfImgH * 3;
    this.constant.vPosRange.x[0] = halfStageW - imgW;
    this.constant.vPosRange.x[1] = halfStageW;

  }

  render() {
    var controllerUnits = [],
      imgFigures = [];
    json.forEach(function (value, index) {
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index} />);
      controllerUnits.push(<li></li>);
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
