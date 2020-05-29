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
              <div class="card-body">
                <h5 class="card-title">${p.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${p.price}</h6>
                <p class="card-text">
                  ${p.company}
                </p>
                </div>
            </div>
          </div>
          
          `)
        )
      }
    })
  }
