  let linkcart="/0/cart"

  var set1 = new Set();
  $(()=>{
    // $('#cartlist').hide()
  
    let cart=document.getElementById('cart')
    setInterval(function(){cart.innerHTML=`<a class="navbar-brand" href=${linkcart}>
    <img class="d-inline cart" src="../assets/cart.png">Cart</a>`}, 1000)
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
          <div class="col-md-4 d-flex p-2">
            <div class="card mb-2"id="prod"> 
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
                <button onclick="btnclicked(${p.id})" id="${p.id}">Add to Cart</button>
                </div>
            </div>
          </div>
          
          `)
        )
      }
      for(let i=0;i<3;i++)
      {
        set1.add(parseInt(Math.random()*10)%3)
        // console.log(products[x].avatar);
        // $('#carousel-inner').append(
        //   $(`
        //   <div class="carousel-item">
        //   <img class="d-block w-100 crousel" src="${products[parseInt(Math.random()*10)%3].avatar}" alt="Second slide">
        //   </div>
        // `))
      }
      for (id of set1.values())
      {
        $('#carousel-inner').append(
          $(`
          <div class="carousel-item">
          <a href="/${products[id].id}/product">
          <img class="d-block w-100 crousel" src="${products[id].avatar}" alt="Second slide">
          </a>
          </div>
        `))
      }   
    })
  }
  // let pos=2
function btnclicked(product){

  linkcart=linkcart.substr(0,2) +"-"+`${product}`+ linkcart.substr(2)
  // $('#cartlist').show()
  document.getElementById(`${product}`).innerText="Added to Cart"
  // $('#cartvalue').append(`
  // <li>${product}</li>`)
}
var TRange=null;

function findString (str) {
 if (parseInt(navigator.appVersion)<4) return;
 var strFound;
 if (window.find) {

  // CODE FOR BROWSERS THAT SUPPORT window.find

  strFound=self.find(str);
  if (!strFound) {
   strFound=self.find(str,0,1);
   while (self.find(str,0,1)) continue;
  }
 }
 else if (navigator.appName.indexOf("Microsoft")!=-1) {

  // EXPLORER-SPECIFIC CODE

  if (TRange!=null) {
   TRange.collapse(false);
   strFound=TRange.findText(str);
   if (strFound) TRange.select();
  }
  if (TRange==null || strFound==0) {
   TRange=self.document.body.createTextRange();
   strFound=TRange.findText(str);
   if (strFound) TRange.select();
  }
 }
 else if (navigator.appName=="Opera") {
  alert ("Opera browsers not supported, sorry...")
  return;
 }
 if (!strFound) alert ("String '"+str+"' not found!")
 return;
}