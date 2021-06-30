import { useState, useEffect } from "react";
import * as Tone from 'tone'
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";


function PlayButton (props) { //// <--------<------<-----<------The play Button -------------------------- ////> nned to abstract, pass in steps?
    // 
    const location = useLocation()
    const dispatch = useDispatch()
    const [isPlaying, setIsPlaying] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('play')
    // let steps 
    // let seqParams
    // let synthParams
    const [beepToPlay, setBeepToPlay] = useState({
             
        osc_type: 'triangle8',
        filter_type: 'lowpass',
        filter_cutoff: 1200,
        scale: "major",
        octave: 4,
        root: 'C',
        bpm: 120,
        steps: []
    })
    // const [steps, setSteps] = useState([])
    // const [synthParams, setSynthParams] = useState({})
    // let [seqParams, setSeqParams] = useState({})
    

    useEffect(() => {
        setBeep();
      }, []);

    
function setBeep () {

    console.log(location);
    
    if (location.pathname === '/newbeep') {
        setBeepToPlay({
            ...beepToPlay, 
            osc_type: props.newBeep.osc_type,
            filter_type: props.newBeep.filter_type,
            filter_cutoff: props.newBeep.filter_cutoff,
            bpm: props.newBeep.bpm,
            stepsArray: props.newBeep.stepsArray
        })
     } 

    //  if (location.pathname === '/userbeeps') {
    //     setBeepToPlay({
    //         ...beepToPlay, 
    //         osc_type: props.userBeep.osc_type,
    //         filter_type: props.userBeep.filter_type,
    //         filter_cutoff: props.userBeep.filter_cutoff,
    //         bpm: props.userBeep.bpm,
    //         steps: props.userBeep.steps
    //     })
    // }

     
}



    function startStop () {

        console.log('clicked?');
        
        setBeep()

        if (!isPlaying) {  // starts Tone if stopped
            setIsPlaying(true)  // flips playing boolean
            setPlayButtonText('stop') // flips button text
    
            Tone.start() // start tone audio context on user interaction per spec of web audio api
    
    
            // leaving space mentally for a section for configuring (stretch) probability of the sequence
    
            Tone.Transport.bpm.value = beepToPlay.bpm; // sets BPM to input from BPM range select, sets state of BPM 
    
            const volumeNode = new Tone.Volume(-18).toDestination();
    
            // instantiates a mono synth. the parameters are set to the state object "synthParams".'param":"value"
            const synth = new Tone.MonoSynth({
                oscillator: {
                    type: beepToPlay.osc_type
                },
                filter: {
                    frequency: beepToPlay.filter_cutoff,
                    type: beepToPlay.filter_type
                }
            }).chain(volumeNode, Tone.Destination);
    
            const seq = new Tone.Sequence((time, note) => { // instantiates sequence of triggers for synth
                synth.triggerAttackRelease(note, 0.1, time); // note comes from notes array state. 
                // subdivisions are given as subarrays
            }, beepToPlay.stepsArray).start(0); // which notes? newSteps array. start takes arg of "now" time
    
            console.log(synth.get()); // logs synth params to ensure change is read
    
            // starts the transport. what actually STARTs our sequence
            Tone.Transport.start();
    
    
        } else { // if transport is playing, 
            setIsPlaying(false) // set play bool to off
            setPlayButtonText('play') // flip play button text
            Tone.Transport.stop(); // STOP the transport , music
        }



        console.log('106', beepToPlay.stepsArray); 
        
    }
    
    
    
    return (
        <button onClick={()=> startStop()}>{playButtonText}</button>
    )
}

export default PlayButton