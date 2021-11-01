import React from 'react'
import styles from '../styles/Home.module.css'

function out() {
    const [notes, setNotes] = React.useState({})
    React.useEffect(() => {
        var note = JSON.parse(localStorage.getItem('note'));

        setNotes(note)
    }, [])
    
    
    return (
        <main className={styles.main}>
           

            <h1 className="su"> Félicitation !!!</h1>
            <p>
                Votre Evaluation c'est bien passé voici vos résultats
            </p>
            <center>
                <h2>Compétences Spécifique</h2>
                <center> <h1>{notes.trueSpe + " / " + notes.speNbr}</h1> </center>

                <h2>Compétences Générales</h2>
                <center> <h1>{notes.trueGen + " / " + notes.genNbr}</h1> </center>

            </center>
        </main>
    )
}

export default out






