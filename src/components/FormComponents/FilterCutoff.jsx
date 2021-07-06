export default function FilterCutoff(props) {


    return (
        <div>
            <label htmlFor="filter_cutoff">Filter Cutoff: {props.beep.filter_cutoff} </label>


            <input type="range" id="filter_cutoff" name="filter_cutoff" className="slider"
                min="0" max="20000" value={props.beep.filter_cutoff} onChange={props.handleBeep} />
        </div>
    )
}