import React, { Component } from 'react'
import SimpleCalculatorContract from '../build/contracts/SimpleCalculator.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

let simpleCalculator;

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      resultValue: 0,
      changedValue1: 0,
      changedValue2: 0,
      web3: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      const contract = require('truffle-contract');
      simpleCalculator = contract(SimpleCalculatorContract);

      simpleCalculator.setProvider(this.state.web3.currentProvider);

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  handleSubmit(event) {

    // Declaring this for later so we can chain functions on SimpleCalculator.
    let simpleCalculatorInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleCalculator.deployed().then((instance) => {
        simpleCalculatorInstance = instance;
        // Performs sum.
        return simpleCalculatorInstance.addition(this.state.changedValue1, this.state.changedValue2, {from: accounts[0]})
      }).then((result) => {
        // Update state with the result.
        return this.setState({ resultValue: result.c[0] })
      })
    })

    event.preventDefault();
  }

  handleChange1(event) {
    this.setState({changedValue1: Number(event.target.value)});
  }

  handleChange2(event) {
    this.setState({changedValue2: Number(event.target.value)});
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Simple Calculator</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Welcome to the Simple calculator on ethereum!</h1>
              <p>The result value is: {this.state.resultValue}</p>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Value1: <input type="text" onChange={this.handleChange1} />
                </label>
                <br/>
                <br/>
                <label>
                  Value2: <input type="text" onChange={this.handleChange2} />
                </label>
                <br/>
                <br/>
                <input type="submit" value="Calculate" />
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
