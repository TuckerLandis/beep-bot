// this is a stone cold clone of newBeep, adding: useffect to load selected beep from ID
//changing: dispatches on buttons 

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

import { useState, useEffect } from 'react';
import { Note, Scale } from "@tonaljs/tonal";
import { useDispatch, useSelector } from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';
import axios from "axios";
import Swal from 'sweetalert2'


function EditBeepPage() {
    const dispatch = useDispatch()
    let { id } = useParams()



    useEffect(() => {
        console.log(id);
        dispatch({
            type: 'SELECT_BEEP',
            payload: id
        });
    }, []);

    //beep to edit
    const beep = useSelector(store => store.editBeepReducer)

    // // default: sets an array of all notes to be the options in the root note select map
    let rootNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    // select populator for scale choice drop dowm
    let scaleList = ["major", "minor", "pentatonic", "ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"]

    /**
     * Takes in an event from the selects, changes a specifc index in the steps array to reflect the note value (evt.targ.val)
     * @param {*} event 
     */
    function handleStep(event) {
        console.log('changing: ', event.target.id);
        let newSteps = beep.steps
        newSteps.splice(event.target.id, 1, event.target.value)
        dispatch({
            type: "EDIT_SELECTED_STEPS",
            payload: newSteps
        })
    }

    /**
     * Takes in all events for beep paramaters except steps, changes beep object properties accordingly
     * @param {*} event 
     */
    function handleBeep(event) {

        dispatch({
            type: "EDIT_SELECTED",
            payload: {
                key: [event.target.id],
                value: event.target.value
            }
        })
    }

    /**
     * Overarching "set the scale" function, takes the scale input choices for rootnote, octave and scalename "major, minor, etc"
     * and uses tonal to scale.get the notes in the scale. these are mapped over below in our selects
     * @param {*} beep 
     */
    function handleScaleChoice(beep) {

        // sets temp variable to scale.get using root note and scalename
        let scaleO = (Scale.get(`${beep.root} ${beep.scale}`).notes)

        // loops over scale array, and adds the respective octave to the array for rendering by Tone
        for (let i = 0; i < scaleO.length; i++) {
            scaleO[i] += beep.octave
        }

        // adds an "off" option to the front of the array and the selection, this is the default for the note selectors/sequence
        scaleO.unshift('off')
        console.log('scale with octave', scaleO);

        // sets local state of selected scale to be the scale with it's octaves, this is mapped over in note selects
        return scaleO


    }

    /**
     * Upon pressing save, a sweet alert pops up that asks the user for a name to save their beep as. 
     * Upon confirming, beep.name is updated with the value. once that is done, the beep is stored in the database
     * button -> dispatch -> beep saga -> beep router
     */
    const handleSave = () => {
        console.log('saving a beep :)', beep);

        
        Swal.fire({
          title: 'Do you want to overwrite this beep?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {

            
          if (result.isConfirmed) {
            Swal.fire(
              'Overwritten',
              '',
              'success'
            )
            dispatch({
                type: 'UPDATE_BEEP',
                payload: beep
            })
          }
        })


        
    }

    console.log(beep);
    let selectedScale = handleScaleChoice(beep)

    // ------------------------------- DOM Return -------------------------------------- //

    return (
        <section>
            <h1>editing... {beep.beep_name}</h1>
            <div>

                <div className="synth-params-container">

                    {/* OSCILLATOR TYPE */}
                    <div className="osc-type-container">
                        <label htmlFor="osc-type">Osc Type: </label>
                        <select name="osc-type" id="osc_type" onChange={handleBeep} >
                            <option value="triangle8">Triangle</option>
                            <option value="square8">Square</option>
                            <option value="sine8">Sine</option>
                            <option value="sawtooth">Saw</option>
                        </select>

                    </div>
                    <p></p>

                    {/* FILTER TYPE*/}
                    <div className="filter-container">
                        <label htmlFor="filter-type">Filter Type: </label>
                        <select name="filter-type" id="filter_type" onChange={handleBeep} >
                            <option value="lowpass">Low Pass</option>
                            <option value="highpass">High Pass</option>
                            <option value="bandpass">Band Pass</option>
                        </select>

                        {/* FILTER CUTOFF */}
                        <label htmlFor="filter_cutoff">Filter Cutoff: {beep.filter_cutoff} </label>
                        <input type="range" id="filter_cutoff" name="filter_cutoff" className="slider"
                            min="0" max="20000" value={beep.filter_cutoff} onChange={handleBeep} />
                    </div>
                </div>
                <br></br>
                <br></br>

                {/* SCALE NAME */}
                <div className="seq-params-container">
                    <div>
                        <label htmlFor="scale-select">Scale: </label>
                        <select name="scale-select" id="scale" onChange={handleBeep} >
                            {scaleList.map((scale, i) => {
                                return (
                                    <option key={i} value={scale}>{scale}</option>
                                )
                            })}
                        </select>
                    </div>


                    {/* OCTAVE */}
                    <div>
                        <label htmlFor="octave-select">Octave: </label>
                        <select name="octave-select" id="octave" onChange={handleBeep} value={beep.octave} >
                            <option value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                            <option value="4"> 4 </option>
                            <option value="5"> 5 </option>
                            <option value="6"> 6 </option>
                            <option value="7"> 7 </option>
                            <option value="8"> 8 </option>
                        </select>
                    </div>


                    {/* ROOT NOTE*/}
                    <div>
                        <label htmlFor="root-select">Root Note: </label>
                        <select name="root-select" id="root" onChange={handleBeep} value={beep.root}>

                            {
                                rootNotes.map((rootNote, i) => {
                                    return (
                                        <option key={i} value={rootNote}>{rootNote}</option>
                                    )
                                })
                            }
                        </select>
                    </div>


                    {/* TEMPO (BPM)*/}
                    <div>

                    </div>
                    <div style={{ width: "30%" }}>
                        <label htmlFor="BPM"><span className="range-text">BPM: {beep.bpm}</span></label>
                        <input type="range" id="bpm" name="BPM" className="slider"
                            min="40" max="200" value={beep.bpm} onChange={handleBeep} />
                    </div>


                </div>
                <br></br>
                <br></br>

                {/* step select, see script notes within*/}
                <div className="step-select-container">

                    {/* maps over beep.steps and returns that many step-selectors */}
                    {beep.steps?.map((step, i) => {
                        return (
                            <select id={i} onChange={handleStep} key={i} value={step}>

                                {/* <option key={i} value={note}>{note}</option> */}
                                {/* uses selectedScale state to return a list of notes based on handScaleChoice */}
                                {selectedScale?.map((note, i) => {
                                    return (
                                        <option key={i} value={note}>{note}</option>
                                    )
                                })}
                            </select>
                        )
                    }) // end map script
                    }
                </div>
                <br></br>
                <br></br>

                <div className="button-container">
                    <PlayButton beep={beep} />
                    <button className="nes-btn is-primary"onClick={handleSave}>save</button>
                </div>

            </div>

        </section>

    )

}

export default EditBeepPage
