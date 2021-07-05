import { useState, useEffect } from "react";
import * as Tone from 'tone'

import './PlayButton.css'


function PlayButton (props) { //// <--------<------<-----<------The play Button -------------------------- ////> nned to abstract, pass in steps?
    // 

    const [isPlaying, setIsPlaying] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('play')
    const [buttonClass, setButtonClass] = useState('btn nes-btn is-success')



    function startStop () {

        console.log('clicked');
        console.log(props.beep);
        
        
       
        if (!isPlaying) {  // starts Tone if stopped
            setIsPlaying(true)  // flips playing boolean
            setPlayButtonText('stop') // flips button text
            setButtonClass('btn nes-btn is-error')
    
            Tone.start() // start tone audio context on user interaction per spec of web audio api

            let seq = 'nothing'
    
    
            // leaving space mentally for a section for configuring (stretch) probability of the sequence
    
            Tone.Transport.bpm.value = props.beep.bpm; // sets BPM to input from BPM range select, sets state of BPM 
    
            const volumeNode = new Tone.Volume(-18).toDestination();
    
            // instantiates a mono synth. the parameters are set to the state object "synthParams".'param":"value"


            // this needs to come out!!
            const synth = new Tone.MonoSynth({
                oscillator: {
                    type: props.beep.osc_type
                },
                filter: {
                    frequency: props.beep.filter_cutoff,
                    type: props.beep.filter_type
                }
            }).chain(volumeNode, Tone.Destination);
    

            // this needs to come out!
            seq = new Tone.Sequence((time, note) => { // instantiates sequence of triggers for synth
                synth.triggerAttackRelease(note, 0.1, time); // note comes from notes array state. 
                // subdivisions are given as subarrays
            }, props.beep.steps)
            //.start(0); // which notes? newSteps array. start takes arg of "now" time

    
            console.log(synth.get()); // logs synth params to ensure change is read
    
            // starts the transport. what actually STARTs our sequence
            Tone.Transport.start();
            seq.start()
            console.log('tone sequence', seq);
            console.log('tone transport', Tone.Transport);
            
            
    
    
        } else { // if transport is playing, 
            setIsPlaying(false) // set play bool to off
            setPlayButtonText('play') // flip play button text
            setButtonClass('btn nes-btn is-success')
            Tone.Transport.stop(); // STOP the transport , music
            Tone.Transport.clear('seq') // seemingly inneffective, trying to clear transport of all events
            // Tone.Transport.dispose('seq')
            
            // Tone.stop() // attempt to stop audio context for play button instance doesn't fix double play bug
        }



        console.log('106', props.beep.steps); 
        
    }
    
    
    
    return (
     <button className={buttonClass} onClick={()=> startStop()}>{playButtonText}</button>
    )
}

export default PlayButton