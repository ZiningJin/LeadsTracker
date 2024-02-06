import React from "react";
import Header from "./components/Header/Header"
import About from "./components/About/About";
import Nav from './components/Nav/Nav';
import Insert from './components/Insert/Insert'
import Track from "./components/Track/Track";
import Update from "./components/Update/Update";
import Download from './components/Download/Download';
import Footer from "./components/Footer/Footer";

const App = () => {
    return (
        <>
        <Header />
        <About />
        <Nav />
        <Insert />
        <Track />
        <Update />
        <Download />
        <Footer />
        </>
    )
}

export default App
