import { forwardRef } from 'react';
import styles from './Main.module.css';

function name(props, ref) {
    return (
        <>
            <section id="search" className={styles.search}>
                <h3>What do you need?</h3>
                <input type="search" ref={ref} name="search" id="search" placeholder="search" />
                <button onClick={props.onSearch}>🔍</button>
            </section>
        </>
    )
}

export default forwardRef(Search); //обвивам функцията за да взема референцията