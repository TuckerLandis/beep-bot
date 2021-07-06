export default function FilterType(props) {


    return (
        <div>
            <label htmlFor="filter-type">Filter Type: </label>
            <select name="filter-type" id="filter_type" onChange={props.handleBeep} className="wider-select">
                <option value="lowpass">Low Pass</option>
                <option value="highpass">High Pass</option>
                <option value="bandpass">Band Pass</option>
            </select>
        </div>
    )
}