export default function ScaleName (props) {

    // select populator for scale choice drop dowm
    let scaleList = ["major", "minor", "pentatonic", "ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"]

    return(
        <div>
                        <label htmlFor="scale-select">Scale </label>
                        <select name="scale-select" id="scale" onChange={props.handleBeep} className="wider-select nes-pointer">
                            {scaleList.map((scale, i) => {
                                return (
                                    <option key={i} value={scale}>{scale}</option>
                                )
                            })}
                        </select>
                    </div>
    )
}