import React from 'react';
import ReactDom from 'react-dom';


class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            tweets: [],
            username: '',
            query: ''
        };
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        var username = this.refs.username.value.trim();
        var query = this.refs.query.value.trim();
        if (!username || !query) {
            return;
        }

        this.setState({
            username: username,
            query: query
        });
        
        $.ajax({
            url: '/api/getTweets',
            dataType: 'json',
            type: 'POST',
            data: {
                username: username,
                query: query
            },
            success: function(data) {
                this.setState({
                    tweets: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('/api/getTweets', status, err.toString());
            }.bind(this)
        });
    }


    render() {
        var tweets = this.state.tweets.map(idx => {
            return <li key={idx.id}>{idx.text}</li>
        });
        
        return (
            <div>
                <form className="twitterForm" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" placeholder="username" ref="username"/>
                    <input type="text" placeholder="search" ref="query"/>
                    <input type="submit" value="Search"/>
                </form>
                <ul>{tweets}</ul>
            </div>
        )
    }
}

export default Search;
