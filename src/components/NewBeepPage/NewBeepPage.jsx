import { useState, useEffect } from 'react';
import { Note, Scale } from "@tonaljs/tonal";
import { useDispatch, useSelector } from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';
import Swal from 'sweetalert2'
import './NewBeepPage.css'
import { useHistory } from 'react-router';

function NewBeepPage() {
    const dispatch = useDispatch()
    const history = useHistory()


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
        name: null

    })

    // default: sets an array of all notes to be the options in the root note select map
    let rootNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    // default: notes array for selector
    const c_major = ["off", "C4", "D4", "E4", "F4", "G4", "A4", "B4"]

    // changes when a scale is selected, controlled by handle scale choice function
    // const [selectedScale, setSelectedScale] = useState(c_major)

    // select populator for scale choice drop dowm
    let scaleList = ["major", "minor", "pentatonic", "ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"]

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
        let scaleO = (Scale.get(`${beep.root} ${beep.scale}`).notes)

        // loops over scale array, and adds the relevant octave number character to the string, to each index of the notes array
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
     * Upon pressing save, a sweet alert pops up that asks the user for a name to save their beep under. 
     * Upon confirming, beep.name is updated with the value. once that is done, the beep is stored in the database
     * button -> dispatch -> beep saga -> beep router
     */
    const handleSave = async () => {
        console.log('saving a beep :)', beep);


        // this prompt is fired upon pressing the save button on the new beep page, it takes in a required name input
        Swal.fire({
            title: 'What should we call this beep?',
            input: 'text',
            inputValue: '',
            inputPlaceholder: 'Enter a name for your beep',
            showCancelButton: true,
            customClass: {
                container: 'swal-class-container',
                popup: 'swal-class-bg',
                header: 'swal-class-text',
                title: 'swal-class-text',
                closeButton: '...',
                icon: '...',
                image: '...',
                content: '...',
                htmlContainer: '...',
                input: 'swal-class-text',
                inputPlaceholder: 'swal-class-text',
                inputLabel: '...',
                validationMessage: '...',
                actions: '...',
                confirmButton: 'swal-class-bg',
                denyButton: '...',
                cancelButton: 'swal-class-button-cancel',
                loader: '...',
                footer: '....'
            },
            // validates that the user has entered a value. if !value, stop here
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
            // once the input has been validated, send a dispatch like below
        }).then(result => {
            console.log(result);
            if (result.isConfirmed) {

                // sends a beep to the beep saga for posting to the DB, adds the name from the sweet alert to this object as it's dispatched
                dispatchBeep({
                    ...beep, name: result.value,
                })
            }
        }
        )
    }

    // this function is sent to the beep saga in the dispatch below to send a user to the edit page via the new post's response.id
    function pushToEdit(beep_id) {

        // simple history push with the returned beep ID from our post. presently undefined. passed to the saga
        history.push(`/edit/${beep_id}`)
    }

    /**
     * sends a dispatch containing: beep object, pushToEdit function as described above
     */
    function dispatchBeep(beep) {
        dispatch({
            type: 'SAVE_NEW_BEEP',
            payload: {
                beep: beep,
                pushToEdit: pushToEdit
            }
        })
    }

    /**
     * Sets an array of notes within the scale specified by the user. handleScaleChoice is a function declared above, it runs a call to the tonal library
     *  with the beep object's root, scale, and octave properties, which change on user input. The array set here by handleScaleChoice is what populates the 
     * step select's options
     */
    let selectedScale = handleScaleChoice(beep)



    // ------------------------------- DOM Return -------------------------------------- //

    return (
        <section>
            <h1>{beep.beep_name ? beep.beep_name : "Untitled"}</h1>
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


                {/* to be replaced */}
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
                    <button onClick={handleSave}>save</button>
                </div>

            </div>

        </section>
    )

}

export default NewBeepPage
