import { useState } from 'react';
import { Note, Scale } from "@tonaljs/tonal";
import { useDispatch } from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';
import Swal from 'sweetalert2'

function NewBeepPage() {
    const dispatch = useDispatch()
// default beep
    const [beep, setBeep] = useState({
        osc_type: 'triangle8',
        filter_type: 'lowpass',
        filter_cutoff: 1200,
        scale: "major",
        octave: 4,
        root: 'C',
        bpm: 120,
        steps: [null, null, null, null, null, null, null, null],
        stepcount: 8
    })

    // sets an array of all notes to be the options in the root note select map
    let rootNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    // default notes array
    const c_major = ["off", "C4", "D4", "E4", "F4", "G4", "A4", "B4"]
    // array of notes in selected scale, defaults to C_Major
    const [selectedScale, setSelectedScale] = useState(c_major) // set this to scaleChoice function ? --useeffect scaleschoice function

    // select populator for scale choice
    let scaleList = ["major", "minor", "pentatonic", "chromatic", "mixolydian", "aeolian"]



    // ------------------------------------------ Handle Change Zone -------------------------------------------- //

    /**
     * Takes in an event from the selects, changes a specifc index in the steps array to reflect the note value (evt.targ.val)
     * @param {*} event 
     */
    function handleStep(event) {
        console.log('changing: ', event.target.id);
        let newSteps = beep.steps
        newSteps.splice(event.target.id, 1, event.target.value)
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
        setSelectedScale(scaleO)
    }

    /**
     * Upon pressing save, a sweet alert pops up that asks the user for a name to save their beep as. 
     * Upon confirming, beep.name is updated with the value. once that is done, the beep is stored in the database
     * button -> dispatch -> beep saga -> beep router
     */
    const handleSave = () => {
        console.log('saving a beep :)', beep);

        (async () => {
            const { value: name } = await Swal.fire({
                title: 'What should we call this beep?',
                input: 'text',
                inputPlaceholder: 'Enter a name for your beep',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            })
            if (name) {
                setBeep({
                    ...beep, name: name
                })
                dispatch({
                    type: 'SAVE_NEW_BEEP',
                    payload: beep
                })
            }
        })()
    }

    // ------------------------------- DOM Return -------------------------------------- //
    return (
        <div>
            <div className="synth-params-container">
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
                <div className="filter-container">
                    <label htmlFor="filter-type">Filter Type: </label>
                    <select name="filter-type" id="filter_type" onChange={handleBeep} >
                        <option value="lowpass">Low Pass</option>
                        <option value="highpass">High Pass</option>
                        <option value="bandpass">Band Pass</option>
                    </select>

                    <label htmlFor="filter_cutoff">Filter Cutoff: {beep.filter_cutoff} </label>
                    <input type="range" id="filter_cutoff" name="filter_cutoff"
                        min="0" max="20000" value={beep.filter_cutoff} onChange={handleBeep} />
                </div>
            </div>
            <p></p>

            <div className="seq-params-container">
                <label htmlFor="scale-select">Scale: </label>
                <select name="scale-select" id="scale" onChange={handleBeep} >
                    {scaleList.map((scale, i) => {
                        return (
                            <option key={i} value={scale}>{scale}</option>
                        )
                    })}
                </select>

                {/* select for octave choice, triggers handle octave on change */}
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

                {/* select for root note change, triggers handle root on change */}
                <label htmlFor="root-select">Root Note: </label>
                <select name="root-select" id="root" onChange={handleBeep} value={beep.rootNote}>

                    {
                        rootNotes.map((rootNote, i) => {
                            return (
                                <option key={i} value={rootNote}>{rootNote}</option>
                            )
                        })
                    }

                </select>

                {/* range input for BPM, min = 40, max = 200 (arbitrary) */}
                <label htmlFor="BPM">BPM{beep.bpm}</label>
                <input type="range" id="BPM" name="BPM"
                    min="40" max="200" value={beep.bpm} onChange={handleBeep} />


            </div>
            <p></p>

            <div className="step-select-container">

                {/* these will eventually be mapped over based on sequence length(stretch) */}

                {beep.steps.map((step, i) => {
                    return (
                        <select id={i} onChange={handleStep} key={i}>

                            {/* uses selectedScale state to return a list of notes in selected selectedScale */}
                            {selectedScale.map((note, i) => {
                                return (
                                    <option key={i} value={note}>{note}</option>
                                )
                            })}
                        </select>
                    )
                }) // end map script
                } 
            </div>
            <p></p>

            <PlayButton beep={beep} />
            <button onClick={handleSave}>save</button>

        </div>
    )

}

export default NewBeepPage
