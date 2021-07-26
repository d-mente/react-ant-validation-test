import React from 'react';
import * as Types from '../../types';


export class Space extends React.Component<Types.SpaceProperties> {
    public state: any;

    static defaultProps = {}

    static propTypes = {}

    constructor(props: Types.SpaceProperties) {
        super(props)

        this.state = {
            style:{
                height: '100px',
                width: '100%',
                display: 'inline-flex'
            }
        }

        if(props.height) this.state.style.height = `${props.height}px`;
        if(props.width) this.state.style.width = `${props.width}px`;
    }



    render() {
        return <>
            <div className="" style={this.state.style}/>
        </>;
    }

}


