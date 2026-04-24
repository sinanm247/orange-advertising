import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [ user, setUser ] = useState(null)
    const [ selectedDashboardMenu, setSelectedDashboardMenu ] = useState("")

    const handleLogin = (user) => {
        setUser(user)
    }

    const handleLogout = () => {
        toast.success("Successfully Logged Out")
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("dashboardMenu")
        navigate("/")
    }

    const handleDashboardMenuChange = (menu) => {
        setSelectedDashboardMenu(menu);
        if(menu) {
            localStorage.setItem("dashboardMenu", JSON.stringify(menu));
        } else {
            localStorage.removeItem("dashboardMenu")
        }
    }

    return (
        <AuthContext.Provider 
            value = {{ 
                user, 
                setUser, 
                handleLogin, 
                handleLogout,
                selectedDashboardMenu,
                handleDashboardMenuChange
            }}>
            { children }
        </AuthContext.Provider>
    )
}