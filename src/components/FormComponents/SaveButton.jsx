import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router';

import Swal from 'sweetalert2'

// swal class object
import SwalClassObject from '../../assets/SwalClassObject/SwalClassObject';

export default function SaveButton (props) {
    const dispatch = useDispatch()
    const userObj = useSelector((store) => store.user)
    const history = useHistory()



    // this function is sent to the beep saga in the dispatch below to send a user to the edit page via the new post's response.id
    function pushToEdit(beep_id) {

        // simple history push with the returned beep ID from our post. presently undefined. passed to the saga
        history.push(`/edit/${beep_id}`)
    }

    /**
     * sends a dispatch containing: beep object, pushToEdit function as described above
     */
    function dispatchBeep(beep) {
        dispatch({
            type: 'SAVE_NEW_BEEP',
            payload: {
                beep: beep,
                pushToEdit: pushToEdit
            }
        })
    }

    /**
     * Upon pressing save, a sweet alert pops up that asks the user for a name to save their beep under. 
     * Upon confirming, beep.name is updated with the value. once that is done, the beep is stored in the database
     * button -> dispatch -> beep saga -> beep router
     */
     const handleSave = async () => {
        console.log('saving a beep :)', props.beep);


        // this prompt is fired upon pressing the save button on the new beep page, it takes in a required name input
        Swal.fire({
            title: 'What should we call this beep?',
            input: 'text',
            inputValue: '',
            inputPlaceholder: 'Enter a name for your beep',
            showCancelButton: true,
            customClass: SwalClassObject,
            // validates that the user has entered a value. if !value, stop here
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
            // once the input has been validated, send a dispatch like below
        }).then(result => {
            console.log(result);
            if (result.isConfirmed) {

                // sends a beep to the beep saga for posting to the DB, adds the name from the sweet alert to this object as it's dispatched
                dispatchBeep({
                    ...props.beep, name: result.value, user_name: userObj.username
                })
            }
        }
        )
    }


    return(
        <button className="nes-btn is-primary save" onClick={handleSave}>save</button>
    )
}