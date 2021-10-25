import React, { useEffect, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"



const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    

function login() {
    const [login, setLogin] = React.useState()

    useIsomorphicLayoutEffect(() => {
        setLogin(localStorage.getItem('sudo'))

    },[login])
    return (
        <div>
             <main className={styles.main}>
                {login ? <Admin /> : <ControllerBuilder set={setLogin}/>}

            </main>
        </div>
    )
}

export default login



export function ControllerBuilder({set}) {

    const [loader, setLoader] = React.useState(false)
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onTouched" });
    const router = useRouter()

    const onSubmit = data => {

        if (isValid ) {
            setLoader(true);
            if (data.mail == "sudo" && data.naissance == 12345678) {
                localStorage.setItem("sudo", "sduolzs qsusqdbli suiusdqousqvdusqdvouisqdviusdqoiusd")
            set(true)
            } else {
                setLoader(false);
                alert("mot de passe incorrect")

            }
        }
    }
    
    return (
        <>

            <main className={styles.main}>

                <div >
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <center>  <a > Connexion </a></center>
                        <div className="table">
                            <span>
                                Name                            </span>
                            <input type="text" placeholder="nom" {...register("mail", { required: true})} />
                            {errors && errors.mail && <div className="error">
                                Ce champs est réquis
                            </div>}
                        </div>
    <div className="table">
        <span>
          Mot de passe
        </span>
        <input type="password" {...register("naissance", { required: true, maxLength: 100 })} />
        {errors && errors.naissance && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      


                        <div className={styles.dfss}>
                            <center>  <button disabled={loader} className="dfss btn" >
                                {loader && <Loader
                                    type="TailSpin"
                                    color="white"
                                    height={20}
                                    width={50}
                                />}

                                Enregistrer</button></center>
                        </div>


                    </form>
                </div> </main>

        </>
    )

}


export function Admin() {
    return (<>
   <h1>Liste des contacts</h1>
        <table border="1px">
            <tr>
                <td>Tel</td>
            <td> <button className="btn">Voir le profil</button> </td>
            </tr>
        </table>




    </>)
}