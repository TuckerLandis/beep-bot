// Does nothing ATM     !!!!

import { useDispatch } from "react-redux";

function FavoriteButton(props) {
  const dispatch = useDispatch()

  async function handleFavorite(beep) {
    await props.beep
    if (props.beep.users_that_favorite?.includes(props.user.username)) {

      let newFaves = props.beep.users_that_favorite
      // find index of user.id
      let indexToRemove = newFaves.indexOf(props.user.username)
      // if the user.id is in the array, remove it
      if (indexToRemove > -1) {
        newFaves.splice(indexToRemove, 1)
      }
     
      // beep.users_that_like is now the newLikes array
      beep = {
        ...beep, users_that_favorite: newFaves
      }
      // sends dispatch to update likes array, and decrement like counter
      dispatch({
        type: "UNFAVORITE_BEEP",
        payload: beep
      })

      return



      return
    } else {
      console.log(props.beep);

      let newFaves = props.beep.users_that_favorite

      newFaves.push(props.user.username)

      beep = {
        ...beep, users_that_favorite: newFaves
      }



      dispatch({
        type: "FAVORITE_BEEP",
        payload: beep
      })
    }
  }


  if (props.beep.users_that_favorite.includes(props.user.username)) {
    return (
      <button className="nes-btn is-warning" onClick={() => { handleFavorite(props.beep) }}><i className="nes-icon is-medium star is-full"></i></button>
    )
  } else {
    return (
      <button className="nes-btn is-warning" onClick={() => { handleFavorite(props.beep) }}><i className="nes-icon is-medium star is-empty"></i></button>
    )
  }
}

export default FavoriteButton


