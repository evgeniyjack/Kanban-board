import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

import Error from '../Error/Error';

import close from '../../img/close.svg';
import editIcon from '../../img/edit.svg';
import save from '../../img/save.svg';

function findIssueById(dataMock, id) {
    for (const { issues } of dataMock) {
        for (const issue of issues) {
            if (issue.id === +id) {
                return issue;
            }
        }
    }
    return null;
}

function Item({ dataMock, setDataMock }) {
    const [edit, setEdit] = useState(false);
    const [description, setDescription] = useState('');

    const { id } = useParams();

    const issue = findIssueById(dataMock, id);

    if (!issue) {
        return <Error />
    }

    const { name, descriptions } = issue;

    const onSaveText = () => {
        const newDataMock = [...dataMock];
        const dataItem = { i: -1, index: -1 };

        newDataMock.forEach((item, i) => {
            const index = item.issues.findIndex(issue => issue.id === +id);
            if (index !== -1) {
                dataItem.i = i;
                dataItem.index = index;
            }
        });

        const { i, index } = dataItem;

        if (i !== -1 && index !== -1) {
            newDataMock[i].issues[index].descriptions = description;
            localStorage.setItem('data', JSON.stringify(newDataMock));
            setDataMock(newDataMock);
            setEdit(false);
        }
    };

    return (
        <main>
            <div className="container">
                <div className="edit-data">
                    <div className="title">{name}</div>
                    {!edit && <p>{descriptions}</p>}
                    {edit && (
                        <textarea
                            autoFocus
                            placeholder="Type description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    )}
                    <div className='btns-item'>
                        {!edit ? <button className="edit" onClick={() => setEdit(true)}><img src={editIcon} alt="edit icon"/></button> 
                        : <button className="save" onClick={onSaveText}><img src={save} alt="save icon"/></button> }
                        <Link to={'/'} className="close-page">
                            <img src={close} alt="close" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Item;
