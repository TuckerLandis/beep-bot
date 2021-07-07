import { useState, useEffect } from 'react';
import { Note, Scale } from "@tonaljs/tonal";
import { useDispatch, useSelector } from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';
import Swal from 'sweetalert2'
import './NewBeepPage.css'
import { useHistory } from 'react-router';
import userReducer from '../../redux/reducers/user.reducer';

// swal class object
import SwalClassObject from '../../assets/SwalClassObject/SwalClassObject';

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
        name: null,
        likes: 0,
        users_that_like: [-1],
        users_that_favorite: ['Beep Bot']

    })

    const userObj = useSelector((store) => store.user)

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
            customClass: SwalClassObject,
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
                    ...beep, name: result.value, user_name: userObj.username
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


    /// all the components herein come from src/formcomponenets

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
                <h3>Notes in your scale: {selectedScale.map((note, i)=>{
                    if(note === "off") {

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
                    <button className="nes-btn is-primary" onClick={handleSave}>save</button>
                </div>

            </div>

        </section>
    )

}

export default NewBeepPage
