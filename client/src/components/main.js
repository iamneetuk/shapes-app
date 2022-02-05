import React, { Component } from 'react';
import Shapes from './shapes';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Drawing Board</h2>
                <Shapes/>
            </div>
        )
    }
}
export default Main;


