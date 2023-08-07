import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const generateId = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 10000);
}

function List({setDataMock, title, issues, dataMock, index}) {
    const [addInput, setAddInput] = useState(false);
    const [titleItem, setTitleItem] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        (title !== 'Backlog' && dataMock[index - 1].issues.length === 0) && setDisabled(true);
        (title !== 'Backlog' && dataMock[index - 1].issues.length > 0) && setDisabled(false);
        title === 'Backlog' && setDisabled(false);
    }, [dataMock])

    const onMoveElement = (e, index) => {
        const newDataMock = [...dataMock]; 
        const findIndex = dataMock[index - 1].issues.findIndex(({name}) => name === e.target.value);
        const newItem = dataMock[index - 1].issues[findIndex];

        newDataMock[index - 1].issues.splice(findIndex, 1);
        newDataMock[index].issues.push(newItem);

        localStorage.setItem('data', JSON.stringify(newDataMock));
        setAddInput(false);
        setDisabled(false);
        setDataMock(newDataMock);
    }

    const onAddElement = () => {
        if (!dataMock.some(({ issues }) => issues.some(({ name }) => name.includes(titleItem))) && titleItem.trim().length > 0) {
            const newDataMock = [...dataMock]; 

            const newItem = {
                id: generateId(titleItem),
                name: titleItem,
                descriptions: ''
            }
    
            dataMock[0].issues.push(newItem);
            localStorage.setItem('data', JSON.stringify(newDataMock));
            setDataMock(newDataMock)
        }

        setTitleItem('');
        setAddInput(false);
    }

    return (
        <div className="list">
            <div className="title">{title}</div>
            <ul>
                {issues.map(({id, name}) => <li key={id}><Link to={`/item/${id}`}>{name}</Link></li>)}
                {
                    addInput && title === 'Backlog' ? 
                    <li><input value={titleItem} onChange={(e) => setTitleItem(e.target.value)} type="text" /></li> : null
                }
            </ul>
            {
                addInput && title !== 'Backlog' ? 
                <select onChange={(e) => onMoveElement(e, index)}>
                    <option></option>
                    {dataMock[index - 1].issues.map((item, i) => <option key={i}>{item.name}</option>)}
                </select> : null
            }
            {
                addInput ? 
                <button onClick={onAddElement} className="submit">Submit</button>
                : 
                (disabled ? 
                    <button disabled onClick={() => setAddInput(true)} className="add-card">+ Add card</button> :
                    <button onClick={() => setAddInput(true)} className="add-card">+ Add card</button>)
            }
        </div>
    )
}

export default List;