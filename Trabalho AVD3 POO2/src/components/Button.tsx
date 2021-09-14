import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet, Platform } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button( { title, ...rest }:ButtonProps ){
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}
        >
            <Text style={styles.buttonText}>
              {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0DD92F',
        padding: Platform.OS == 'ios' ? 15 : 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold'
    },
})