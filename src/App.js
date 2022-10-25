import logo from './logo.svg';
import './App.css';
import { useState, useReducer, useEffect } from "react"
import axios from 'axios' // npm install axios , jos ei ole jo ladattu
 
function reducer(state, action) {
  switch (action.type) {
    case 'VITSIN_HAKU_ALOITETTU':
      console.log("Vitsin haku aloitettu")
      return { ...state, vitsinHakuAloitettu:true};
    case 'VITSI_HAETTU':
      console.log("Vitsi haettu")
      return {...state, vitsi: action.payload.vitsi, vitsiHaettu:true};      
    case 'VITSIN_HAKU_FAIL':
      console.log("Vitsin haku epäonnistui!")
      return { ...state, vitsinHakuFail:true, vitsinHakuAloitettu:false};
    default:
      throw new Error();    
  }
}


  function AppChuck() {
    const [appData, dispatch] = useReducer(reducer, { 
      vitsi: "", 
      vitsinHakuAloitettu:false, 
      vitsiHaettu:false,
      vitsinHakuFail:false});

    useEffect(() => {
      async function haeVitsi() {
      try {
        dispatch({ type: 'VITSIN_HAKU_ALOITETTU'});
        let result = await axios('https://api.chucknorris.io/jokes/random');
        console.log(result.data.values);
        dispatch({ type: 'VITSI_HAETTU', payload: result.data.values });
        console.log(result.data.values);
      } catch (error) {
        console.log('Chuck Norris ei mokaa. Sinä mokasit: ', error);
        dispatch({type: 'VITSIN_HAKU_FAIL'});
      }
    }
    

       if (appData.vitsinHakuAloitettu){
        
         haeVitsi();
         
      } 
    }, [AppChuck.vitsinHakuAloitettu]);
  
  return (
    
    <div className = "main_background">
      <h1> Chuck Norris - faktoja</h1>
 
      <button onClick={()=> dispatch({ type: "VITSIN_HAKU_ALOITETTU"})}>Vitsivitsi</button>
      <p>{appData.vitsi}</p>
      {appData.vitsinHakuAloitettu && "Noudetaan vitsi"}
      {appData.vitsinHakuFail && "Vitsin haku kippasi!"}
    </div>
  );
  }

export default AppChuck;