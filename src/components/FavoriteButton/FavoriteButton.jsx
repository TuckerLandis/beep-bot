import { useDispatch } from "react-redux";

  function FavoriteButton(props) {
      const dispatch = useDispatch()

    async function handleFavorite(beep) {
        await props.beep
        // if (props.beep.users_that_favorite?.includes(JSON.stringify(props.user.id))) {
        //   console.log('user already favorites this');
        //   return
        // } else {
        //   console.log(props.beep);
          
        //   let newLikes = props.beep.users_that_like

        //  newLikes.push(props.user.id)
          
        //   beep = {
        //       ...beep, users_that_like : newLikes
        //   }
    
          
      
        //   dispatch({
        //     type: "FAVORITE_BEEP",
        //     payload: beep
        //   })
        // }
      }


    if ('userfavorite') {
      return (
        <button className="nes-btn is-warning"><i className="nes-icon is-medium star is-full"></i></button>
      )
    } else {
      return (
        <button className="nes-btn is-warning" onClick={() => { handleFavorite(props.beep) }}><i className="nes-icon is-medium star is-empty"></i></button>
      )
    }
  }

  export default FavoriteButton


  // Does nothing ATM     !!!!