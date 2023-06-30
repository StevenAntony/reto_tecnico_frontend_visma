const API_URL = 'http://127.0.0.1:8000/api/';
const ENDPOINTS = {
        crearDivision : {method: 'POST', url: 'division'},
        listarDivision: {method: 'GET', url: 'division'},
    };

const crearDivision =async ( { itemNombre , itemDivisionSuperior, itemEmbajador, itemSubDivision } ) => {
    const api = ENDPOINTS.crearDivision;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        itemNombre,
        itemDivisionSuperior,
        itemEmbajador,
        itemSubDivision
      });

    const requestOptions = {
        method: api.method,
        headers: myHeaders,
        body: raw
      };

    const response = await fetch(`${API_URL}${api.url}`, requestOptions);
    const json = await response.json();
    
    return json;
}

const listarDivision = async () => {
    const api = ENDPOINTS.listarDivision;
    const requestOptions = {
        method: api.method
    };

    const response = await fetch(`${API_URL}${api.url}`, requestOptions);
    const json = await response.json();
    
    return json;
}

export {listarDivision, crearDivision};