import React from "react";
import PropTypes from "prop-types";
const ThemeContext = React.createContext(null);
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
        <ThemeContext.Consumer>
          {(context) => (
            <h1
              style={{ background: context.background, color: context.color }}
            >
              {this.props.children}
            </h1>
          )}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

function Child(props, context) {
  console.log("函数子组件：");
  console.log(context);
  return (
    <ThemeContext.Consumer>
      {(context) => (
        <h1 style={{ background: context.background, color: context.color }}>
          我是函数子组件
        </h1>
      )}
    </ThemeContext.Consumer>
  );
}

class ChildClass extends React.Component {
  render() {
    console.log("类子组件：");
    console.log(this.context);
    return (
      <ThemeContext.Consumer>
        {(context) => (
          <h1 style={{ background: context.background, color: context.color }}>
            我是类子组件
          </h1>
        )}
      </ThemeContext.Consumer>
    );
  }
}

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
  render() {
    const color = "purple";
    const children = this.props.messages.map((message) => (
      <Message key={message.text} text={message.text} color={color} />
    ));
    return (
      <ThemeContext.Provider value={{ background: "red", color: "white" }}>
        {children}
      </ThemeContext.Provider>
    );
  }
}
