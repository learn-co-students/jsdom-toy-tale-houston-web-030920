let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // createToy fucntion to create tags for each toy
  let createToy  = (newToy) => {
    let divTag = document.querySelector('#toy-collection')
    let toyDiv = document.createElement('div')
    toyDiv.setAttribute('class', 'card')
    divTag.append(toyDiv)

    let h2Tag = document.createElement('h2')
    h2Tag.innerHTML = newToy.name
    toyDiv.append(h2Tag)

    let imgTag = document.createElement('img')
    imgTag.src = newToy.image
    imgTag.setAttribute('class', 'toy-avatar')
    toyDiv.append(imgTag)

    let pTag = document.createElement('p')
    pTag.innerText = `${newToy.likes} Likes`
    toyDiv.append(pTag)

    let btnTag = document.createElement('button')
    btnTag.innerHTML = 'Like <3'
    btnTag.setAttribute('class', 'like-btn')
    toyDiv.append(btnTag)

    // increase toy likes when like button is click
    btnTag.addEventListener('click', ()=>{
      newToy.likes++
      fetch(`http://localhost:3000/toys/${newToy.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: newToy.likes
        })
      })
        .then(resp => resp.json())
        .then(obj => {
          pTag.innerText = `${newToy.likes} Likes`
        })
    })
  }

    // get all toys and render on page
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(obj => {
      obj.forEach(toy => {
        createToy(toy)
      })
    })
    .catch((error) => console.error("Error with fetch request", error))

    //create new toy and render on submit
    document.addEventListener('submit', (e)=>{
      e.preventDefault()

      let newToyName = e.target[0].value
      let newToyImage = e.target[1].value

      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:
        JSON.stringify({
          name: newToyName,
          image: newToyImage,
          likes: 0
        })
      })
      .then(resp => resp.json())
      .then(obj => createToy(obj))
      .catch((error) => console.error("Error with fetch request", error))
    })


});
