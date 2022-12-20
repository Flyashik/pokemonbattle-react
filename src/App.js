// import logo from '';
import './App.css';
import './api'
import {fetchPokemonInfo} from "./api";
import {useState} from "react";


function App() {
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

    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');

    function getInfos() {
        setInputOne(inputOne)
        setInputTwo(inputTwo)
    }

    return (
        <div className="Battle-form">
            <div className="inputs-container">
                <input type="text" className="text-input"
                       value={inputOne}
                       onChange={(event) => setInputOne(event.target.value)}
                       placeholder="Set name" required />
                <p className="vs">VS</p>
                <input type="text" className="text-input"
                       value={inputTwo}
                       onChange={(event) => setInputTwo(event.target.value)}
                       placeholder="Set name" required />
            </div>
            <button className="button-start" onClick={getInfos}>Let's start!</button>
            {inputOne != '' && inputTwo != '' &&
                <div>
                    <PokemonCard name={inputOne}/>
                    <PokemonCard name={inputTwo}/>
                </div>
            }
        </div>

    );
}

function PokemonCard(props) {
    console.log(props.name)
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
