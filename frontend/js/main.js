window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  let PORT = 3031;
  // Aqui debemos agregar nuestro fetch

  fetch(`http://localhost:${PORT}/api/movies`)
    .then(result=> result.json())
    .then(peliculas=>{
      /** Codigo que debemos usar para mostrar los datos en el frontend*/
    let data = peliculas.data;

    if(!localStorage.getItem("favoritas")){
      const favoritas = []

      localStorage.setItem("favoritas",JSON.stringify(favoritas))
    }


    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const bttn = document.createElement("button")
      bttn.innerHTML= "Favorita"
      bttn.setAttribute("class","botonAgregar")

      bttn.setAttribute("id",movie.id)

      let favoritas = JSON.parse(localStorage.getItem("favoritas"))

      if(favoritas.find(favorita=> favorita.id === movie.id)){
        
        bttn.classList.add("disabled")
      }

      bttn.addEventListener("click",e=>{
        
        let favoritas = JSON.parse(localStorage.getItem("favoritas"))
        if(!favoritas.find(favorita=> favorita.id === +e.target.id)){
          favoritas.push(movie)
          bttn.classList.add("disabled")

        }else{
          favoritas=favoritas.filter(favorita=>favorita.id !== +e.target.id)
          bttn.classList.remove("disabled")
        }

        
        localStorage.setItem("favoritas",JSON.stringify(favoritas))
      })

      
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);

      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      if (movie.length !== null) {
      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;
      card.appendChild(duracion);
      }
      card.appendChild(bttn);
    });
  
    })

  
};
