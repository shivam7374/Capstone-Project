function loadProductsbyId() {
    //   console.log("JS Loaded Successfully")
    let start, end
    start = (document.URL.search("46/") + 3)
    end = document.URL.search("/product")
    let id = parseInt(document.URL.slice(start, end))
    $.get('/api/myposts/'+id, (products) => {
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
                </div>
            </div>
          </div>
          
          `)
        )
      }
    })
  }
