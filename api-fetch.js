
const url = "https://reqres.in/api/users?delay=3";

const getUsersUsingAsyncAwait = async (url) => {

    const resolve = await fetch(url); 
    const objetoUsuarios = await resolve.json(); 
    console.log(objetoUsuarios); 
    const arregloUsuarios = objetoUsuarios.data;
    console.log(arregloUsuarios); 

    guardarDatosEnLocalStorage(arregloUsuarios);
    imprimirCartasEnElHtml( crearCardsDeUsuarios(arregloUsuarios) );

}


const crearCardsDeUsuarios = ( arregloUsuarios ) => {
return arregloUsuarios.map( usuarios => `    

<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${usuarios.avatar}" alt="Card image cap">
        <div class="card-body">
            <p class="card-title">ID: ${usuarios.id}</p>
          <h5 class="card-title">Nombre: ${ usuarios.first_name} ${usuarios.last_name}</h5>
          <p class="card-text">EMAIL: ${ usuarios.email}</p>
        </div>
      </div>
      
`  );
}

const imprimirCartasEnElHtml = ( arregloDeCartas ) => document.getElementById("user-cards").innerHTML= arregloDeCartas.join("");
 

const guardarDatosEnLocalStorage = (arregloDeUsuarios) => {

    const timestamp = new Date().getTime();
    const datosAGuardar = { usuarios: arregloDeUsuarios, hora: timestamp };
    localStorage.setItem("PrimerRequest", JSON.stringify(datosAGuardar));

}

const obtenerDatosDeLocalStorage = () => {
    

    const datosDeLocalStorage = JSON.parse(localStorage.getItem("PrimerRequest"));
    console.log(datosDeLocalStorage);

    const horaActual = new Date().getTime();
    console.log(horaActual);

    if (datosDeLocalStorage === null){ 
        getUsersUsingAsyncAwait(url);
        console.log("Creacion de cartas con URL primer visita");
    } else if(horaActual - datosDeLocalStorage.hora > 60000){
        getUsersUsingAsyncAwait(url);
        console.log("Creacion de cartas con URL tiempo mayor a 1 minuto");
        localStorage.removeItem("PrimerRequest");
    }else{
        imprimirCartasEnElHtml( crearCardsDeUsuarios(datosDeLocalStorage.usuarios) );
        console.log("Creacion de cartas con local storage");
    }
  
}

obtenerDatosDeLocalStorage();