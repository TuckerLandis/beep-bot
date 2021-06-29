const { useDispatch, useSelector } = require("react-redux");
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone'

/* 
! ToDo
display, play button dummy. look into abstracting synth before proceding with play
!display = date created, name
!load button => selected beep reducer

*/ 

function UserBeeps () {
const dispatch = useDispatch() // declare dispatch for use below
const userBeeps = useSelector(store => store.userBeeps)

  const [isPlaying, setIsPlaying] = useState(false)
  const [playButtonText, setPlayButtonText] = useState('play')

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_BEEPS' });
      }, []);

    console.log('user beeps :)', userBeeps);

    function playButton (beep) { //// <--------<------<-----<------The play Button --------------(to be abstracted)------------ ////>


        console.log('ln 31', beep.steps)
        // beep.steps.filter()
    
        const synthParams = {
          oscillatorType: beep.osc_type,
          filter_type: beep.filter_type,
          filter_cutoff: beep.filter_cutoff
        }
    
        const seqParams = {
          scale: beep.scale,
          octave: beep.ocatave,
          root: beep.root,
          bpm: beep.bpm,
          steps: beep.steps
        }
    
        const userSteps = seqParams.steps
    
        console.log(userSteps);
    
    
        // console.log(steps, seqParams, synthParams); // gives notes and seq params
    
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
            }, steps).start(0); // which notes? steps array. start takes arg of "now" time
    
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
          <div className="container">
      <h2>Your Beeps</h2>


      {userBeeps.map((beep, i) => {
        return (
          <div key={i}>
          <p>Beepname</p> 
          <button onClick={() => playButton(beep)}>{playButtonText}</button>
          </div>
        
        
        )
      })}
      
    </div>
    )
}

export default UserBeeps