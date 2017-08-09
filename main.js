//selecting the .container class and calling it imageContainer
let imageContainer = document.querySelector(".container")
//selecting the .input class and calling it inputNode
let inputNode = document.querySelector(".input")
//placing EventListener on inputNode and specifying a keydown event, which is fired when a key is pressed down.
inputNode.addEventListener("keydown", function(event) {
  //13 is dealing with the ENTER key. Wait for input to === ENTER
  if (event.keyCode === 13) {
    //clears results on page with "..."
    imageContainer.textContent = "...";
    //store what is in the input field into the named variable, resultValue.
    let resultValue = event.target.value
    //starts fetch but concatenates the resultValue at the end of the URL. This is placed in a template literal. Can also use +resultValue. We set resultValue=event.target.value so that's what we are referencing for brevity.
      fetch(`http://recipepuppyproxy.herokuapp.com/api/?i=${resultValue}`)
      //Take the response then
      .then(function(response) {
        //convert response into JSON data
        return response.json()
      })
      //Run the function from previous .then method
      .then(function(parsed) {
        //set the imageContainer content to an emptpy string( clear it )
        imageContainer.textContent = "";
        //loop over the array of the parsed JSON results
        for (var i = 0; i < parsed.results.length; i++) {
          //put exact array content into variables to be used later
          const thumbnail = parsed.results[i].thumbnail
          const href = parsed.results[i].href
          const title = parsed.results[i].title
          const ingredients = parsed.results[i].ingredients
          //make template literal to be used for each result and placing the various elements into the created DIVS, H3 and IMG containers of the HTML skeleton.
          const template = `
          <div class="recipe">
            <h3>${title}</h3>
            <img src="${thumbnail}" alt="">
            <p>"${ingredients}"</p>
          </div>
          `
          // inserts the new child element inside but at the end of the imageContainer. insertAdjacentHTML does the same thing as insertInnerHTML
          imageContainer.insertAdjacentHTML('beforeEnd', template)
        }
      })
  }
})
