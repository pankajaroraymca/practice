import { Component } from "react";

export class CounterClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increaseCounter = this.increaseCounter.bind(this);
  }

  increaseCounter(e) {
    this.setState((prevState) => {
      return {
        ...prevState,
        count: prevState.count + 1,
      };
    });
  }

  render() {
    return (
      <>
        <h4>This is a class based component</h4>
        <span>My name is {this.props.name} and age is {this.props.age}</span>
        <span>Count: {this.state.count}</span>
        <button onClick={this.increaseCounter}>Increase Counter</button>
      </>
    );
  }
}
