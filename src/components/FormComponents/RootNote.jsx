export default function (props) {

      // default: sets an array of all notes to be the options in the root note select map
      let rootNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    return(
        <div>
        <label htmlFor="root-select">Root Note: </label>
        <select name="root-select" id="root" onChange={props.handleBeep} value={props.beep.root}>

            {
                rootNotes.map((rootNote, i) => {
                    return (
                        <option key={i} value={rootNote}>{rootNote}</option>
                    )
                })
            }
        </select>
    </div>
    )
}