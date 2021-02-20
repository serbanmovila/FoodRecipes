import React from 'react'
import AuthScreen from '../Auth/AuthScreen'
import Dashboard from './../Dashboard/Dashboard'

export default class AppNavigator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false,
        }
    }

    render() {
        const { loggedIn } = this.state
        const { screen } = this.props

        if (loggedIn) {
            return (
                <Dashboard
                    screen={screen === undefined ? 'ingredients' : screen}
                />
            )
        } else return <AuthScreen />
    }
}
