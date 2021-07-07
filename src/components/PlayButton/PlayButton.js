import { useState, useEffect } from "react";
import * as Tone from 'tone'

import './PlayButton.css'


function PlayButton(props) { 

    // boolean for playing state. flipped on button click
    const [isPlaying, setIsPlaying] = useState(false)
    // text for play button, set on button click
    const [playButtonText, setPlayButtonText] = useState('play')
    // class for play button color change,  flipped on button click
    const [buttonClass, setButtonClass] = useState('btn nes-btn is-success')


    /**
     * This function is what plays the music. It initializes an audio context, and new version of tone.synth + tone.sequence
     * for each press of "play" 
     */
    function startStop() {
        
        // sets BPM to input from BPM range select, sets state of BPM 
        Tone.Transport.bpm.value = props.beep.bpm; 

        // creates a volume node. this is simply to reduce the signal, as a raw synth wave is simply too loud for speakers, humans.
        // eventually this can become a volume slider, but -18 will still be the max most likely
        const volumeNode = new Tone.Volume(-18).toDestination();

        // instantiates a mono synth. the parameters are set to the state object "synthParams".'param":"value"
        const synth = new Tone.MonoSynth({
            oscillator: {
                // triangle, sine, square, saw
                type: props.beep.osc_type
            },
            filter: {
                // range from 0-20k, needs tweaking as it doesn't usually have much effect 
                frequency: props.beep.filter_cutoff,
                // hi-pass, lo-pass, band-pass
                type: props.beep.filter_type
            }
            // connects the synth to our volume node, then the "master" audio out.
            // this is where i will add connection to stretch tuna.js goals
        }).chain(volumeNode, Tone.Destination);



        // instantiates a new sequence, this is started immediately after tone.transport
        const seq = new Tone.Sequence((time, note) => { // instantiates sequence of triggers for synth
            synth.triggerAttackRelease(note, 0.1, time); // (trigger 1 note, every quarter note, time from transport)
        }, props.beep.steps) // note comes from props.beep.steps 

        // seq.probability = 0.3 // works!! needs to take in an input 

        
        if (!isPlaying) {  // starts Tone if stopped                                              - if 
            setIsPlaying(true)  // flips playing boolean
            setPlayButtonText('stop') // flips button text
            setButtonClass('btn nes-btn is-error') // flips class for play button

            Tone.start() // start tone audio context on user interaction per spec of web audio api

            // !START! 
            Tone.Transport.start(); 
            seq.start()

            // leaving these logs commented, really useful but giant objects
            // console.log('tone sequence', seq);
            // console.log('tone transport', Tone.Transport);

        } else { // if transport is playing,                                                      - else
            
            setIsPlaying(false) // set play bool to off
            setPlayButtonText('play') // flip play button text
            setButtonClass('btn nes-btn is-success') // flip play button class
            Tone.Transport.stop(); // STOP the transport , music
            Tone.Transport.cancel(0) //cancels and scrubs tone.transport for re-initializtion

        }

        // console.log(props.beep.steps); // logs step array when button is clicked

    }




    return (
        <button className={buttonClass} onClick={() => startStop()}>{playButtonText}</button>
    )
}

export default PlayButton