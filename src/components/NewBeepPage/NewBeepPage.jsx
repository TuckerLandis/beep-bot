import { useState, useEffect } from 'react';
import { Note, Scale } from "@tonaljs/tonal";
import { useDispatch, useSelector } from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';

import './NewBeepPage.css'
import { useHistory } from 'react-router';
import userReducer from '../../redux/reducers/user.reducer';


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
import SaveButton from '../FormComponents/SaveButton';
import StepRadio from '../FormComponents/StepRadio';

function NewBeepPage() {


    // default beep. manipulated by the user on change of all inputs on the page
    const [beep, setBeep] = useState({
        osc_type: 'triangle8',
        filter_type: 'lowpass',
        filter_cutoff: 1200,
        scale: "major",
        octave: 4,
        root: 'C',
        bpm: 120,
        steps: [null, null, null, null, null, null, null, null],
        stepcount: 8,
        name: null,
        likes: 0,
        users_that_like: [-1],
        users_that_favorite: ['Beep Bot']

    })



    /**
     * Takes in an event from the selects, changes a specifc index in the steps array to reflect the note value (evt.targ.val)
     * @param {*} event 
     */
    function handleStep(event) {
        console.log('changing: ', event.target.id);
        // declares a new array of steps based on the values already in beep.steps
        let newSteps = beep.steps
        // splices a step value at the index of the target, with the value of the event from the specific step select
        newSteps.splice(event.target.id, 1, event.target.value)
        // spreads the beep state object and inserts the new steps array
        setBeep({
            ...beep, steps: newSteps
        })
    }


    /**
     * Takes in all events for beep paramaters except steps
     * @param {*} event 
     */
    function handleBeep(event) {
        setBeep({
            ...beep, [event.target.id]: event.target.value
        })
        handleScaleChoice(beep)
    }


    /**
     * overarching "set the scale" function, takes the scale input choices for rootnote, octave and scalename "major, minor, etc"
     * and uses tonal to scale.get the notes in the scale. these are mapped over below in our selects
     * @param {*} beep 
     */
    function handleScaleChoice(beep) {

        // sets temp variable to scale.get using the beep properties: root, scale, octave
        let scaleFormatted = (Scale.get(`${beep.root} ${beep.scale}`).notes)

        // loops over scale array, and adds the relevant octave number character to the string, to each index of the notes array
        for (let i = 0; i < scaleFormatted.length; i++) {
            scaleFormatted[i] += beep.octave
        }

        // adds an "off" option to the front of the array and the selection, this is the default for the note selectors/sequence
        scaleFormatted.unshift('off')
        console.log('scale with octave', scaleFormatted);

        // sets local state of selected scale to be the scale with it's octaves, this is mapped over in note selects
        return scaleFormatted
    }



    /**
     * Sets an array of notes within the scale specified by the user. handleScaleChoice is a function declared above, it runs a call to the tonal library
     *  with the beep object's root, scale, and octave properties, which change on user input. The array set here by handleScaleChoice is what populates the 
     * step select's options
     */
    let selectedScale = handleScaleChoice(beep)

    let animationCount = 0


    // ------------------------------- DOM Return -------------------------------------- //


    /// all the components herein come from src/formcomponenets

    return (
        <section>
            <div className="button-container">
                <PlayButton beep={beep} animationCount={animationCount}/>

                <BeepTitle beep={beep} />


                <SaveButton beep={beep} />
            </div>


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
                </div>


                <div className="seq-params-container">
                    <h1>Notes in your scale: {selectedScale.map((note, i) => {
                        if (note === "off") {

                        } else {
                            return (
                                <p className="note-display" key={i}>{note}</p>
                            )
                        }

                    })} </h1>
                </div>


                <div className="seq-params-container">
                    <div className="sequence-container nes-container with-title is-centered">
                        <p className="title is-dark seq-title">Change the sequence!</p>
                        <div className="title-spacer"></div>

                        {/* step selects for sequencer */}
                        <StepSelect selectedScale={selectedScale} handleStep={handleStep} beep={beep} />

                        {/* TEMPO (BPM)*/}
                        <BPM handleBeep={handleBeep} beep={beep} />
                    </div>
                </div>



                <br></br>
                <br></br>
                <div className="seq-params-container">

                    {/* <StepRadio selectedScale={selectedScale} handleStep={handleStep} beep={beep} /> */}


                </div>


                <br></br>
                <br></br>



            </div>

        </section>
    )

}

export default NewBeepPage
