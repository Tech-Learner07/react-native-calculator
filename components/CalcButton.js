
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class CalcButton extends React.Component {

    static defaultProps = {
        onPress: function () { },
        title: "",
        color: "white",
        backgroundColor: "black",
        style: {},
    }

    render() {
        var bc = this.props.backgroundColor;

        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress}
                    style={[styles.container, { backgroundColor: bc }, { ...this.props.style },]}>
                    <Text style={[styles.text, { color: this.props.color }]}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 45,
        margin: 5,
    },
    text: {
        fontSize: 35,
    },
});