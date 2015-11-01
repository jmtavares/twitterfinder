import React from 'react';
import ReactDom from 'react-dom';
import Header from '../Header';
import Search from '../Search';

require('../../styles/main.less');

class HomePage extends React.Component {
    render() {
        return (
            <div className="homepage">
                <Header />
                <div className="search">
                    <div className="search-container">
                        <Search />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDom.render(<HomePage/>, document.querySelector('#app'));
