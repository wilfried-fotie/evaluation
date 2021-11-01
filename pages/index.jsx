import Head from 'next/head'
import Add from '../Firebase/add'
import getDocFunc from '../Firebase/getDocFunc'
import styles from '../styles/Home.module.css'
import React, { useEffect, useLayoutEffect } from "react"
import Media from '../Components/Media'
import { useForm } from "react-hook-form"
import Loader from 'react-loader-spinner'
import uploadAll from '../Firebase/uploadAll'
import axios from 'axios'
import { ControllerBuilder } from './login'
import { db } from '../Firebase'
import { collection, getDocs, query, where } from '@firebase/firestore'
import updateDocument from '../Firebase/updateDoc'
import deleteDocument from '../Firebase/deleteDoc'
import fetchDocuments from '../Firebase/fetchDocuments'
import { createPortal } from 'react-dom'



const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const SPECONTEXT = React.createContext({})

function login({ values, values2}) {
  const [login, setLogin] = React.useState()

  useIsomorphicLayoutEffect(() => {
    setLogin(localStorage.getItem('sudo'))

  }, [login])



  const speReducer = React.useCallback((state, action) => {
    switch (action.type) {

       case "ADD":
                const newState = [...state[action.pre]]
                newState.push({ ...action.data })
                let finish = { ...state, [action.pre]: newState}
                return finish

                
            case "DELETE":
                const delState = [...state[action.pre]]

                let num = action.id
                delState.splice(num, 1)
                finish = { ...state,  [action.pre]: delState  }
                return finish
            case "UPDATE":
                const upState = [...state[action.pre]]
                upState[action.id] = action.data
                finish = { ...state, [action.pre]: upState  }
                return finish
       

     
    }

  }, [])







  const [data, dispacth] = React.useReducer(speReducer, { values, values2})




  const value = React.useMemo(() => ({ data, dispacth }), [data, dispacth])
  const [page,setActivePage] = React.useState(1)


  return (
    <div>
      <main className={styles.main}>
        {login ? <SPECONTEXT.Provider value={value}>{page == 1 ? <Home setActivePage={setActivePage} /> : <Page2 info={page} setActivePage = { setActivePage }/>} </SPECONTEXT.Provider>  : <ControllerBuilder set={setLogin} />}

      </main>
    </div>
  )
}

export default login


export function Home({setActivePage}) {
  const [user, setUser] = React.useState({spe: ""})
  const [v, setV] = React.useState(false)
  const [index, setIndex] = React.useState(false)
  const [loader, setLoader] = React.useState(false)

  const data = React.useContext(SPECONTEXT).data.values
  const data2 = React.useContext(SPECONTEXT).data.values2
  const dispacth = React.useContext(SPECONTEXT).dispacth
let spe = data
  var len = 0
spe.forEach(()=> len++)
 
 
  const handleChange = (e) => {
    setUser(s => ({ ...s,id: len == 0 ? parseInt(0,10) : parseInt(spe[len - 1].id, 10) + 1 , spe: e.target.value}))
  }
 
  const handleClick = () => {
    if (user.spe) {
     
      
      Add({ name: user.spe }, "speciality", len.toString())
      dispacth({ type: "ADD", name: "data", pre: "values", data: { name: user.spe, id: len == 0 ? parseInt(0, 10) : parseInt(spe[len - 1].id, 10) + 1 }})
      setUser({ spe: "" })

    } else {
      alert("erreur avec cette valeur")
    }
  }
  const handleUpdate = (index) => {
    setV(true)
    setIndex(index)
  }
  const handleDelete = async(index) => {

    const q = query(collection(db, "questionnaire"), where("spe_id", "==", parseInt(index, 10)));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     
      // console.log(doc.id, " => ", doc.data());
      console.log({ id: doc.id, ...doc.data() })
      deleteDocument("questionnaire", doc.id.toString()).then(() => 
        dispacth({ type: "DELETE", id: parseInt(data2.indexOf({ id: doc.id, ...doc.data() }), 10), pre: "values2" })

      ).catch(e => alert("erreur"))
    });


    deleteDocument("speciality", index).then(e =>

      dispacth({ type: "DELETE", id: index, pre: "values" })
    ).catch(e => alert("erreur"))
   
   


  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Evaluation</title>
        <meta name="description" content="Créer votre profil estuaire emploie en quelques minutes" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link href="http://fonts.cdnfonts.com/css/sofia-pro" rel="stylesheet" /> */}

      </Head>
      <nav>

        <div className="logo"><img src="/logo.png" alt="logo" /> </div>
        <div className="text">Estuaire Services</div>

      </nav>
      <main className={styles.main}>
        <h1>Evaluation estuaire emploie!</h1>
        <div className="table">
          <span>
            Nom de la spécialité
          </span>
          <input type="text" value={user.spe} placeholder="Exp: cge" onChange={handleChange} />

        </div>
        <center> <button className="btn" onClick={handleClick}>Ajouter</button> </center>
        <center> <h2>Liste des spécialités</h2> </center>
        <table>
          <tbody>
            {spe.map((e, k) => <tr key={k}><td>{e.name || e.spe}</td><td><button className="btn" onClick={() => setActivePage(e)}>Questionnaire</button><button className="btn" onClick={() => handleUpdate(e.id || k)}>Modifier</button><button className="err" onClick={() => handleDelete(e.id || k)}>
              supprimé</button></td></tr>)}

          </tbody>

        </table>


        {v && <Modal data={spe[index]} v={setV} id={index}/>}
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export function Page2({ setActivePage, info }) {
  const [user, setUser] = React.useState(false)
  const [visible, v] = React.useState(false)
  const [dataValue, setDataValues] = React.useState()
  const data = React.useContext(SPECONTEXT).data.values2
  const dispacth = React.useContext(SPECONTEXT).dispacth

  const handleDelete = (index) => {



    deleteDocument("questionnaire", index).then((e) => 
       dispacth({ type: "DELETE", id: parseInt(info.id, 10), pre: "values2" })
    
    

    ).catch(e => alert("erreur"))
    
}

  const handleUpdate = (id, v) => {
    v(true)
    setDataValues(id)
    
  }





  return (<>
    <a className="btn" onClick={() => setActivePage(1)}>Retour</a>
    <a className="btn" onClick={() => navigator.clipboard.writeText("https://evaluation-ten.vercel.app/" + info.name  + "?id=" + info.id ) }>Copier le lien</a>
    
    <center> <h1>Questionnaire {info.name}</h1></center>
    <center> <button className="btn" onClick={() => setUser(true)}>Ajouter une question</button> </center>
    <center> <h2>Liste des questions</h2> </center>
    <table>
      <tbody>
        <tr><td colSpan={2}>  <h5>Objectifs Spécifiques</h5></td></tr>
      
        {data.filter(e => e.spe_id == info.id && e.type == "Objectifs Spécifiques").map((e, j) => <tr key={j}><td>{e.name}</td><td><button onClick={() => handleUpdate(e.id, v )} className="btn">Modifier</button><button className="err" onClick={() => handleDelete(e.id )}>
          supprimé</button></td></tr>)}
        
        <tr><td colSpan={2}> <h5>Objectifs Généraux</h5></td></tr>

        {data.filter(e => e.spe_id == info.id && e.type == "Objectifs Généraux").map((e, j) => <tr key={j}><td>{e.name}</td><td><button onClick={() => handleUpdate(e.id, v )} className="btn">Modifier</button><button className="err" onClick={() => handleDelete(e.id )}>
          supprimé</button></td></tr>)}

      </tbody>
   </table>
   
    


    {user && <Modal2 v={setUser} info={info} />}
    {visible && <Modal3 v={v} info={info} dataValue={data.filter(e => e.id == dataValue)}/>}

  </>)
}


export function Modal({ data,v,id }) {
  const [user, setUser] = React.useState(data && data.name )
  const dispacth = React.useContext(SPECONTEXT).dispacth
const [loader, setLoader] = React.useState(false)
  const handleChange = (e) => {
    setUser(e.target.value)
  }
  const handleUpdate = () => {
    setLoader(true)
    updateDocument("speciality", { name: user }, id.toString()).then(e => {
      dispacth({ type: "UPDATE", name: "data", id: id, pre: "values", data: { name: user, id: id } })

v(false)

    }).catch(e=>alert("une erreur est survenu")    )
  }
  return createPortal(<>
    <div className="modalContainer" onClick={() => v(false)}>

      <p className="modal" onClick={(e)=>{e.stopPropagation()}}>
        <span>
            Nom de la spécialité
          </span>
          <input type="text" value={user} placeholder="Exp: cge" onChange={handleChange} />

        
        <center> <button className="btn" onClick={handleUpdate}>{loader && <Loader
          type="TailSpin"
          color="white"
          height={20}
          width={50}
        />}Enregistrer</button> </center>
          
      
      </p>
      </div>
    
    </>, document.body)

}


export function Modal2({ v, info}) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onTouched" });
  const [loader, setLoader] = React.useState(false)

  const data = React.useContext(SPECONTEXT).data.values2
  const dispacth = React.useContext(SPECONTEXT).dispacth
  let spe = data
  var len = 0
  spe.forEach(() => len++)
  const onSubmit = data => {
setLoader(true)
    if (isValid) {
     
      Add({ ...data, spe_id: parseInt(info.id,10) }, "questionnaire", len.toString())
      dispacth({ type: "ADD", name: "data", pre: "values2", data: { ...data, spe_id: info.id, id: len == 0 ? parseInt(info.id, 10) : parseInt(spe[len - 1].id, 10) + 1 } })
v(false)
    }
  }
  return createPortal(<>
    
    <div className="modalContainer" onClick={() => v(false)}>

      <div className="modal" onClick={(e) => { e.stopPropagation() }}>
        <center><h4 > Ajouter une question</h4></center>
        

    <form onSubmit={handleSubmit(onSubmit)}>

        <div className="table">
          <span>
              Nom de l'objectif
          </span>
            <input type="text" placeholder="Exp: apprendre à lire"  {...register("name", { required: true})} />
  {errors && errors.name && <div className="error">
            Ce champs est réquis
          </div>}
        </div>
        <div className="table">
          <span>
           Type
          </span>

            <select {...register("type", { required: true })} >

              <option value="Objectifs Spécifiques">Objectif Spécifique</option>
              <option value="Objectifs Généraux">Objectif Généraux</option>
            </select>
            

        
        </div>
          <center> <button className="btn" >{loader && <Loader
            type="TailSpin"
            color="white"
            height={20}
            width={50}
          />}Enregistrer</button> </center>

      
</form>

      </div>

    </div>
  </>,document.body)

}



export function Modal3({ v, info,dataValue }) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onTouched",defaultValues: dataValue[0] });
  const [loader, setLoader] = React.useState(false)

  const dispacth = React.useContext(SPECONTEXT).dispacth
  
  const onSubmit = data => {
    setLoader(true)
    if (isValid) {

      updateDocument("questionnaire", data, dataValue[0].id.toString()).then(e => {
        dispacth({ type: "UPDATE", name: "data", id: dataValue[0].id, pre: "values2", data: data })

        v(false)

      }).catch(e => alert("une erreur est survenu"))
    }
  }
  return createPortal(<>

    <div className="modalContainer" onClick={() => v(false)}>

      <div className="modal" onClick={(e) => { e.stopPropagation() }}>
        <center><h4 > Ajouter une question</h4></center>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="table">
            <span>
              Nom de l'objectif
            </span>
            <input type="text" placeholder="Exp: apprendre à lire" {...register("name", { required: true })} />
            {errors && errors.name && <div className="error">
              Ce champs est réquis
            </div>}
          </div>
          <div className="table">
            <span>
              Type
            </span>

            <select {...register("type", { required: true })} >

              <option value="Objectifs Spécifiques">Objectif Spécifique</option>
              <option value="Objectifs Généraux">Objectif Généraux</option>
            </select>



          </div>
          <center> <button className="btn" >{loader && <Loader
            type="TailSpin"
            color="white"
            height={20}
            width={50}
          />}Enregistrer</button> </center>


        </form>

      </div>

    </div>
  </>, document.body)

}



export async function getServerSideProps({ query }) {

  let values = []
  let values2 = []


  const querySnapshot = await getDocs(collection(db, "speciality"));
  querySnapshot.forEach((doc) => {

    values.push({ id: doc.id, ...doc.data() })
  });

  const querySnapshot2 = await getDocs(collection(db, "questionnaire"));
  querySnapshot2.forEach((doc) => {

    values2.push({ id: doc.id, ...doc.data() })
  });

  return {
    props: {

      values,
      values2
      



    },
  };



}