import React, { Component } from 'react';
import { View, Text, Platform, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => {
       return {
            headerTitle: 'Review Jobs',
            headerRight: <Button
                title='Settings'
                onPress={ () => {navigation.navigate('settings')} }
                backgroundColor="rgba(0,0,0,0)"
                color="rgba(0,122,255,1)"
            />
        }
    }
    
    renderLikedJobs = () => {
        return this.props.likedJobs.map(job => {
            return (
                <Card>
                    <View style={{ height: 200 }}>
                        <View style={style.detailWrapper}>
                            <Text style={styles.italic}>{job.company}</Text>
                            <Text style={styles.italic}>{job.formattedRelativeTime}</Text>
                        </View>
                    </View>
                </Card>
            );
        });
    }
    
    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs}
            </ScrollView>    
        );
    }
}

const styles = {
    detailWrapper: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italic: {
        fontStyle: 'italic'
    }
}

function mapStateToProps(state) {
    return {
        likedJobs: state.likedJobs
    };
  }

export default connect(mapStateToProps)(ReviewScreen);
