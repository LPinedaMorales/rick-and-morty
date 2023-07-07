import axios from "axios";
import {Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Detail = ()=>{
    const {id}= useParams();
    const [character, setCharacter]= useState({});

    useEffect(() => {
        axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
    }, [id]);

    return(
        <div>
            <h1>Name :{character.name} </h1>
            <h1>Status:{character.status}</h1>
            <h1>Species:{character.species}</h1>
            <h1>Gender:{character.gender}</h1>
            <h1>Origin:{character.origin?.name}</h1>
            <img src={character.image} alt={character.name} />
        
            

        </div>
    )
};
export default Detail;