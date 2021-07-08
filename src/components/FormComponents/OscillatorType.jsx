export default function OscillatorType (props) {

    return(
        <div className="osc-type-container nes-pointer">
        <label htmlFor="osc-type">Osc Type </label>
        <select name="osc-type" id="osc_type" onChange={props.handleBeep} className="wider-select" >
            <option value="triangle8">Triangle</option>
            <option value="square8">Square</option>
            <option value="sine8">Sine</option>
            <option value="sawtooth">Saw</option>
        </select>

    </div>
    )
}