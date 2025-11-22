import React, {useState} from "react"
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { router } from "./router/index.jsx";



function App() {
  return (

    <Routes router={router}/>
  )
}

export default App
