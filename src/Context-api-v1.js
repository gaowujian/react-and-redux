import React from "react";
import PropTypes from "prop-types";
class Button extends React.Component {
  render() {
    console.log(this.context);
    return (
      <div>
        <button style={{ background: this.props.color }}>
          {this.props.children}
        </button>
        <Child />
        <ChildClass />
      </div>
    );
  }
}
Button.contextTypes = {
  color: PropTypes.string,
  data: PropTypes.string,
};

function Child(props, context) {
  console.log("函数子组件：");
  console.log(context);
  return <div>我是函数子组件</div>;
}

Child.contextTypes = {
  color: PropTypes.string,
};
class ChildClass extends React.Component {
  render() {
    console.log("类子组件：");
    console.log(this.context);
    return <div>我是类子组件</div>;
  }
}

ChildClass.contextTypes = {
  color: PropTypes.string,
};

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button color={this.props.color}>Delete</Button>
      </div>
    );
  }
}

export default class MessageList extends React.Component {
  getChildContext() {
    return { color: "purple", data: "data" };
  }

  render() {
    const color = "purple";
    const children = this.props.messages.map((message) => (
      <Message key={message.text} text={message.text} color={color} />
    ));
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string,
  data: PropTypes.string,
};
