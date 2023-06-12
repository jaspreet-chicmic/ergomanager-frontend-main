import styles from "../styles/loader.module.scss"

export default function loader(){
    return(
        <div className={styles.loaderContainer}>
            <img src="/images/loading.svg"/>
            <div>Loading...</div>
        </div>
    )
}