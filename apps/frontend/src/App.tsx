import { Outlet } from "react-router-dom"

import Navbar from "./components/Navbar"

import { useAuthBootstrap } from "./features/auth/hooks/useAuthBootstrap"

function App() {
  useAuthBootstrap()

  return (
    <>
      <Navbar />

      <Outlet />
    </>
  )
}

export default App