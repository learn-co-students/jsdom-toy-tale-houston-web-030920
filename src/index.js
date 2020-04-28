let addToy = false;
const URL= "http://localhost:3000/toys";




document.addEventListener("DOMContentLoaded", () => {
let createToy= function(toys){
  console.log(toys)
  const toyCollection= document.querySelector('#toy-collection');
  let cardDiv= document.createElement('div');
  cardDiv.setAttribute("class","card");
  toyCollection.append(cardDiv)
  let name=document.createElement('h2')
  name.innerHTML=toys.name
  let img= document.createElement('img')
  img.src= toys.image
  img.style.width="100px"
  img.setAttribute("class","toy-avatar")
  let pTag=document.createElement("p")
  pTag.innerHTML=`${toys.likes} Likes`
  let button= document.createElement("button")
  button.setAttribute("class","like-btn")
  button.innerText= "Like <3"

  button.addEventListener('click',function(e){
    e.preventDefault();
    fetch(`http://localhost:3000/toys/${toys.id}`,{
      
    method:"PATCH",
      headers: 
      {
        "Content-Type": "application/json",
         Accept: "application/json"
      },
      
      body: JSON.stringify({
        "likes": toys.likes += 1
      })
    })
      .then(function(e){
        return e.json()
      })
      .then(function(e){
        pTag.innerHTML= `${e.likes} Likes` 
      })
  
   


  })
  cardDiv.append(name,img,pTag,button)
}



  fetch("http://localhost:3000/toys",{
    method:"GET"
  })
  .then(function(r){
  return r.json()
  })
  .then(function(toys){
    for(let i=0; i<toys.length; i++){
      createToy(toys[i]);
    }
    // render(toys);
  })


  

  const toyFormContainer = document.querySelector(".container");
  const addBtn = document.querySelector("#new-toy-btn");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      let form= document.querySelector(".add-toy-form")
      form.addEventListener("submit",function(e){
        e.preventDefault();
        let nameInput= document.querySelector(".name-input")
        let imageInput= document.querySelector(".image-input")
        fetch("http://localhost:3000/toys",{ 
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "name": nameInput.value,
            "image": imageInput.value,
            "likes": 0
          })

        })
          .then(function(response){
            return response.json();
          })

          .then(function(e){
            createToy(e);
          })
        })
      
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
