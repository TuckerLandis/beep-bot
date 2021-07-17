import { useState, useEffect } from 'react';
import { Note, Scale } from "@tonaljs/tonal";
import scale from 'music-scale'
import { useDispatch, useSelector } from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';

import './NewBeepPage.css'

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

    const animationCount = useSelector(store => store.animationCount)

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

    // function secretButtonScale() {
    //     setBeep({
    //         ...beep, scale: "aeolian", octave: 3, root: 'C'
    //     })
    // }

    // function secretButtonSteps() {
    //     console.log('secret');
    //     let secretSteps = ['Bb3', 'Eb3', 'Bb3', 'Eb3',  'Ab3', 'Bb3', 'Ab3', 'Eb3', ]



    //     setBeep({
    //         ...beep, steps: secretSteps
    //     })

    // }



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
        let rootAndOctave = `${beep.root}${beep.octave}`

        let scaleFormatted = scale(beep.scale, rootAndOctave)

        // adds an "off" option to the front of the array and the selection, this is the default for the note selectors/sequence
        scaleFormatted.unshift('-')
        console.log('scale with octave', scaleFormatted);

        // sets selected scale to be the scale with it's octaves, this is mapped over in note selects
        return scaleFormatted
    }

    /**
     * Sets an array of notes within the scale specified by the user. handleScaleChoice is a function declared above, it runs a call to the tonal library
     *  with the beep object's root, scale, and octave properties, which change on user input. The array set here by handleScaleChoice is what populates the 
     * step select's options
     */
    let selectedScale = handleScaleChoice(beep)


    /**
     * These declarations and the following switch statement enable the time sequence in the play button 
     * to change the class of the select elements in time with the sequence
     */
    let step1 = document.getElementById('0')
    let step2 = document.getElementById('1')
    let step3 = document.getElementById('2')
    let step4 = document.getElementById('3')
    let step5 = document.getElementById('4')
    let step6 = document.getElementById('5')
    let step7 = document.getElementById('6')
    let step8 = document.getElementById('7')

    switch (animationCount) {
        case 1:
            step1.className = "active nes-pointer"
            step2.className = "inactive nes-pointer"
            step3.className = "inactive nes-pointer"
            step4.className = "inactive nes-pointer"
            step5.className = "inactive nes-pointer"
            step6.className = "inactive nes-pointer"
            step7.className = "inactive nes-pointer"
            step8.className = "inactive nes-pointer"
            break
        case 2:
            step1.className = "inactive nes-pointer"
            step2.className = "active nes-pointer"
            step3.className = "inactive nes-pointer"
            step4.className = "inactive nes-pointer"
            step5.className = "inactive nes-pointer"
            step6.className = "inactive nes-pointer"
            step7.className = "inactive nes-pointer"
            step8.className = "inactive nes-pointer"
            break
        case 3:
            step1.className = "inactive nes-pointer"
            step2.className = "inactive nes-pointer"
            step3.className = "active nes-pointer"
            step4.className = "inactive nes-pointer"
            step5.className = "inactive nes-pointer"
            step6.className = "inactive nes-pointer"
            step7.className = "inactive nes-pointer"
            step8.className = "inactive nes-pointer"
            break
        case 4:
            step1.className = "inactive nes-pointer"
            step2.className = "inactive nes-pointer"
            step3.className = "inactive nes-pointer"
            step4.className = "active nes-pointer"
            step5.className = "inactive nes-pointer"
            step6.className = "inactive nes-pointer"
            step7.className = "inactive nes-pointer"
            step8.className = "inactive nes-pointer"
            break
        case 5:
            step1.className = "inactive nes-pointer"
            step2.className = "inactive nes-pointer"
            step3.className = "inactive nes-pointer"
            step4.className = "inactive nes-pointer"
            step5.className = "active nes-pointer"
            step6.className = "inactive nes-pointer"
            step7.className = "inactive nes-pointer"
            step8.className = "inactive nes-pointer"
            break
        case 6:
            step1.className = "inactive nes-pointer"
            step2.className = "inactive nes-pointer"
            step3.className = "inactive nes-pointer"
            step4.className = "inactive nes-pointer"
            step5.className = "inactive nes-pointer"
            step6.className = "active nes-pointer"
            step7.className = "inactive nes-pointer"
            step8.className = "inactive nes-pointer"
            break
        case 7:
            step1.className = "inactive nes-pointer"
            step2.className = "inactive nes-pointer"
            step3.className = "inactive nes-pointer"
            step4.className = "inactive nes-pointer"
            step5.className = "inactive nes-pointer"
            step6.className = "inactive nes-pointer"
            step7.className = "active nes-pointer"
            step8.className = "inactive nes-pointer"
            break
        case 8:
            step1.className = "inactive nes-pointer"
            step2.className = "inactive nes-pointer"
            step3.className = "inactive nes-pointer"
            step4.className = "inactive nes-pointer"
            step5.className = "inactive nes-pointer"
            step6.className = "inactive nes-pointer"
            step7.className = "inactive nes-pointer"
            step8.className = "active nes-pointer"
            break
    }
    
    // ------------------------------- DOM Return -------------------------------------- //


    /// all the components herein come from src/formcomponenets

    return (
        <section>
            <div className="button-container">
                <PlayButton beep={beep} />

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


                <div className="note-display-container">
                    <p className="notes-title-display"> Notes in your scale: {selectedScale.map((note, i) => {
                        if (note === "-") {

                        } else {
                            return (
                                <p className="note-display" key={i}>{note}</p>
                            )
                        }

                    })} </p>
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



            </div>

        </section>
    )

}

export default NewBeepPage
