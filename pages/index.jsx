import Head from 'next/head'
import Image from 'next/image'
import Add from '../Firebase/add'
import styles from '../styles/Home.module.css'
import React from "react"
import Input from '../Components/Input'
import Media from '../Components/Media'
import { useForm } from "react-hook-form"
import Loader from 'react-loader-spinner'
import uploadAll from '../Firebase/uploadAll'
import axios from 'axios'



export default function Home() {
  const [user, setUser] = React.useState({name: "",date: "",tel :"" ,genre: "" })
  const handleChange = (e)=>{
    setUser(s => ({...s,[e.target.name]: e.target.value}))
  }
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isSubmitted, isValid } } = useForm({ mode: "onTouched"})
  const onSubmit = async (data) => {

    if (isValid) {



    }
  }

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Profil Pour Estuaire Emploie</title>
        <meta name="description" content="Créer votre profil estuaire emploie en quelques minutes" />
        <link rel="icon" href="/favicon.ico" />
        <link href="http://fonts.cdnfonts.com/css/sofia-pro" rel="stylesheet"/>

      </Head>

      <nav>

        <div className="logo"><img src="/logo.png" alt="logo" /> </div>
        <div className="text">Estuaire Services</div>

      </nav>

      <main className={styles.main}>
        <h1>Bienvenue à estuaire emploie!</h1>

        <p>
          <span className="error">Règle:</span> Lors du remplissage de ce fomulaire, les champs qui ne vous sont pas familier ou assez explicite veuillez marquer <u className="error">"aucun"</u>  à l'intérieur.
        </p>
        


        <App/>

       
      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
  )
}


export function Modal() {
  
  return (<>
    <div className="modalContainer">

   
    <p className="modal">
      Svp veuillez patienter que vos informations soient envoyés!! <br />
        <center>
        
         <Loader
        type="TailSpin"
        color="red"
        height={50}
        width={70}
      /></center>
    </p>
  
   </div>
  </>)
  
}


export  function App() {
  const { register, handleSubmit, formState: { errors,isValid } } = useForm({mode: "onTouched"});
  const [loader, setLoader] = React.useState(false)
  const [state, setState] = React.useState()
  const [state2, setState2] = React.useState()
  const [state3, setState3] = React.useState()
  const [state4, setState4] = React.useState()

  const onSubmit = data => {
    setState4(true)
  
    if (isValid && state.logoValue && state3.present && state2.files) {
      setLoader(true);
      axios.all([
      Add({ ...data, logo: data.tel + state.logoValue.name, files: [...state2.files].map(e => data.tel + e.name), present: data.tel + state3.present.name}),
      uploadAll(data.tel + state.logoValue.name, state.logoValue, "Profil/"),
      uploadAll(data.tel + state3.present.name, state3.present, "Profil/"),

      [...state2.files].forEach(e => uploadAll(data.tel + e.name,e,"Profil/")),

      ]).then(() => alert("Vous avez bien été enregisté")).catch(() => alert("une erreur est survenu")).finally(() => { setLoader(false);})
    
    }
    




  }
  console.log(errors);
  const handleImageChange = (e) => {
    const name = e.target.name
    const id = e.target.id

    if (e.target.files && e.target.files[0]) {


      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (ev) => {
        setState(s => {
          return {
            ...s,
            logo: ev.target.result,
            logoValue:  e.target.files[0],

          }
        });
      };

    }

  }


  const handleImageChange2 = (e) => {
    const name = e.target.name
    const id = e.target.id

    if (e.target.files && e.target.files[0]) {


      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (ev) => {
        setState2(s => {
          return {
            ...s,
            filesRes: ev.target.result,
            files:  e.target.files,

          }
        });
      };

    }

  }


  const handleImageChange3 = (e) => {
    const name = e.target.name
    const id = e.target.id

    if (e.target.files && e.target.files[0]) {


      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (ev) => {
        setState3(s => {
          return {
            ...s,
            pres: ev.target.result,
            present:  e.target.files[0],

          }
        });
      };

    }

  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
<div className="table">
        <span>
          Photo de profil
        </span>
        <Media photo onChange={handleImageChange} state={state} />
        {state4  && !state.logoValue &&  <span className="error">
Ce champs est réquis
        </span>}
      </div>

      <div className="table">
        <span>
          Nom complet
        </span>
        <input type="text" placeholder="Nom complet" {...register("nom", { required: true, maxLength: 80 })} />
{errors && errors.nom && <div className="error">
Ce champs est réquis
</div> }
      </div>
      <div className="table">
        <span>
          Date de naissance
        </span>
        <input type="date" {...register("naissance", { required: true, maxLength: 100 })} />
        {errors && errors.naissance && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Adresse mail
        </span>
        <input type="email" placeholder="Adresse mail" {...register("mail", { required: true, pattern: /^\S+@\S+$/i })} />
        {errors && errors.mail && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Numéro de téléphone
        </span>
        <input type="tel" placeholder="Numéro de téléphone" {...register("tel", { required: true, min: 600000000, max: 699999999 })} />
        {errors && errors.tel && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Qualification professionelle ou scolaire
        </span>
        <textarea placeholder="Qualification professionelle ou scolaire" {...register("Qualification", { required: true, max: 300 })} />
        {errors && errors.Qualification && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Sexe
        </span>
        <div className="df">  <input {...register("Sexe", { required: true })} type="radio" value="Masculin" id="Masculin" />  <label htmlFor="Masculin">Masculin</label></div>
       <div className="df"> <input {...register("Sexe", { required: true })} type="radio" value="Feminin" id="Feminin" /> <label htmlFor="Feminin">Feminin</label> </div>
        {errors && errors.Sexe && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Nombre d'années d'experience
        </span>
        <input type="number" placeholder="Nombre d'années d'experience" {...register("experience", { required: true, max: 45 })} />
        {errors && errors.experience && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Langue parlé ou ecrite
        </span>
        <input type="textarea" placeholder="Langue parlé ou ecrite" {...register("Langues", { required: true })} />
        {errors && errors.Langues && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
     <div className="df">
        <span>
          Type de salaire
        </span>
     
      <select {...register("Type de salaire", { required: true })}>
          <option value="journalier">Aucun</option>
          <option value="journalier">journalier</option>
        <option value="hebdomadaire">hebdomadaire</option>
        <option value="mensuel">mensuel</option>
        <option value="annuel">annuel</option>
      </select>
      </div>

      <div className="table">
        <span>
          Salaire
        </span>
        <input type="number" placeholder="Salaire" {...register("Salaire", { required: true })} />
        {errors && errors.Salaire && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
         Profession
        </span>
        <input type="text" placeholder="Profession" {...register("Profession", { required: true })} />
        {errors && errors.Profession && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Description de la profession
        </span>
        <input type="text" placeholder="Description de la profession" {...register("description_profession", { required: true })} />
        {errors && errors.description_profession && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Nom sur facebook
        </span>
        <input type="text" placeholder="Nom sur facebook" {...register("facebook", { required: true })} />
        {errors && errors.facebook && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Nom sur tiktok
        </span>
        <input type="text" placeholder="Nom sur tiktok" {...register("tiktok", { required: true })} />
        {errors && errors.tiktok && <div className="error">
          Ce champs est réquis
        </div>}

      </div>
      <div className="table">
        <span>
          Nom sur instagram
        </span>
        <input type="text" placeholder="Nom sur instagram" {...register("instagram", { required: true })} />
        {errors && errors.instagram && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Nom sur twitter
        </span>
        <input type="text" placeholder="Nom sur twitter" {...register("twitter", { required: true })} />
        {errors && errors.twitter && <div className="error">
          Ce champs est réquis
        </div>}
      </div>

     

      
      <div className="table">
        <span>
          Vidéo de présentation
        </span>
        <Media video onChange={handleImageChange3} state={state3} />
        {state4 && !state3.present && <span className="error">
          Ce champs est réquis
        </span>}
      </div>


      <div className="table">
        <span>
          Ville-Region-Pays
        </span>
        <textarea placeholder="Ville-Region-Pays" {...register("loc", { required: true })} />
        {errors && errors.loc && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Quartier
        </span>
        <input type="text" placeholder="Quartier" {...register("quartier", { required: true })} />
        {errors && errors.quartier && <div className="error">
          Ce champs est réquis
        </div>}
      </div>

      <div className="table">
        <span>
          Portfolio
        </span>
        <input type="text" placeholder="Portfolio" {...register("portfolio",{required: true} )} />
        {errors && errors.portfolio && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Différents Prix obtenu dans la vie
        </span>
        <textarea placeholder="Différents Prix obtenu dans la vie" {...register("price", { required: true })} />
        {errors && errors.price && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Différentes expériences
        </span>
        <input type="text" placeholder="Différentes expériences" {...register("diff", { required: true })} />
        {errors && errors.diff && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Différentes formations scolaire et extra-scolaire
        </span>
        <textarea placeholder="Différentes formations scolaire et extra-scolaire" {...register("form", { required: true })} />
        {errors && errors.form && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
 <div className="table">
        <span>
          Importer votre CV ou vos Attestations
        </span>
        <Media file onChange={handleImageChange2} state={state2}/>
        {state4 && !state2.files && <span className="error">
          Ce champs est réquis
        </span>}
</div>
    
      {loader && <Modal/>}
      
      <center> <button type="submit" className="btn df">  {loader && <Loader
        type="TailSpin"
        color="white"
        height={20}
        width={50}
      />}Envoyer</button></center>
    </form>
  );
}


