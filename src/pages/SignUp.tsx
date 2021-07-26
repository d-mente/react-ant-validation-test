import React from 'react';
import PropTypes from 'prop-types';
import SignUpClassForm from '../components/forms/SignUpClass';
import SignUpFunctionForm from '../components/forms/SignUpFunction';
import SignUpFunctionCustom from '../components/forms/SignUpCustom';
import * as Core from '../components/core'
//'../components/core';
//import Space from '../components/core/Space';
// import Core from '../components/core';


class SignUp extends React.Component {
    constructor(props: any) {
        super(props)

        console.log('constructor')
    }

    // life cycle
    componentDidMount() {
        console.log('componentDidMount')
    }

    // life cycle
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        console.log('componentDidUpdate', prevProps, prevState, snapshot)
    }

    // life cycle
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    render() {
        return <>
            <Core.Space height={50}/>
            <h1>Function</h1>
            <Core.Space height={50}/>
            <SignUpFunctionForm />;


            <Core.Space height={50}/>
            <h1>Class</h1>
            <Core.Space height={50}/>
            <SignUpClassForm />;


            <Core.Space height={50}/>
            <h1>Custom</h1>
            <Core.Space height={50}/>
            <SignUpFunctionCustom />;
        </>
    }
}



export default SignUp
