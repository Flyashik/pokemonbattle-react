// import logo from '';
import './App.css';
import './api'
import {fetchPokemonInfo} from "./api";
import {useRef} from "react";


function App() {
  const firstPokemon = useRef(null)
  const secondPokemon = useRef(null)
  return (
    <div className="App">
        <Header/>
        <Main/>
        <Footer/>
    </div>
  );
}

function Header() {
    return (
        <header className="Header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" className="logo" alt="logo" />
        </header>
    );
}

function Main() {
    return (
        <main className="Main">
            <p className="choose">Choose Pokémons!</p>
            <BattleForm/>
        </main>
    );
}

function BattleForm() {


    return (
        <div className="Battle-form">
            <div className="inputs-container">
                <input type="text" className="text-input" placeholder="Set name" required />
                <p className="vs">VS</p>
                <input type="text" className="text-input" placeholder="Set name" required />
            </div>
            <button className="button-start">Let's start!</button>
        </div>
    );
}

function Footer(){
    return (
        <footer>
            <div className="gifload">
                <img src="https://media.giphy.com/media/PAuDiTd7DLwYagLGH3/giphy.gif" alt="gif"
                     id="snorlax"/>
            </div>
        </footer>
    );
}

export default App;
