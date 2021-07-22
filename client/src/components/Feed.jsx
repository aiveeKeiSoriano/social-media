
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "./Loading"

export default function Feed() {

    let user = useSelector(state => state.auth.user)
    let logged = useSelector(state => state.auth.logged)

    let history = useHistory()

    useEffect(() => {
        if (logged === false) {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [logged])

    return (
        <>
            {logged ?
                
                <div className="feed">
                    <img src={user.picture} alt="sample" />
                    FEEED</div>
                : <Loading />
            }
            </>
    )
}