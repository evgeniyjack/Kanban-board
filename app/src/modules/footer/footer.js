function Footer({backlogScore, finishedScore, name}) {
    return (
        <footer>
            <div className="container">
                <div className="footer-container">
                    <div className="item">
                        <p>Active tasks: {backlogScore}</p>
                        <p>Finished tasks: {finishedScore}</p>
                    </div>
                    <div className="item">
                        <p>Kanban-board by {name}, {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;