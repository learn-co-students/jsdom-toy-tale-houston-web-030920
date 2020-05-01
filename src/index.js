let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetch("http://localhost:3000/toys")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (result) {
      result.forEach((toy) => {
        createToys(toy);
      });
    });

  function createToys(toy) {
    let toyarray = document.querySelector("#toy-collection");
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

    toyarray.append(card);
  }

  addBtn.addEventListener("click", (e) => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";

      let otherForm = document.querySelector(".container");
      otherForm.addEventListener("submit", function (e) {
        newToy();
      });
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function addToy(newToy) {
    fetch("http://localhost:3000/toys", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: newToy.name,
        image: newToy.image,
        likes: 0,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        console.log(result);
        createToyCard(result);
      });
  }
});
