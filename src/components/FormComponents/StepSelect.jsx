export default function StepSelect (props) {
    return(

                
                <div className="step-select-container">

                    {/* maps over beep.steps and returns that many step-selectors */}
                    {props.beep.steps?.map((step, i) => {
                        return (
                            <select id={i} onChange={props.handleStep} key={i} value={step} className="inactive">

                                {/* <option key={i} value={note}>{note}</option> */}
                                {/* uses selectedScale state to return a list of notes based on handScaleChoice */}
                                {props.selectedScale?.map((note, i) => {
                                    return (
                                        <option key={i} value={note}>{note}</option>
                                    )
                                })}
                            </select>
                        )
                    }) // end map script
                    }
                </div>
    )
} 

