import { useState } from 'react';
import * as Tone from 'tone'
import { Note, Scale } from "tonal";

function NewBeep() {
    // states for playing boolean and for playbutton text. these get flipped when pressing play or stop
    const [isPlaying, setIsPlaying] = useState(false)
    const [playButtonText, setPlayButtonText] = useState('play')

    // default beep
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

// other data drafts
            // steps: {
            //     1: null,
            //     2: null,
            //     3: null,
            //     4: null,
            //     5: null,
            //     6: null,
            //     7: null,
            //     8: null
            // }
            // steps: [null x8]
        }
    )

    // reference object for synth params. changed via inputs for synth params. read by tone.synth, defaults as follows
    const [synthParams, setSynthParams] = useState({
        oscillatorType: 'triangle8',
        env_attack: 0.01,
        env_decay: 0.1,
        env_sustain: 0.9,
        env_release: 1,

    })

    // sets an array of all notes to be the options in the root note select map
    const rootNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    // default notes array
    const c_major = ["off", "C4", "D4", "E4", "F4", "G4", "A4", "B4"]
    // array of notes in selected scale, defaults to C_Major
    const [selectedScale, setSelectedScale] = useState(c_major)

    // select populator for scale choice
    let scaleList = ["major", "minor", "pentatonic"]

    // our "sequence", to be manipulated on change of the values below / above.
    let steps = [seqParams.step1, seqParams.step2, seqParams.step3, seqParams.step4, seqParams.step5, seqParams.step6, seqParams.step7, seqParams.step8,]

    // -------------------------------------------------------------------------Handle Change Zone ----------------------------------------------------////

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
            case "env_attack":
                console.log("env_attack");
                setSynthParams({
                    ...synthParams, env_attack: event.target.value
                })
                break;
            case "env_decay":
                console.log('changing env_decay');
                setSynthParams({
                    ...synthParams, env_decay: event.target.value
                })
                break;
            case "env_sustain":
                console.log('changing env_sustain');
                setSynthParams({
                    ...synthParams, env_sustain: event.target.value
                })
                break;
            case "env_release":
                console.log('changing env_release');
                setSynthParams({
                    ...synthParams, env_release: event.target.value
                })
                break;


        }
    }
        // ----------------------------------------------------------------------------------------------------------------



        const playButton = () => { //// <--------<------<-----<------The play Button -------------------------- ////>

            console.log(steps, seqParams); // gives notes and seq params

            if (!isPlaying) {  // starts Tone if stopped
                setIsPlaying(true)  // flips playing boolean
                setPlayButtonText('stop') // flips button text

                Tone.start() // start tone audio context on user interaction per spec of web audio api


                // leaving space mentally for a section for configuring (stretch) probability of the sequence

                Tone.Transport.bpm.value = seqParams.bpm; // sets BPM to input from BPM range select, sets state of BPM 

                const volumeNode = new Tone.Volume(-18).toDestination();

                // const filter = new Tone.Filter(600, "lowpass") base tonejs filter

                const filter2 = new Tone.LowpassCombFilter(0.1, 0.2, 300) // slightly more complex, better sounding filter. delay time seems variable, but i may use this as my delay param for the synth

                // args to the LowPassCombFilter
                //     delayTime: Time,
                //     // The delay time of the comb filter

                //      resonance: NormalRange,
                //    //  The resonance (feedback) of the comb filter

                //      dampening: Frequency
                //     // The cutoff of the lowpass filter dampens the signal as it is fedback.
                // }


                // instantiates a mono synth. the parameters are set to the state object "synthParams".'param":"value"
                const synth = new Tone.MonoSynth({
                    oscillator: {
                        type: synthParams.oscillatorType
                    },
                    envelope: {
                        attack: synthParams.env_attack,
                        decay: synthParams.env_decay,
                        sustain: synthParams.env_sustain,
                        release: synthParams.env_release
                    }
                }).chain(volumeNode, filter2, Tone.Destination);



                const seq = new Tone.Sequence((time, note) => { // instantiates sequence of triggers for synth
                    synth.triggerAttackRelease(note, 0.1, time); // note comes from notes array state. 
                    // subdivisions are given as subarrays
                }, steps).start(0); // which notes? steps array. start takes arg of "now" time

                // starts the transport. what actually STARTs our sequence
                Tone.Transport.start();


            } else { // if transport is playing, 
                setIsPlaying(false) // set play bool to off
                setPlayButtonText('play') // flip play button text
                Tone.Transport.stop(); // STOP the transport , music
            }
        }

        // main return to DOM of our sequencer component
        return (
            <div>
                <button onClick={playButton}>{playButtonText}</button>
                <div className="step-select-container">

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

                <div className="scale-select-container">
                    <select name="scale-select" id="scale-select" onChange={handleScaleName} >
                        {scaleList.map((scale, i) => {
                            return (
                                <option key={i} value={scale}>{scale}</option>
                            )
                        })}
                    </select>

                    {/* select for octave choice, triggers handle octave on change */}
                    <select name="octave-select" id="octave-select" onChange={handleOctave} >
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
                    <select name="root-select" id="root-select" onChange={handleRoot}>

                        {
                            rootNotes.map((rootNote, i) => {
                                return (
                                    <option key={i} value={rootNote}>{rootNote}</option>
                                )
                            })
                        }

                    </select>

                    {/* range input for BPM, min = 40, max = 200 (arbitrary) */}
                    <input type="range" id="BPM" name="BPM"
                        min="40" max="200" value={seqParams.bpm} onChange={handleBPM} />
                    <label htmlFor="BPM">BPM{seqParams.bpm}</label>

                </div>

            </div>
        )

    }

    export default NewBeep
