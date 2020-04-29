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

    // Creating a new toy
    const newToyForm = document.querySelector(".add-toy-form")
    newToyForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let newToyName = (e.target.name.value)
      let newToyImg = (e.target[1].value)
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": newToyName,
          "image": newToyImg,
          "likes": 0
        })
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (toy) {
          let toyColDiv = document.querySelector("#toy-collection")
          console.log(toyColDiv)
          // Creating Card Div
          let toyDiv = document.createElement("div")
          toyDiv.className = "card"

          // Adding Name
          let toyName = document.createElement("h2")
          toyName.innerText = toy.name
          toyDiv.append(toyName)

          // Adding Image
          let toyImg = document.createElement("img")
          toyImg.src = toy.image
          toyImg.className = "toy-avatar"
          toyDiv.append(toyImg)

          //Adding Like Count
          let toyLikes = document.createElement("p")
          toyLikes.innerText = `${toy.likes} Likes`
          toyDiv.append(toyLikes)

          // Adding Like Button
          let likeBtn = document.createElement("button")
          likeBtn.innerText = "Like <3"
          likeBtn.className = "like-btn"
          toyDiv.append(likeBtn)

          // Like Button Behavior
          likeBtn.addEventListener("click", function () {
            toy.likes += 1
            toyLikes.innerText = `${toy.likes} Likes`
            fetch(`http://localhost:3000/toys/${toy.id}`, {
              method: "PATCH",
              headers:
              {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                "likes": toy.likes
              })
            })
          })
        // Appending each toy to the page
        toyColDiv.append(toyDiv)
        })
    })
  });

  // Genereating Existing Toys
  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then(function (toys) {
      toys.forEach(function (toy) {
        let toyColDiv = document.querySelector("#toy-collection")
        console.log(toyColDiv)
        // Creating Card Div
        let toyDiv = document.createElement("div")
        toyDiv.className = "card"

        // Adding Name
        let toyName = document.createElement("h2")
        toyName.innerText = toy.name
        toyDiv.append(toyName)

        // Adding Image
        let toyImg = document.createElement("img")
        toyImg.src = toy.image
        toyImg.className = "toy-avatar"
        toyDiv.append(toyImg)

        //Adding Like Count
        let toyLikes = document.createElement("p")
        toyLikes.innerText = `${toy.likes} Likes`
        toyDiv.append(toyLikes)

        // Adding Like Button
        let likeBtn = document.createElement("button")
        likeBtn.innerText = "Like <3"
        likeBtn.className = "like-btn"
        toyDiv.append(likeBtn)

        // Like Button Behavior
        likeBtn.addEventListener("click", function () {
          toy.likes += 1
          toyLikes.innerText = `${toy.likes} Likes`
          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: "PATCH",
            headers:
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              "likes": toy.likes
            })
          })
        })
        // Appending each toy to the page
        toyColDiv.append(toyDiv)
      })
    })
});