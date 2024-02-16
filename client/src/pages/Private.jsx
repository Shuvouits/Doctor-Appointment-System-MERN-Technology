import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function Private() {
    const {user} = useSelector( (state) => ({...state}) )
    return user ? <Outlet /> : <Navigate to={'/login'} />
}

export default Private