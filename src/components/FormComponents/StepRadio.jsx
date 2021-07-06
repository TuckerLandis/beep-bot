export default function StepRadio(props) {

    return (
        <div className="step-select-container">

            {/* maps over beep.steps and returns that many step-selectors */}
            {props.beep.steps?.map((step, i) => {
                return (
                    <form id={i} onChange={props.handleStep} key={i} value={step} className="radio-column">

                        {/* <option key={i} value={note}>{note}</option> */}
                        {/* uses selectedScale state to return a list of notes based on handScaleChoice */}
                        {props.selectedScale?.map((note, i) => {
                            return (
                                <label>
                                    <input className="nes-radio" type="radio" key={i} value={note} /> 
                                    {/* how to get ID of form above? */}
                                    <span>{note}</span>
                                </label>

                            )
                        })}
                    </form>
                )
            }) // end map script
            }
        </div>
    )
}