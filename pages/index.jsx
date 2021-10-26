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
          <span className="error">Règle:</span> Lors du remplissage de ce fomulaire, les champs qui ne vous sont pas familiés ou assez explicite veuillez marquer <u className="error">"aucun"</u>  à l'intérieur.
        </p>
        

        <center >
          <h2>Commencer à remplire</h2>
</center>
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
      Svp veuillez patienter que vos informations soient envoyées!! <br />
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


export function Modal2() {

  return (<>
    <div className="modalContainer">

      <p className="modal">
        <center><h1 style={{ color: "green" }}>Bravo</h1></center>

       Vos informations ont bien été enregistrés <br />
      

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
  const [state5, setState5] = React.useState()
  const [mod, setMod] = React.useState(false)

  const onSubmit = data => {
  
    if (isValid) {
      setLoader(true);
      axios.all([
        Add({ ...data, logo: state ? (data.tel + state.logoValue.name) : "aucun", files: state2 ? [...state2.files].map(e => data.tel + e.name) : "aucun", present: state3 ? (data.tel + state3.present.name) : "aucun", portfolio: state5 ? [...state5.portfolio].map(e => data.tel + e.name) : "aucun"}),
        state && uploadAll(data.tel + state.logoValue.name, state.logoValue, "Profil/"),
        state3 && uploadAll(data.tel + state3.present.name, state3.present, "Profil/"),

        state2 && [...state2.files].forEach(e => uploadAll(data.tel + e.name, e, "Profil/")),
        state5 && [...state5.portfolio].forEach(e => uploadAll(data.tel + e.name, e, "Profil/")),

      ]).then(() => setMod(true)).catch(() => alert("une erreur est survenu")).finally(() => { setLoader(false);})
    
    }
    


  }
 


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

  const handleImageChange8 = (e) => {
    const name = e.target.name
    const id = e.target.id

    if (e.target.files && e.target.files[0]) {


      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (ev) => {
        setState5(s => {
          return {
            ...s,
            portfolioRes: ev.target.result,
            portfolio: e.target.files,

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
         Importer une photo de profil
        </span>
        <Media photo onChange={handleImageChange} state={state} />
       
      </div>

      <div className="table">
        <span>
          Nom complet
        </span>
        <input type="text" placeholder="Exp: Fotie wilfried" {...register("nom", { required: true, maxLength: 80 })} />
{errors && errors.nom && <div className="error">
Ce champs est réquis
</div> }
      </div>
      <div className="table">
        <span>
          Date de naissance
        </span>
        <input type="text" placeholder="Exp: 18-03-1998 à Bafoussam"{...register("naissance", { required: true, maxLength: 100 })} />
        {errors && errors.naissance && <div className="error">
          Ce champs est réquis
        </div>}
      </div>

    
      <div className="table">
        <span>
          Adresse mail
        </span>
        <input type="email" placeholder="Exp: fotie@gmail.com ou Aucun" {...register("mail", {  pattern: /^\S+@\S+$/i })} />
        
      </div>
      <div className="table">
        <span>
          Numéro de téléphone
        </span>
        <input type="tel" placeholder="Exp: 678656770" {...register("tel", { required: true, min: 600000000, max: 699999999 })} />
        {errors && errors.tel && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table" >
        <span>
          Qualifications Scolaire
        </span>
        <table border="2px">
          <tr ><th colSpan="3">Diplome - Année - Ecole</th></tr>
          <tr>
            <td colSpan="3">
              <textarea placeholder="Bacc C  - 2019  - Lycéé bilingue de bafoussam" {...register("Qualification", { required: true, })} />
              
</td>
          </tr>
</table>
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
      <div className="table" >
        <span>
          Qualifications Professionelles
        </span>
        <table border="2px">
          <tr ><th colSpan="3">Attestation - Années - description</th></tr>
          <tr>
            <td colSpan="3">
              <textarea placeholder="Attestation Microsoft Word  - 2019  - pour apprendre à saisir correvtement." {...register("QualificationPro")} />
            </td>
          </tr>
        </table>

      </div>
      <div className="table">
        <span>
          Langue parlées
        </span>
        <input type="textarea" placeholder="Exp: français et anglais" {...register("LanguesParle", { required: true })} />
        {errors && errors.LanguesParle && <div className="error">
          Ce champs est réquis
        </div>}
      </div>

      <div className="table">
        <span>
          Langue écrites
        </span>
        <input type="textarea" placeholder="Exp: français et anglais" {...register("LanguesEcrites", { required: true })} />
        {errors && errors.LanguesEcrites && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
    

      <div className="table">
        <span>
          Prétention Salariale
        </span>
        <input type="text" placeholder="Exp: 60  0000 - 200 0000" {...register("Salaire", { required: true })} />
        {errors && errors.Salaire && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
         Profession (Pour les etudiants à temps plein écrire: stagiaire en spécialité)
        </span>
        <input type="text" placeholder="Exp: Stagiaire en marketing Exp2 : Développeur mobile" {...register("Profession", { required: true })} />
        {errors && errors.Profession && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Choix du métier que vous aimerer faire
        </span>
        <input type="text" placeholder="Exp: agronome" {...register("description_profession", { required: true })} />
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
          Portfolio( Image de vos réalisations ou certifications)
        </span>
       
        <Media photo mult onChange={handleImageChange8}  state={state5} />


      </div>
      <div className="table">
        <span>
          Différents Prix obtenu dans la vie
        </span>
        <textarea placeholder="Exp: Diplome de chant - 2021 - à l'église" {...register("price", { required: true })} />
        {errors && errors.price && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Différentes expériences
        </span>
        <textarea placeholder="Exp: Employer à Insam - 2012-2014 Exp2: Employer à Camlait - 2018-2020 " {...register("diff", { required: true })} />

        {errors && errors.diff && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
      <div className="table">
        <span>
          Différentes formations extra-scolaire
        </span>
        <textarea placeholder="Exp: Formation en marketing - 2021 - sur openclassrooms " {...register("form", { required: true })} />
        {errors && errors.form && <div className="error">
          Ce champs est réquis
        </div>}
      </div>
 <div className="table">
        <span>
          Importer votre CV
        </span>
        <Media file onChange={handleImageChange2} state={state2}/>
        
        
</div>
    
      {loader && <Modal />}
      {mod && <Modal2 />}
      
      <center> <button type="submit" className="btn df">  {loader && <Loader
        type="TailSpin"
        color="white"
        height={20}
        width={50}
      />}Envoyer</button></center>
    </form>
  );
}


