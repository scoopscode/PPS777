import ReactDOM from 'react-dom'
import {useState} from 'react'
import './index-style.scss'
import {
    renderTarget,
    useInteractionEvent,
    getSimVar,
    setSimVar,
    useUpdate
} from '../util.js';

const Instrument = () => {
    return(
        <div>
            <h1>pfd</h1>
        </div>
    )
}

ReactDOM.render(<Instrument />, renderTarget)