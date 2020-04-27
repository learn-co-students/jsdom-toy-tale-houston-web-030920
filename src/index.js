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
});

// creates toy div#card
function createToyCard(toy) {
    let toyCollection = document.querySelector('#toy-collection')
    
    let cardHeading = document.createElement('h2')
    cardHeading.append(toy.name)
    
    let cardImg = document.createElement('img')
    cardImg.setAttribute('class', 'toy-avatar')
    cardImg.src = toy.image
    
    let cardParagraph = document.createElement('p')
    cardParagraph.append(`${toy.likes} Likes`)
    
    let cardButton = document.createElement('button')
    cardButton.setAttribute('class', 'like-btn')
    cardButton.append('Like <3')
    
    let toyDiv = document.createElement('div')
    toyDiv.setAttribute('class', 'card')
    toyDiv.append(cardHeading, cardImg, cardParagraph, cardButton)

    toyCollection.append(toyDiv)

    cardButton.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: toy.likes += 1
            })
        })
        .then(function(respose) {
            return respose.json()
        })
        .then(function(obj) {
            cardParagraph.innerHTML = `${obj.likes} Likes`
        })
    })
}

// gets all toys from db and renders them to the DOM
function getAllToys() {
    fetch('http://localhost:3000/toys')
        .then(function(response){
            return response.json()
        })
        .then(function(toys){
            toys.forEach(toy => {
                createToyCard(toy)
            })
        })
}

function addNewToy() {
    let inputs = document.getElementsByTagName('input')
    
    fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputs[0].value,
            image: inputs[1].value,
            likes: 0
        })
    })
    .then(function(response) {
        return response.json()
    })
   .then(function(obj) { 
        createToyCard(obj)
        inputs[0].value = ""
        inputs[1].value = ""
    })
}

// creates new toy when form is submitted
document.addEventListener('submit', function(e){
    addNewToy()
    e.preventDefault()
})

getAllToys()
