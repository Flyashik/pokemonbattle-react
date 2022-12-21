import './App.css';
import './api'
import { fetchPokemonInfo } from "./api";
import { useState, useRef } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);


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

    const inputOne = useRef("");
    const inputTwo = useRef("");
    const [info1, setInfo1] = useState({});
    const [info2, setInfo2] = useState({});

    function getInfos() {


        let pokemonInfo = fetchPokemonInfo(inputOne.current.value.toLowerCase()).then((res) => {
            setInfo1(res);
        })
        let pokemonInfo2 = fetchPokemonInfo(inputTwo.current.value.toLowerCase()).then((res) => {
            setInfo2(res);
        })
    }

    return (
        <div className="Battle-form">
            <div className="inputs-container">
                <input type="text" className="text-input"
                    ref={inputOne}
                    placeholder="Set name" required />
                <p className="vs">VS</p>
                <input type="text" className="text-input"
                    ref={inputTwo}
                    placeholder="Set name" required />
            </div>
            <button className="button-start" onClick={getInfos}>Let's start!</button>
            <div className="stats">
                <PokemonCard info={[inputOne.current.value, info1]} />
                <PokemonCard info={[inputTwo.current.value, info2]} />
            </div>
            <div className="result">
                <Winner info={[info1, info2, inputOne.current.value, inputTwo.current.value]} />
            </div>
        </div>

    );
}

function PokemonCard(info) {
    if(!Object.keys(info.info[1]).length)
        return (<></>);
    let statsValuesArray = [];
    let statsKeysArray = [];
    for (const key in info.info[1]) {
        statsValuesArray.push(info.info[1][key]);
        statsKeysArray.push(key);
    }
    const results = [];
    results.push(
        <li key="name">name: {info.info[0]}</li>
    );
    for (const property in info.info[1]) {
        results.push(
            <li key={property}>{property}: {info.info[1][property]}</li>
        );
    }

    const data = {
        labels: statsKeysArray,
        datasets: [
            {
                label: '# of Votes',
                data: statsValuesArray,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <ul>
                {results}
            </ul>
            <Radar data={data}/>
        </div>
    )
}

function Winner(info) {
    let sumStats1 = 0;
    let sumStats2 = 0;
    if(!Object.keys(info.info[0]).length || !Object.keys(info.info[1]).length)
        return (<></>);

    for (const item in info.info[0]) {
        sumStats1 += info.info[0][item];
    }
    for (const item in info.info[1]) {
        sumStats2 += info.info[1][item];
    }
    if (sumStats1 > sumStats2) {
        return (
            <>{info.info[2]} win!</>
        );
    }
    else if (sumStats1 === sumStats2) {
        return (
            <>Draw!</>
        );
    }
    else {
        return (
            <>{info.info[3]} win!</>
        );
    }
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

export default App;
