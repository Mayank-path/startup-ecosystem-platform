import {
    Link,
    useNavigate,
  } from "react-router-dom"
  
  import {
    logoutUser,
  } from "../features/auth/api/auth.api"
  
  import {
    useAuthStore,
  } from "../features/auth/store/auth.store"
  
  function Navbar() {
    const navigate = useNavigate()
  
    const user = useAuthStore(
      (state) => state.user
    )
  
    const logout =
      useAuthStore(
        (state) => state.logout
      )
  
    const handleLogout =
      async () => {
        try {
          await logoutUser()
  
          logout()
  
          navigate("/login")
        } catch (error) {
          console.log(error)
        }
      }
  
    return (
      <nav className="flex items-center justify-between border-b p-4">
        <Link to="/">
          Startup Ecosystem
        </Link>
  
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link to="/profile">
                Profile
              </Link>
  
              <button
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>
  
              <Link to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    )
  }
  
  export default Navbar