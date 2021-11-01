import { collection, getDocs, query, where } from '@firebase/firestore'
import React, { useEffect, useLayoutEffect } from 'react'
import { db } from '../Firebase'
import styles from '../styles/Home.module.css'
import Head from "next/head"
import { useForm } from 'react-hook-form'
import { stringify } from '@firebase/util'
import Loader from 'react-loader-spinner'
import Add from '../Firebase/addMerge'
import { useRouter } from 'next/router'





const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;



function login({ slug, values2, values, id, values3}) {
    const [login, setLogin] = React.useState()

    useIsomorphicLayoutEffect(() => {
        setLogin(localStorage.getItem('userToken'))

    }, [login])
    return (
        <div>
            <Head>
                <title>Evaluation {slug}</title>
                <meta name="description" content={"Évaluation" + slug + "Cette évaluation vous permetra de "} />
                <link rel="icon" href="/favicon.ico" />
                {/* <link href="http://fonts.cdnfonts.com/css/sofia-pro" rel="stylesheet" /> */}

            </Head>
            <main className={styles.main}>
                {login ? <Controller slug={slug} set={setLogin} values2={values2} values={values} id={id} /> : <ControllerBuilder set={setLogin} slug={slug} values={values} values3={values3}/>}

            </main>
        </div>
    )
}

export default login



export function ControllerBuilder({ set, slug, values3,values}) {

    const [loader, setLoader] = React.useState(false)
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onTouched" });
    const router = useRouter()

    const onSubmit = data => {

        if (isValid) {
            setLoader(true);
           
            Add({ ...data }, "userQuestionnaire", values.length.toString()).then(() => {
                
                localStorage.setItem("userToken", data)
                setLoader(false)
                set(true)
            }).catch(() => setLoader(false))

            // router.push("/" + data.speciality + "?id=" + 0  )
              
        
           
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
                                Nom Complet                            </span>
                            <input type="text" placeholder="nom" placeholder="Exp: Tagne Jean Pafait" {...register("nom", { required: true })} />
                            {errors && errors.nom && <div className="error">
                                Ce champs est réquis
                            </div>}
                            
                        </div>
                        <div className="table">
                            <span>
                               Téléphone 
                            </span>
                            <input type="number" placeholder="Exp: 678624561" {...register("tel", { required: true, maxLength: 9, minLength: 9  })} />
                            {errors && errors.tel && <div className="error">
                                Ce champs est réquis
                            </div>}
                           
                        </div>

                             <span>
                               Spécialité 
                        </span>
                        <div className="table">
                            <select defaultValue={slug} {...register("speciality", { required: true })}>

                            {values3.map((e, k) => <option key={k} value={e.name}>{e.name}</option>)}
                        </select>
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

export function Controller({  slug,values2,values,id }) {

    let data = values2
    let router =  useRouter()
    const [loader, setLoader] = React.useState(false)
    const [state, setState] = React.useState(false)
    const handleChange = (e) => {
       setState(s=> ({...s,[e.target.name]: e.target.value}) )
   }
  
    const onSubmit = e => {
        e.preventDefault()
        let simState = []
        for (const property in state) {
            simState.push(property)
           
        }
        
        if (simState.length == data.length) {
            setLoader(true)
            Add({ ...state, spe_id: parseInt(id, 10) }, "userQuestionnaire", values.length.toString()).then(() => {
                setLoader(false)
                let note = []
                let note2 = []
                localStorage.removeItem("userToken")

                for (const s in state) {
                    if (state[s] == "Oui") {
                        data.forEach(val => {
                            
                            if (val.type == "Objectifs Spécifiques" && val.name == s) {
                                note.push(state[s])
                            } else if (val.type == "Objectifs Généraux" && val.name == s){
                                note2.push(state[s])
                            }
                        }) 
                        

                    } 

                }

                localStorage.setItem("note", JSON.stringify({speNbr: data.filter(e => e.type == "Objectifs Spécifiques").length, genNbr: data.filter(e => e.type == "Objectifs Généraux").length, trueSpe: note.length, trueGen: note2.length}))
             


                router.push("/out")

            }).catch(() => { alert("error"); setLoader(false) })


        } else {
            alert("Veuillez répondre à toutes les questions")

        }

    
    }
    return (
        
            <div className={styles.container}>
                
                <nav>

                    <div className="logo"><img src="/logo.png" alt="logo" /> </div>
                    <div className="text">Estuaire Services</div>

            </nav>
            
            <center> <h1>Questionnaire {slug.toUpperCase()}</h1></center>
            <main className={styles.main}>
                <div>Nb: Veuillez être honnête lors du remplissage de ce formulaire! il nous permetrra de vous preparer une formation apte à vos lacunes</div>

                <form onSubmit={onSubmit}>
           <h2>Objectifs Spécifiques</h2>

                    {data.filter(e => e.type == "Objectifs Spécifiques").map((e, j) => <div key={e.name + j}>
   
                    <div className="table">
                        <div>
                           {e.name}    
                    </div>
                        <div>
                                <div className="df">  <input name={e.name} onChange={handleChange} value={state[e.name]} type="radio" value="Oui" id={j + e.name + "oui"} />  <label htmlFor={j + e.name + "oui"}>Oui</label></div>
                                <div className="df"> <input name={e.name} onChange={handleChange} value={state[e.name]} type="radio" value="Non" id={j + e.name + "non"} /> <label htmlFor={j + e.name + "non"}>Non</label> </div>
                         
                    </div>
                    </div>
                 
                
                </div>)}

                     <h2>Objectifs Généraux</h2>

                    {data.filter(e => e.type == "Objectifs Généraux").map((e, j) =>
                        <div key={e.name + j} className="table">
                            <div>
                                {e.name}
                            </div>
                            <div>
                                <div className="df">  <input name={e.name} onChange={handleChange} value={state[e.name]} type="radio" value="Oui" id={j + e.name + "oui"} />  <label htmlFor={j + e.name + "oui"}>Oui</label></div>
                                <div className="df"> <input name={e.name} onChange={handleChange} value={state[e.name]} type="radio" value="Non" id={j + e.name + "non"} /> <label htmlFor={j + e.name + "non"}>Non</label> </div>
                               
                            </div>
                      
                 
                
                </div>)}
                    <center> <button className="btn" >{loader && <Loader
                        type="TailSpin"
                        color="white"
                        height={20}
                        width={50}
                    />}Enregistrer</button> </center>
                </form>
          
              </main> 
        </div>
    )
}





export async function getServerSideProps( context ) {

    const slug = context.params.slug
    const id = context.query.id || -1
    let values2 = []
    let values = []


    let values3 = []


    const querySnapshot3 = await getDocs(collection(db, "speciality"));
    querySnapshot3.forEach((doc) => {

        values3.push({ id: doc.id, ...doc.data() })
    });


    const querySnapshot = await getDocs(collection(db, "userQuestionnaire"));
    querySnapshot.forEach((doc) => {

        values.push({ id: doc.id, ...doc.data() })
    });
   
  
    const q = query(collection(db, "questionnaire"), where("spe_id", "==", parseInt(id, 10)));
    const querySnapshot2 = await getDocs(q);
    querySnapshot2.forEach((doc) => {
        values2.push({ id: doc.id, ...doc.data() })

      
    });

    return {
        props: {

            values2,
            slug,
            values,
            values3,
            id



        },
    };



}