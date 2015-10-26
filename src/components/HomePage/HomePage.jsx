import React from 'react';
import ReactDom from 'react-dom';

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Twitter Finder</h1>
            </div>
        )
    }
}

ReactDom.render(<HomePage/>, document.querySelector('#app'));
