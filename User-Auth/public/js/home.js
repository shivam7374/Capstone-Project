  let linkcart="/0/cart"
  
  $(()=>{
    let cart=document.getElementById('cart')
  setInterval(function(){cart.innerHTML=`<a class="navbar-brand" href=${linkcart}>Cart</a>`}, 1000)
  })
  
  
  function loadProducts() {
    //   console.log("JS Loaded Successfully")
    $.get('/product', (products) => {
      console.log("++++++++++++++++++")
      console.log(products)
      console.log("++++++++++++++++++")
      for (let p of products) {
        $('#products-container').append(
          $(`
          <div class="col-4">
            <div class="card m-2"> 
            <a href="/${p.id}/product">
            <img src="${p.avatar}" class="card-img-top">
            </a>
              <div class="card-body">
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text">
                  ${p.company}
                </p>
                <h6 class="card-subtitle mb-2 text-muted">Rs. ${p.price}</h6>
                <h6 class="card-subtitle mb-2 text-muted">${p.username}</h6>
                <button onclick="btnclicked(${p.id})">Addtocart</button>
                </div>
            </div>
          </div>
          
          `)
        )
      }
    })
  }
  let pos=2
function btnclicked(product){
  $('#cartvalue').append(`
  <li>${product}</li>`)
  linkcart=linkcart.substr(0, pos) + `${product}` + linkcart.substr(pos)
  pos=pos+length(`${product}`)
}