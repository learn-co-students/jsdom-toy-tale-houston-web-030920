let addToy = false;
const allToys = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  let addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";

      let createNewToyForm = document.querySelector(".container");
      createNewToyForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addNewToy(e.target);
        console.log("this worked");
      });
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch(allToys)
    .then(function (response) {
      return response.json();
    })
    .then(function (toys) {
      toys.forEach((toy) => {
        createToyCard(toy);
      });
    });

  function createToyCard(toy) {
    let toyCollection = document.querySelector("#toy-collection");

    let card = document.createElement("div");
    card.setAttribute("class", "card");

    let toyH2 = document.createElement("h2");
    toyH2.innerText = toy.name;
    card.append(toyH2);

    let toyImg = document.createElement("img");
    toyImg.src = toy.image;
    toyImg.setAttribute("class", "toy-avatar");
    card.append(toyImg);

    let toyLikes = document.createElement("p");
    toyLikes.innerText = toy.likes;
    card.append(toyLikes);

    let likeButton = document.createElement("button");
    likeButton.setAttribute("class", "like-btn");
    likeButton.append("Like <3");
    card.append(likeButton);

    likeButton.addEventListener("click", function (e) {
      addALike(toy, toyLikes);
    });

    toyCollection.append(card);
  }

  function addNewToy(newToyInput) {
    fetch(allToys, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: newToyInput.name.value,
        image: newToyInput.image.value,
        likes: 0,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (toyObject) {
        console.log(toyObject);
        createToyCard(toyObject);
      });
  }

  function addALike(toy, toyLikesContainer) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: (toy.likes += 1),
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (like) {
        toyLikesContainer.innerText = toy.likes;
      });
  }
});
