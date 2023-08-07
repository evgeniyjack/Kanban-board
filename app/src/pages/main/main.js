import List from "../../modules/list/list";

function Main({setDataMock, dataMock}) {
    const kanbanLists = dataMock.map(({title, issues}, i) => <List setDataMock={setDataMock} title={title} issues={issues} index={i} dataMock={dataMock} key={i} />)

    return (
        <main>
            <div className="container">
                <div className="kanban-container">
                    {kanbanLists}
                </div>
            </div>
        </main>
    );
}

export default Main;