function UserBeeps () {

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_BEEPS' });
      }, []);

    // use selector user beeps


    return (
        <div><p>User Beeps check console</p></div>
    )
}