import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'


// swal class object
import SwalClassObject from '../../assets/SwalClassObject/SwalClassObject';

export default function OverwriteButton(props) {
    const dispatch = useDispatch()


    /**
     * Upon pressing save, a sweet alert pops up that asks the for overwrite confirmation
     * Upon confirming, beep.name is updated with the value. once that is done, the beep is stored in the database
     * button -> dispatch -> beep saga -> beep router
     */
     const handleOverwrite = () => {
        console.log('saving a beep :)', props.beep);


        Swal.fire({
            title: 'Do you want to overwrite this beep?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            customClass: SwalClassObject
        }).then((result) => {

            // if okay button is pressed, send a confirmation dialog, and send a put request to update beep
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Beep Saved!',
                    showCancelButton: true,
                    customClass: SwalClassObject
                   
                }
                )
                dispatch({
                    type: 'UPDATE_BEEP',
                    payload: props.beep
                })
            }
        })



    }


    return (
        <button className="nes-btn is-primary save" onClick={handleOverwrite}>save</button>
    )
}