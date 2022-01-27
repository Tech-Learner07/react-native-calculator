require("../lib/swisscalc.lib.format.js");
require("../lib/swisscalc.lib.operator.js");
require("../lib/swisscalc.lib.operatorCache.js");
require("../lib/swisscalc.lib.shuntingYard.js");
require("../lib/swisscalc.display.numericDisplay.js");
require("../lib/swisscalc.display.memoryDisplay.js");
require("../lib/swisscalc.calc.calculator.js");

import React from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import { CalcButton, CalcDisplay } from './../components';

export default class CalculatorScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            display: "0",
        };

        // Initialize calculator
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        // initialize pan responder
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) =>true,
            onPanResponderRelease: (evt, gestureState) => {
                if(Math.abs(gestureState.dx) >= 50) {
                    this.onBackspacePress()
                }
            },
        });


    }

    onDigitPress = (digit) => {
        this.calc.addDigit(digit);
        this.setState({ display: this.calc.getMainDisplay() });
    }

    onClearPress = () => {
        this.calc.clear();
        this.setState({ display: this.calc.getMainDisplay() });
    }

    onBackspacePress = () => {
        this.calc.backspace();
        this.setState({ display: this.calc.getMainDisplay() });
    }

    onSignPress = () => {
        this.calc.negate();
        this.setState({ display: this.calc.getMainDisplay() });
    }

    onBinaryOperatorPress = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay() });
    }

    onUnaryOperatorPress = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay() });
    }
    
    onEqualsPressed = () => {
        this.calc.equalsPressed();
        this.setState({ display: this.calc.getMainDisplay() });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.displayContainer} {...this.panResponder.panHandlers}>
                    <CalcDisplay font={70} display={this.state.display} />
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {;this.onClearPress()}} title="C" color="#1C1C1C" backgroundColor="#D4D4D2" />
                        <CalcButton onPress={() => {;this.onSignPress()}} title="±" color="#1C1C1C" backgroundColor="#D4D4D2" />
                        <CalcButton onPress={() => {;this.onUnaryOperatorPress(this.oc.PercentOperator)}} title="%" color="#1C1C1C" backgroundColor="#D4D4D2" />
                        <CalcButton onPress={() => {;this.onBinaryOperatorPress(this.oc.DivisionOperator)}} title="÷" color="#D4D4D2" backgroundColor="#fe9e09" style={{ fontSize: 400 }} />
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {;this.onDigitPress('7')}} title="7" color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onDigitPress('8')}} title="8" color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onDigitPress('9')}} title="9" color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onBinaryOperatorPress(this.oc.MultiplicationOperator) }} title="×" color="#D4D4D2" backgroundColor="#fe9e09" />
                    </View>
                    
                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {;this.onDigitPress('4')}} title="4" color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onDigitPress('5')}} title="5" color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onDigitPress('6')}} title="6" color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onBinaryOperatorPress(this.oc.SubtractionOperator)}} title="-" color="#D4D4D2" backgroundColor="#fe9e09" />
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {;this.onDigitPress('1')}} title="1" color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onDigitPress('2')}} title="2" color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onDigitPress('3')}} title="3" color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onBinaryOperatorPress(this.oc.AdditionOperator)}} title="+" color="#D4D4D2" backgroundColor="#fe9e09" />
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {;this.onDigitPress('0')}} title="0" color="#D4D4D2" backgroundColor="#505050" style={{ width: 160, }} />
                        <CalcButton onPress={() => {;this.onDigitPress('.')}} title="." color="#D4D4D2" backgroundColor="#505050" />
                        <CalcButton onPress={() => {;this.onEqualsPressed()}} title="=" color="#D4D4D2" backgroundColor="#fe9e09" />
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#1C1C1C"
    },
    displayContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonContainer: {
      paddingBottom: 20,  
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: 'space-between',

    }
})