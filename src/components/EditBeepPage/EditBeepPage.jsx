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

// form components
import BeepTitle from '../FormComponents/BeepTitle';
import OscillatorType from '../FormComponents/OscillatorType';
import FilterType from '../FormComponents/FilterType';
import FilterCutoff from '../FormComponents/FilterCutoff'
import ScaleName from '../FormComponents/ScaleName'
import Octave from '../FormComponents/Octave'
import RootNote from '../FormComponents/RootNote';
import BPM from '../FormComponents/BPM'
import StepSelect from '../FormComponents/StepSelect';
import StepRadio from '../FormComponents/StepRadio';
import OverwriteButton from "../FormComponents/OverwriteButton";


function EditBeepPage() {
    const dispatch = useDispatch()
    let { id } = useParams()

    // on page load, send a dispatch to perform a get request to load the presently selected beep into the editbeep reducer
    useEffect(() => {
        console.log(id);
        dispatch({
            type: 'SELECT_BEEP',
            payload: id
        });
    }, []);

    //beep to edit, gets passed down as props
    const beep = useSelector(store => store.editBeepReducer)

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



    //logging beep to ensure values
    console.log(beep);

    // calling handlescale choice just before return in order to populate note drop downs
    let selectedScale = handleScaleChoice(beep)

    // ------------------------------- DOM Return -------------------------------------- //

    return (
        <section>
            <BeepTitle beep={beep} />

            <div className="entire-ui">
                <div className="synth-params-container">
                    <div className="scale-container nes-container with-title is-centered">
                        <p className="title is-dark">Tweak the synthesizer!</p>

                        {/* OSCILLATOR TYPE */}
                        <OscillatorType handleBeep={handleBeep} />
                        <div className="filter-spacer"></div>

                        {/* FILTER TYPE*/}
                        <div className="filter-container">
                            <FilterType handleBeep={handleBeep} />
                            <div className="filter-spacer"></div>
                            {/* FILTER CUTOFF */}
                            <FilterCutoff handleBeep={handleBeep} beep={beep} />
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>

                <div className="seq-params-container">
                    <div className="scale-container nes-container with-title is-centered">

                        <p className="title is-dark">Select a Scale!</p>
                        {/* SCALE NAME */}
                        <ScaleName handleBeep={handleBeep} beep={beep} />

                        {/* OCTAVE */}
                        <Octave handleBeep={handleBeep} beep={beep} />

                        {/* ROOT NOTE*/}
                        <RootNote handleBeep={handleBeep} beep={beep} />

                    </div>


                    {/* TEMPO (BPM)*/}

                </div>


                <div className="seq-params-container">
                    <h3>Notes in your scale: {selectedScale.map((note, i) => {
                        if (note === "off") {

                        } else {
                            return (
                                <p className="note-display">{note}</p>
                            )
                        }

                    })} </h3>
                </div>


                <div className="seq-params-container">
                    <div className="tempo-container nes-container with-title is-centered">
                        <p className="title is-dark">Set a Tempo!</p>
                        <BPM handleBeep={handleBeep} beep={beep} />
                    </div>
                </div>



                <br></br>
                <br></br>
                <div className="seq-params-container">
                    <StepSelect selectedScale={selectedScale} handleStep={handleStep} beep={beep} />
                    {/* <StepRadio selectedScale={selectedScale} handleStep={handleStep} beep={beep} /> */}


                </div>


                <br></br>
                <br></br>

                <div className="button-container">
                    <PlayButton beep={beep} />
                    <OverwriteButton beep={beep} />
                </div>

            </div>

        </section>

    )

}

export default EditBeepPage
