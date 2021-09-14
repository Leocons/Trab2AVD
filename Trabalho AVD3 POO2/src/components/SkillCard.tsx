import React from "react"
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'

interface SkillCardProps extends TouchableOpacityProps {
    skill: string
}

export function SkillCard({ skill, ...rest }: SkillCardProps){
    return (
        <TouchableOpacity style={styles.buttonSkill} {...rest}>
            <Text style={styles.textSkill}>
                {skill}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#898F9C',
        padding: 15,
        alignItems: 'center',
        marginBottom: 15
    },
    textSkill: {
        color: '#000',
        fontSize: 21,
        fontWeight: 'bold'
    }
})