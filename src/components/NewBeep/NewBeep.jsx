import { useState } from 'react';
import * as Tone from 'tone'
import { Note, Scale } from "@tonaljs/tonal";
import { useDispatch } from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';


// ! todo
/* 
!!!!!! add modal for saving, name. upon name, render name. nice. also need DB column for name at next table drop
refactor handleStep
refactor render functions
refactor entire file while you're at it


*/

function NewBeepPage() {
    const dispatch = useDispatch()

    // for catching input changes
    const [steps, setSteps] = useState({
        step1: null,
        step2: null,
        step3: null,
        step4: null,
        step5: null,
        step6: null,
        step7: null,
        step8: null,
    })
    // default newBeep
    const [newBeep, setNewBeep] = useState({
        osc_type: 'triangle8',
        filter_type: 'lowpass',
        filter_cutoff: 1200,
        scale: "major",
        octave: 4,
        root: 'C',
        bpm: 120,
        stepsArray: []
    })

    // sets an array of all notes to be the options in the root note select map
    let rootNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    // default notes array
    const c_major = ["off", "C4", "D4", "E4", "F4", "G4", "A4", "B4"]
    // array of notes in selected scale, defaults to C_Major
    const [selectedScale, setSelectedScale] = useState(c_major) // set this to scaleChoice function ? --useeffect scaleschoice function

    // select populator for scale choice
    let scaleList = ["major", "minor", "pentatonic", "mixolydian"]

    // our "sequence", to be manipulated on change of the values below / above.
    // let steps = [seqParams.step1, seqParams.step2, seqParams.step3, seqParams.step4, seqParams.step5, seqParams.step6, seqParams.step7, seqParams.step8,]

    // -------------------------------------------------------------------------Handle Change Zone ----------------------------------------------------////


    function handleStep(event) {
        console.log('changing: ', event.target.id);
        setSteps({
            ...steps, [event.target.id]: event.target.value
        })
            setNewBeep({
                ...newBeep, stepsArray: [steps.step1, steps.step2, steps.step3, steps.step4,
                     steps.step5, steps.step6, steps.step7, steps.step8]
            })
        
        

    }

    // ! todo: rewrite handle SeqParams as one
    // BPM handler, gets saved
    const handleBPM = (event) => {
        setNewBeep({
            ...newBeep, bpm: event.target.value
        })
    }

    // handles scale option select, calls handleScaleChoice
    const handleScaleName = (event) => {
        setNewBeep({
            ...newBeep, scaleName: event.target.value
        })
        handleScaleChoice()
    }

    // handles octave change, calls handle scale choice
    const handleOctave = (event) => {
        setNewBeep({
            ...newBeep, octave: event.target.value
        })
        handleScaleChoice()
    }

    // handles change of rootnote, calls handle scale choice
    const handleRoot = (event) => {
        setNewBeep({
            ...newBeep, rootNote: event.target.value
        })
        handleScaleChoice()
    }

    // overarching "set the scale" function, takes the scale input choices for rootnote, octave and scalename "major, minor, etc"
    // and uses tonal to scale.get the notes in the scale. these are mapped over below in our selects
    function handleScaleChoice() {
        let scaleO = (Scale.get(`${newBeep.rootNote} ${newBeep.scaleName}`).notes) // sets temp var to scale.get using root note and scalename

        // loops over scale array, and adds the respective octave to the array for rendering by Tone
        for (let i = 0; i < scaleO.length; i++) {
            scaleO[i] += newBeep.octave
        }
        // adds an "off" option to the front of the array and the selection, this is the default for the note selectors
        scaleO.unshift('off')
        console.log('scale with octave', scaleO);

        // sets local state of selected scale to be the scale with it's octaves, this is mapped over in note selects
        setSelectedScale(scaleO)
    }


    const handleSynthParams = (event) => {
        switch (event.target.id) {
            case "osc-type":
                console.log('changing osc-type');
                setNewBeep({
                    ...newBeep, osc_type: event.target.value
                })
                break;
            case "filter_type":
                console.log('changing filter-type');
                setNewBeep({
                    ...newBeep, filter_type: event.target.value
                })
                break;
            case "filter_cutoff":
                console.log('changing filter-cutoff');
                setNewBeep({
                    ...newBeep, filter_cutoff: Number(event.target.value)
                })
                break;
        }
    }



    // Post Dispatch
    const handleSave = () => {
        console.log('saving a beep :)', newBeep);
        dispatchBeep(newBeep)

    }

    function dispatchBeep(newBeep) {
        dispatch({
            type: 'SAVE_NEW_BEEP',
            payload: newBeep
        })
    }


    // main return to DOM of our sequencer component
    return (
        <div>
            <div className="synth-params">
                <div className="osc-type-container">

                    <label htmlFor="osc-type">Osc Type: </label>
                    <select name="osc-type" id="osc-type" onChange={handleSynthParams} >
                        <option value="triangle8">Triangle</option>
                        <option value="square8">Square</option>
                        <option value="sine8">Sine</option>
                        <option value="saw8">Saw</option>
                    </select>

                </div>
                <p></p>
                <div className="filter-container">

                    <label htmlFor="filter-type">Filter Type: </label>
                    <select name="filter-type" id="filter-type" onChange={handleSynthParams} >

                        <option value="lowpass">Low Pass</option>
                        <option value="highpass">High Pass</option>
                        <option value="bandpass">Band Pass</option>

                    </select>

                    <label htmlFor="filter-cutoff">Filter Cutoff: {newBeep.filter_cutoff} </label>
                    <input type="range" id="filter_cutoff" name="filter_cutoff"
                        min="0" max="20000" value={newBeep.filter_cutoff} onChange={handleSynthParams} />

                </div>

            </div>

            <p></p>

            <div className="seq-params-container">
                <label htmlFor="scale-select">Scale: </label>
                <select name="scale-select" id="scale-select" onChange={handleScaleName} >
                    {scaleList.map((scale, i) => {
                        return (
                            <option key={i} value={scale}>{scale}</option>
                        )
                    })}
                </select>

                {/* select for octave choice, triggers handle octave on change */}
                <label htmlFor="octave-select">Octave: </label>
                <select name="octave-select" id="octave-select" onChange={handleOctave} value={newBeep.octave} >
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
                <select name="root-select" id="root-select" onChange={handleRoot} value={newBeep.rootNote}>

                    {
                        rootNotes.map((rootNote, i) => {
                            return (
                                <option key={i} value={rootNote}>{rootNote}</option>
                            )
                        })
                    }

                </select>

                {/* range input for BPM, min = 40, max = 200 (arbitrary) */}
                <label htmlFor="BPM">BPM{newBeep.bpm}</label>
                <input type="range" id="BPM" name="BPM"
                    min="40" max="200" value={newBeep.bpm} onChange={handleBPM} />


            </div>
            <p></p>

            <div className="step-select-container">

                {/* these will eventually be mapped over based on sequence length(stretch) */}

                <select name="selectOne" id="step1" onChange={handleStep}>
                    {/* uses selectedScale state to return a list of notes in selected selectedScale */}
                    {selectedScale.map((note, i) => {
                        return (
                            <option key={i} value={note}>{note}</option>
                        )
                    })}
                </select>

                <select name="selectTwo" id="step2" onChange={handleStep}>
                    {/* uses selectedScale state to return a list of notes in selected selectedScale */}
                    {selectedScale.map((note, i) => {
                        return (
                            <option key={i} value={note}>{note}</option>
                        )
                    })}
                </select>

                <select name="selectThree" id="step3" onChange={handleStep}>
                    {/* uses selectedScale state to return a list of notes in selected selectedScale */}
                    {selectedScale.map((note, i) => {
                        return (
                            <option key={i} value={note}>{note}</option>
                        )
                    })}
                </select>

                <select name="selectFour" id="step4" onChange={handleStep}>
                    {/* uses selectedScale state to return a list of notes in selected selectedScale */}
                    {selectedScale.map((note, i) => {
                        return (
                            <option key={i} value={note}>{note}</option>
                        )
                    })}
                </select>

                <select name="selectFive" id="step5" onChange={handleStep}>
                    {/* uses selectedScale state to return a list of notes in selected selectedScale */}
                    {selectedScale.map((note, i) => {
                        return (
                            <option key={i} value={note}>{note}</option>
                        )
                    })}
                </select>

                <select name="selectSix" id="step6" onChange={handleStep}>
                    {/* uses selectedScale state to return a list of notes in selected selectedScale */}
                    {selectedScale.map((note, i) => {
                        return (
                            <option key={i} value={note}>{note}</option>
                        )
                    })}
                </select>

                <select name="selectSeven" id="step7" onChange={handleStep}>
                    {/* uses selectedScale state to return a list of notes in selected selectedScale */}
                    {selectedScale.map((note, i) => {
                        return (
                            <option key={i} value={note}>{note}</option>
                        )
                    })}
                </select>

                <select name="selectEight" id="step8" onChange={handleStep}>
                    {/* uses selectedScale state to return a list of notes in selected selectedScale */}
                    {selectedScale.map((note, i) => {
                        return (
                            <option key={i} value={note}>{note}</option>
                        )
                    })}
                </select>
            </div>
            <p></p>

            <PlayButton newBeep={newBeep} />
            <button onClick={handleSave}>save</button>

        </div>
    )

}

export default NewBeepPage
