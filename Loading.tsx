import styles from './styles/loadingDots.module.css'

function Loading(){
    return(
        <div className={styles.stage}>
            <div className={styles.dotFlashing}/>
        </div>
    )
}

export default Loading;