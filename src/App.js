import { Routes, Route } from "react-router-dom"
import Register from "./Register/Register";
import LoginEmail from "./Login/LoginEmail";
import LoginPassword from "./Login/LoginPassword";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <div className="App w-full h-screen">
      <Routes>
        <Route path="/" element={ <LoginEmail /> } />
        <Route path="/login-password" element={ <LoginPassword /> } /> 
        <Route path="/register" element={ <Register /> } /> 
        <Route path="/dashboard" element={ <Dashboard /> } /> 
      </Routes>
    </div>
  )
}

export default App
