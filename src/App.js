// import logo from '';
import './App.css';
import './api'
import { fetchPokemonInfo } from "./api";
import { useState, forwardRef, useRef, useImperativeHandle, useEffect } from "react";


function App() {
    return (
        <div className="App">
            <Header />
            <Main />
            <Footer />
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
            <BattleForm />
        </main>
    );
}

function BattleForm() {

    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');
    const [info1, setInfo1] = useState({});
    const [info2, setInfo2] = useState({});

    function getInfos() {
        setInputOne(inputOne)
        setInputTwo(inputTwo)
        let pokemonInfo = fetchPokemonInfo(inputOne.toLowerCase()).then((res) => {
            // let fullInfo = res;
            // fullInfo["name"] = inputOne;
            setInfo1(res);
        })
        let pokemonInfo2 = fetchPokemonInfo(inputTwo.toLowerCase()).then((res) => {
            // let fullInfo = res;
            // fullInfo["name"] = inputTwo;
            setInfo2(res);
        })
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
            <div className="results">
                <PokemonCard info={info1} />
                <PokemonCard info={info2} />
                <Winner info={[info1, info2]} />
            </div>
        </div>

    );
}

function Winner(info) {
    console.log(info);
    // let sumStats1 = 0;
    // let sumStats2 = 0;
    // for (const item in info1) {
    //     sumStats1 += item
    // }
    // for (const item in info2) {
    //     setSumStats2(pred => (pred + info2[item]));
    // }

    // if (sumStats1 > sumStats2) {
    //     return (
    //         <p>Первый</p>
    //     );
    // }
    // else if (sumStats1 == sumStats2) {
    //     return (
    //         <p>Draw!</p>
    //     );
    // }
    // else {
    //     return (
    //         <p>Второй</p>
    //     );
    // }
}

function Footer() {
    return (
        <footer>
            <div className="gifload">
                <img src="https://media.giphy.com/media/PAuDiTd7DLwYagLGH3/giphy.gif" alt="gif"
                    id="snorlax" />
            </div>
        </footer>
    );
}

function PokemonCard({ info }) {
    const results = [];
    for (const property in info) {
        results.push(
            <li key={property}>{property}: {info[property]}</li>
        );
    }

    return (
        <div>
            <ul>
                {results}
            </ul>
        </div>
    )
}
export default App;
