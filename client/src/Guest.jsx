import Styles from "./Guest.module.css"

function Guest() {
    return (
        <div className={Styles.container}>
            <h1>This is Guest page</h1>
            <nav>
                <h1>let see</h1>
                <ul>
                    <li><a href="#">At</a></li>
                    <li><a href="#">At</a></li>
                </ul>
            </nav>
        </div>
        
    )
};

export default Guest;