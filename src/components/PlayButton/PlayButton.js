import { useState } from "react";
import * as Tone from 'tone'
import { useLocation } from "react-router";

function PlayButton (props) { //// <--------<------<-----<------The play Button -------------------------- ////> nned to abstract, pass in steps?
    // 
    const location = useLocation()
    const [isPlaying, setIsPlaying] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('play')
    let steps = []
    let synthParams
    let seqParams
    
    

    function startStop () {

        console.log('clicked?');
        

        if (location.pathname = '/newbeep') {
            steps = props.newSteps
            seqParams = props.newSeqParams
            synthParams = props.newSynthParams
        } 
        if (location.pathname = '/userbeeps') {
            console.log(props.userBeep);
            steps = props.userBeep.userSteps
            seqParams = props.userBeep
            synthParams = props.userBeep
        }

        

        if (!isPlaying) {  // starts Tone if stopped
            setIsPlaying(true)  // flips playing boolean
            setPlayButtonText('stop') // flips button text
    
            Tone.start() // start tone audio context on user interaction per spec of web audio api
    
    
            // leaving space mentally for a section for configuring (stretch) probability of the sequence
    
            Tone.Transport.bpm.value = seqParams.bpm; // sets BPM to input from BPM range select, sets state of BPM 
    
            const volumeNode = new Tone.Volume(-18).toDestination();
    
            // instantiates a mono synth. the parameters are set to the state object "synthParams".'param":"value"
            const synth = new Tone.MonoSynth({
                oscillator: {
                    type: synthParams.oscillatorType
                },
                filter: {
                    frequency: synthParams.filter_cutoff,
                    type: synthParams.filter_type
                }
            }).chain(volumeNode, Tone.Destination);
    
            const seq = new Tone.Sequence((time, note) => { // instantiates sequence of triggers for synth
                synth.triggerAttackRelease(note, 0.1, time); // note comes from notes array state. 
                // subdivisions are given as subarrays
            }, steps).start(0); // which notes? newSteps array. start takes arg of "now" time
    
            console.log(synth.get()); // logs synth params to ensure change is read
    
            // starts the transport. what actually STARTs our sequence
            Tone.Transport.start();
    
    
        } else { // if transport is playing, 
            setIsPlaying(false) // set play bool to off
            setPlayButtonText('play') // flip play button text
            Tone.Transport.stop(); // STOP the transport , music
        }




    }
    
    return (
        <button onClick={()=> startStop()}>{playButtonText}</button>
    )
}

export default PlayButton