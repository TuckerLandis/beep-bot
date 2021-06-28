import { useState } from 'react';
import * as Tone from 'tone'
import { Note, Scale } from "@tonaljs/tonal";
import { useDispatch } from 'react-redux';

function NewBeep() {
    const dispatch = useDispatch()
    // states for playing boolean and for playbutton text. these get flipped when pressing play or stop
    const [isPlaying, setIsPlaying] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('play')

    // default beep sequence
    const [seqParams, setSeqParams] = useState(
        {
            scaleName: 'major',
            octave: 4,
            rootNote: 'C',
            bpm: 120,
            step1: null,
            step2: null,
            step3: null,
            step4: null,
            step5: null,
            step6: null,
            step7: null,
            step8: null,

        }
    )

    // reference object for synth params. changed via inputs for synth params. read by tone.synth, defaults as follows
    const [synthParams, setSynthParams] = useState({
        oscillatorType: 'triangle8',
        env_attack: 0.01,
        env_decay: 0.1,
        env_sustain: 0.9,
        env_release: 1,
        filter_type: 'lowpass',
        filter_cutoff: 1200

    })

    // sets an array of all notes to be the options in the root note select map
    const rootNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    // default notes array
    const c_major = ["off", "C4", "D4", "E4", "F4", "G4", "A4", "B4"]
    // array of notes in selected scale, defaults to C_Major
    const [selectedScale, setSelectedScale] = useState(c_major) // set this to scaleChoice function ? --useeffect scaleschoice function

    // select populator for scale choice
    let scaleList = ["major", "minor", "pentatonic"]

    // our "sequence", to be manipulated on change of the values below / above.
    let steps = [seqParams.step1, seqParams.step2, seqParams.step3, seqParams.step4, seqParams.step5, seqParams.step6, seqParams.step7, seqParams.step8,]

    // -------------------------------------------------------------------------Handle Change Zone ----------------------------------------------------////
    // ! todo: rewrite handlestep in like 1/8 the lines
    function handleStep(event) {
        switch (event.target.id) {
            case "step1":
                console.log('changing step1');
                setSeqParams({
                    ...seqParams, step1: event.target.value
                })
                break;
            case "step2":
                console.log('changing step2');
                setSeqParams({
                    ...seqParams, step2: event.target.value
                })
                break;
            case "step3":
                console.log('changing step3');
                setSeqParams({
                    ...seqParams, step3: event.target.value
                })
                break;
            case "step4":
                console.log('changing step4');
                setSeqParams({
                    ...seqParams, step4: event.target.value
                })
                break;
            case "step5":
                console.log('changing step5');
                setSeqParams({
                    ...seqParams, step5: event.target.value
                })
                break;
            case "step6":
                console.log('changing step6');
                setSeqParams({
                    ...seqParams, step6: event.target.value
                })
                break;
            case "step7":
                console.log('changing step7');
                setSeqParams({
                    ...seqParams, step7: event.target.value
                })
                break;
            case "step8":
                console.log('changing step8');
                setSeqParams({
                    ...seqParams, step8: event.target.value
                })
                break;
            default: console.log('nothing happened in step switch');

        }
    }


    // ! todo: rewrite handle SeqParams as one
    // BPM handler, gets saved
    const handleBPM = (event) => {
        setSeqParams({
            ...seqParams, bpm: event.target.value
        })
    }

    // handles scale option select, calls handleScaleChoice
    const handleScaleName = (event) => {
        setSeqParams({
            ...seqParams, scaleName: event.target.value
        })
        handleScaleChoice()
    }

    // handles octave change, calls handle scale choice
    const handleOctave = (event) => {
        setSeqParams({
            ...seqParams, octave: event.target.value
        })
        handleScaleChoice()
    }

    // handles change of rootnote, calls handle scale choice
    const handleRoot = (event) => {
        setSeqParams({
            ...seqParams, rootNote: event.target.value
        })
        handleScaleChoice()
    }

    // overarching "set the scale" function, takes the scale input choices for rootnote, octave and scalename "major, minor, etc"
    // and uses tonal to scale.get the notes in the scale. these are mapped over below in our selects
    function handleScaleChoice() {
        let scaleO = (Scale.get(`${seqParams.rootNote} ${seqParams.scaleName}`).notes) // sets temp var to scale.get using root note and scalename

        // loops over scale array, and adds the respective octave to the array for rendering by Tone
        for (let i = 0; i < scaleO.length; i++) {
            scaleO[i] += seqParams.octave
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
                setSynthParams({
                    ...synthParams, oscillatorType: event.target.value
                })
                break;
            case "filter_type":
                console.log('changing filter-type');
                setSynthParams({
                    ...synthParams, filter_type: event.target.value
                })
                break;
            case "filter_cutoff":
                console.log('changing filter-cutoff');
                setSynthParams({
                    ...synthParams, filter_cutoff: Number(event.target.value)
                })
                break;
        }
    }




    const playButton = () => { //// <--------<------<-----<------The play Button -------------------------- ////>

        console.log(steps, seqParams, synthParams); // gives notes and seq params

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


    // Post Dispatch
    const handleSave = () => {


        let beep = {
            osc_type: synthParams.oscillatorType,
            filter_type: synthParams.filter_type,
            filter_cutoff: synthParams.filter_cutoff,
            scale: seqParams.scaleName,
            root: seqParams.rootNote,
            bpm: seqParams.bpm,
            steps: steps
        }

        console.log('saving a beep :)', beep);
        dispatchBeep(beep)

    }

    function dispatchBeep(beep) {
        dispatch({
            type: 'SAVE_NEW_BEEP',
            payload: beep
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

                    <label htmlFor="filter-cutoff">Filter Cutoff: {synthParams.filter_cutoff} </label>
                    <input type="range" id="filter_cutoff" name="filter_cutoff"
                        min="0" max="20000" value={synthParams.filter_cutoff} onChange={handleSynthParams} />

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
                <select name="octave-select" id="octave-select" onChange={handleOctave} value={seqParams.octave} >
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
                <select name="root-select" id="root-select" onChange={handleRoot} value={seqParams.rootNote}>

                    {
                        rootNotes.map((rootNote, i) => {
                            return (
                                <option key={i} value={rootNote}>{rootNote}</option>
                            )
                        })
                    }

                </select>

                {/* range input for BPM, min = 40, max = 200 (arbitrary) */}
                <label htmlFor="BPM">BPM{seqParams.bpm}</label>
                <input type="range" id="BPM" name="BPM"
                    min="40" max="200" value={seqParams.bpm} onChange={handleBPM} />


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

            <button onClick={playButton}>{playButtonText}</button>
            <button onClick={handleSave}>save</button>
        </div>
    )

}

export default NewBeep
