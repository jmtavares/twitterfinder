import React from 'react';
import ReactDom from 'react-dom';
import Header from '../Header';
import Footer from '../Footer';

require('../../styles/main.less');

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        )
    }
}

ReactDom.render(<HomePage/>, document.querySelector('#app'));
