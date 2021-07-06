import { useDispatch } from "react-redux";

function LikeButton(props) {
  const dispatch = useDispatch()


  /**
   * Conditionally adds/ removes a like from the beep item in the DB. this was prrof of concept, i plan to change the ID array here
   * to an array of usernames, so users can see who likes what <3
   * @param {*} beep 
   * @returns 
   */
  async function handleLike(beep) {
    await props.beep
    // if the user's user.id is in the array of user id's that like this element, do the following
    if (props.beep.users_that_like?.includes(JSON.stringify(props.user.id))) {
      // new array from user id like list
      let newLikes = props.beep.users_that_like
      // find index of user.id
      let indexToRemove = newLikes.indexOf(JSON.stringify(props.user.id))
      // if the user.id is in the array, remove it
      if (indexToRemove > -1) {
        newLikes.splice(indexToRemove, 1)
      }
      console.log(newLikes);
      // beep.users_that_like is now the newLikes array
      beep = {
        ...beep, users_that_like: newLikes
      }
      // sends dispatch to update likes array, and decrement like counter
      dispatch({
        type: "UNLIKE_BEEP",
        payload: beep
      })

      return

    } 
     // if the user's user.id is NOT in the array, do the following
    else {
      // set new array to userID like array
      let newLikes = props.beep.users_that_like
      // add user's ID to like array
      newLikes.push(props.user.id)
      // beep. users_that_like is the new array
      beep = {
        ...beep, users_that_like: newLikes
      }
      // send dispatch to increment likes counter, update the array
      dispatch({
        type: "LIKE_BEEP",
        payload: beep
      })
    }
  }


  if (props.beep.users_that_like?.includes(JSON.stringify(props.user.id))) {
    return (
      // if user likes, return a button with a full icon, and function to unlike
      <button className="nes-btn is-primary" onClick={() => { handleLike(props.beep) }}><i className="nes-icon is-medium heart is-full"></i></button>
    )
  } else {
    return (
      // if user doesn't like, return buutton with empty heart, function to like
      <button className="nes-btn is-primary" onClick={() => { handleLike(props.beep) }}><i className="nes-icon is-medium heart is-empty"></i></button>
    )
  }
}

export default LikeButton