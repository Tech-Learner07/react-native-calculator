
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class CalcDisplay extends React.Component {

    static defaultProps = {
        display: "",
        font: 70
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.display, {fontSize: this.props.font}]}>{this.props.display}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    display: {
        color: "white",
        textAlign: "right"
    }
})