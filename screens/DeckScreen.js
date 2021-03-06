import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
    renderCard(job) {
        const initialRegion ={
            latitude: job.latitude,
            longitude: job.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.02
        }

        return(
            <Card title={job.jobtitle}>
                <View style={{height: 300}}>
                    <MapView
                        scrollEnabled={false}
                        style={{flex: 1}}
                        cacheEnabled={Platform.OS === 'android' ? true : false}
                        initialRegion={initialRegion}
                    >
                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>{job.snippet.replace(/<b>/g,'').replace(/<\/b>/g, '')}</Text>
            </Card>
        );
    }

    noMoreJobs() {
        return(
            <Card title="No more jobs">
            </Card>
        );
    }

    render() {
        return (
            <View>
                <Swipe
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.noMoreJobs}
                    onSwipeRight={job => this.props.likeJob(job)}
                    keyProp="jobkey"
                />
            </View>
        );
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
}

function mapStateToProps({ jobs }) {
    return { jobs: jobs.results };
}

export default connect(mapStateToProps, actions)(DeckScreen);
