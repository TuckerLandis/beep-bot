import { useDispatch } from "react-redux";

function LikeButton(props) {
  const dispatch = useDispatch()

  async function handleLike(beep) {
    await props.beep
    if (props.beep.users_that_like?.includes(JSON.stringify(props.user.id))) {

      let newLikes = props.beep.users_that_like
      let indexToRemove = newLikes.indexOf(JSON.stringify(props.user.id))
      if (indexToRemove > -1) {
        newLikes.splice(indexToRemove, 1)
      }
      console.log(newLikes);

      beep = {
        ...beep, users_that_like: newLikes
      }

      dispatch({
        type: "UNLIKE_BEEP",
        payload: beep
      })

      return
    } else {
      console.log(props.beep);

      let newLikes = props.beep.users_that_like

      newLikes.push(props.user.id)

      beep = {
        ...beep, users_that_like: newLikes
      }

      dispatch({
        type: "LIKE_BEEP",
        payload: beep
      })
    }
  }


  if (props.beep.users_that_like?.includes(JSON.stringify(props.user.id))) {
    return (
      <button className="nes-btn is-primary" onClick={() => { handleLike(props.beep) }}><i class="nes-icon is-medium heart is-full"></i></button>
    )
  } else {
    return (
      <button className="nes-btn is-primary" onClick={() => { handleLike(props.beep) }}><i className="nes-icon is-medium heart is-empty"></i></button>
    )
  }
}

export default LikeButton