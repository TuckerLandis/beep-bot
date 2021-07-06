export default function BeepTitle (props) {

    return(
        <div className="title-container">
                <div className="beep-title">
                    <h1>{props.beep.beep_name ? props.beep.beep_name : "Untitled"}</h1>
                </div>
            </div>
    )
}