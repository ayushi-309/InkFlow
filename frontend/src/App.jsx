import { Navbar, Footer } from "./components/index.js"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App