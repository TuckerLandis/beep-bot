export default function Octave (props) {
    return(
        <div>
                        <label htmlFor="octave-select">Octave </label>
                        <select className="nes-pointer scale-sel" name="octave-select" id="octave" onChange={props.handleBeep} value={props.beep.octave} >
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
    )
}