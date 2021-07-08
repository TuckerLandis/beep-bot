export default function (props) {
    return(
        <div style={{ width: "30%" }}>
                        <div>
                        <label htmlFor="BPM"><span className="range-text">Tempo: {props.beep.bpm}</span></label>
                        </div>
                        
                        <input type="range" id="bpm" name="BPM" className="slider"
                            min="40" max="200" value={props.beep.bpm} onChange={props.handleBeep} />
                    </div>
    )
}