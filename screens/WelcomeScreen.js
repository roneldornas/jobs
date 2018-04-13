import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03a9f4' },
    { text: 'You to find a local job', color: '#c2185b'},
    { text: 'Set your location', color: '#03a9f4' }
]

class WelcomeScreen extends Component {
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        return (
            <Slides
                data={ SLIDE_DATA }
                onComplete={this.onSlidesComplete}
            />
        );
    }
}

export default WelcomeScreen;
