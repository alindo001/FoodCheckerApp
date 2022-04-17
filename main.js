//https://world.openfoodfacts.org/

// URL to read data for a product: https://world.openfoodfacts.org/api/v0/product/[barcode].json

// Example: https://world.openfoodfacts.org/api/v0/product/737628064502.json
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(userInput){
  const choice = userInput
  const url = `https://world.openfoodfacts.org/api/v0/product/${choice}.json`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        // document.querySelector('img').src = data.hdurl
        // document.querySelector('h3').innerText = data.explanation
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
