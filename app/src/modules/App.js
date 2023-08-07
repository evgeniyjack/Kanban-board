import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "../pages/main/main";
import Item from "../pages/item/item";
import Error from "../pages/Error/Error";
import '../css/style.css';

const name = 'Evgeniy';

const initialDataMock = [
    {
        title: "Backlog",
        issues: []
    },
    {
        title: "Ready",
        issues: []
    },
    {
        title: "In Progress",
        issues: []
    },
    {
        title: "Finished",
        issues: []
    }
];

function App() {
    const [backlogScore, setBacklogScore] = useState(0);
    const [finishedScore, setFinishedScore] = useState(0);
    const [dataMock, setDataMock] = useState(initialDataMock);

    const getScore = (id) => {
        return dataMock[id].issues.length;
    };

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('data'));
        if (storedData) {
            setDataMock(storedData);
        }
    }, []);

    useEffect(() => {
        setBacklogScore(getScore(0));
        setFinishedScore(getScore(3));
    }, [dataMock]);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main setDataMock={setDataMock} dataMock={dataMock} />} />
                <Route path="/item/:id" element={<Item dataMock={dataMock} setDataMock={setDataMock} />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer finishedScore={finishedScore} backlogScore={backlogScore} name={name} />
        </BrowserRouter>
    );
}

export default App;