import { Outlet } from "react-router-dom"

import Navbar from "./components/Navbar"

import Footer from "./components/Footer"

import { useAuthBootstrap } from "./features/auth/hooks/useAuthBootstrap"

function App() {
  useAuthBootstrap()

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  )
}

export default App