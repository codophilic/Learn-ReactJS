import React, { Component } from "react";

class TextFilters extends Component {
    constructor(props) {
        super(props); // Call the superclass constructor
        // Initialize the state
        this.state = {
            inputUser: ""
        };
    }

    // Lifecycle method that runs after the component mounts
    componentDidMount() {
        console.log("Component has mounted.");
    }

    // Lifecycle method that runs when the component updates
    componentDidUpdate(prevProps, prevState) {
        if (prevState.inputUser !== this.state.inputUser) {
            console.log("Component has updated. New input:", this.state.inputUser);
        }
    }

    // Lifecycle method that runs just before the component unmounts
    componentWillUnmount() {
        console.log("Component is about to unmount.");
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; // Allows the component to update
    }
    
    // Event handler for handling changes in the textarea
    onChangeEvent = (event) => {
        this.setState({ inputUser: event.target.value });
    };

    render() {
        return (
            <div>
                <h2>This is a Filter Class</h2>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Enter your Text Here</label>
                    <textarea
                        className="form-control"
                        value={this.state.inputUser}
                        onChange={this.onChangeEvent}
                        id="exampleFormControlTextarea1"
                        rows="3"
                    ></textarea>
                </div>
                <p>Your input: {this.state.inputUser}</p>
            </div>
        );
    }
}

export default TextFilters;
