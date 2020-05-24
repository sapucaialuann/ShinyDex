import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './pokemonImage.css';

function PokeImage() {
    const [data, setData] = useState({ results: []});


    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/pokemon?offset=0&limit=27');
            const details = await Promise.all(response.data.results.map((res) => {
                return api.get(`/pokemon/${res.name}`)
            }));
            const results = details.map(res => ({
                image: res.data.sprites,
                name: res.data.name,
                id: res.data.id
            }));
            setData({results});

        };
        fetchData();
    }, []);


    return(
        <div className="cardsContainer">
            <ul className="pokemonBoard" >
                {data.results.map(item => (
                <li>
                    <div className="pokemonImages">
                        <img src={item.image.front_shiny} alt={item.name}/>
                        {/* <img src={item.image.back_shiny} /> */}
                    </div>
                    <div className="pokemonData">
                        <h2 className="pokedexNumber" >#{item.id}</h2>
                        <h2>{item.name}</h2>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default PokeImage;