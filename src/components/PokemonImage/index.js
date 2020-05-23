import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function PokeImage() {
    const [data, setData] = useState({ results: []});


    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/pokemon?offset=0&limit=150');
            const details = await Promise.all(response.data.results.map((res) => {
                return api.get(`/pokemon/${res.name}`)
            }));
            const results = details.map(res => ({
                image: res.data.sprites,
                name: res.data.name
            }));
            setData({results});

        };
        fetchData();
    }, []);


    return(
        <ul>
            {data.results.map(item => (
            <li><img src={item.image.front_shiny} />
            <img src={item.image.back_shiny} />
            <h2>Shiny {item.name}</h2></li>
            ))}
        </ul>
    )
}

export default PokeImage;