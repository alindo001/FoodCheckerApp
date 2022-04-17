//https://world.openfoodfacts.org/

// URL to read data for a product: https://world.openfoodfacts.org/api/v0/product/[barcode].json

// Example: https://world.openfoodfacts.org/api/v0/product/011110038364.json



function getFetch(userInput){
  const inputVal = document.getElementById("barcode").value

  if(inputVal.length !==12){
    alert("Please make sure barcode is 12 digits")
    return;
  }
  const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if(data.status === 1){
            const item = new ProductInfo(data.product)
            item.showInfo()
            item.listIngredients()
        }else if(data.status === 0){
            alert(`Product ${inputVal} not found, please try another bar code`)
        }
        
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


class ProductInfo{
    constructor(productData){
        this.name = productData.product_name
        this.ingredients = productData.ingredients
        this.image = productData.image_url
    }
    testCall(){
        console.log(this.ingredients)
    }
    showInfo(){
        document.getElementById("product-img").src = this.image
        document.getElementById('product-name').innerText = this.name

    }
    listIngredients(){
        let tableRef = document.getElementById("ingredient-table")
        for(let key in this.ingredients){
            let newRow = tableRef.insertRow(-1)
            let newICell = newRow.insertCell(0)
            let newVCell = newRow.insertCell(1)
            let newIText = document.createTextNode(
                this.ingredients[key].text
            )
        let vegStatus = this.ingredients[key].vegetarian
        let newVText = document.createTextNode(vegStatus)
        newICell.appendChild(newIText)
        newVCell.appendChild(newVText)
        }
    }
}