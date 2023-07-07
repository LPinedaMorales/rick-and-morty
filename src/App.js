import './App.css';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route , useLocation, useNavigate} from 'react-router-dom';
import About from './components/About/About'
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
const email= "lucielvysjose@gmail.com"
const password = 'unaPassword'

function App() {
const [character , setCharacters] = useState([]);
const location = useLocation();
const [access, setAccess]= useState(false);

const navigate = useNavigate()
const login= (userData)=>{
   if (userData.password === password && userData.email === email) {
      setAccess(true);
      navigate('/home');
   }
};

useEffect(() => {
   !access && navigate('/');
 }, [access]);

function onSearch(id) {
   axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
      if (data.name) {
         setCharacters((oldChars) => [...oldChars, data]);
      } else {
         window.alert('¡No hay personajes con este ID!');
      }
   });
}
function randomHandler() {
   let haveIt = [];
   //Generate random number
   let random = (Math.random() * 826).toFixed();

   //Coerce to number by boxing
   random = Number(random);

   if (!haveIt.includes(random)) {
     haveIt.push(random);
     fetch(`https://rickandmortyapi.com/api/character/${random}`)
       .then((response) => response.json())
       .then((data) => {
         if (data.name) {
           setCharacters((oldChars) => [...oldChars, data]);
         } else {
           window.alert("No hay personajes con ese ID");
         }
       });
   } else {
     console.log("Ya agregaste todos los personajes");
     return false;
   }
 }

const onClose = (id)=>{
   setCharacters(
      character.filter((char)=>{
         return char.id !== Number(id)
      })
   )
};

   return (
   <div className='App'>
      <header className='App-header'>
      {
         location.pathname !== "/"
         ?<Nav onSearch={onSearch} random={randomHandler}/>
         : null
      }
      <Routes>
        
        <Route path='/' element={<Form login={login} />}/> 
        <Route path='/home' element={<Cards characters={character} onClose={onClose}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
      </Routes>
      
      </header>

   </div>
   );
}

export default App;
