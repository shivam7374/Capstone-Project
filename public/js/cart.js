let set
$(()=>{
// let test=document.getElementById('test')
    test=document.URL
    let res1 = test.split("/0-");
//   document.getElementById("test").innerHTML = res1[1]
  let res2=res1[1].split('/')
//   document.getElementById('test').innerHTML=res2[0]
let res3=res2[0].split('-')
// document.getElementById('test').innerHTML=res3
res3=res3.sort()
set = new Set(res3)
    // document.getElementById('test').innerHTML=set[0]
    // console.log(set)
    // console.log(res3)
    // const iterator1 = set.values();

// console.log(iterator1.next().value);

// console.log(iterator1.next().value);
    // const iterator = set.values()
    // while(iterator!==null)
    // {
    //     console.log(iterator.next().value)
    // }
    for (id of set.values())
{     //document.write(item+",");
    //  document.getElementById('demo').innerHTML="The set value is: "+ item;
    console.log(id)
    $.get('/api/myposts/'+id, (products) => {
        console.log("++++++++++++++++++")
        console.log(products)
        console.log("++++++++++++++++++")
        for (let p of products) {
          // i=i+1
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
          $('#bill').append(
            $(`

    <tr>
    <th scope="row">${p.id}</th>
    <td>${p.name}</td>
    <td>${p.price}</td>
    <td>${p.company}</td>
    <td>${p.username}</td>
    </tr>
            `)
            )
          
        }

        let table = document.getElementById("table"), sumVal = 0;
            
        for(let i = 1; i < table.rows.length; i++)
        {
            sumVal = sumVal + parseInt(table.rows[i].cells[2].innerHTML);
        }
        
        document.getElementById("numberofitems").innerHTML = `<h2>You have added ${table.rows.length-1} products to your cart .</h2>`
        document.getElementById("totalamount").innerHTML = `<h2>Total Sum Value = Rs. ${sumVal}</h2>`
        console.log(sumVal);

        function generateHexString(length) {
          var ret = "";
          while (ret.length < length) {
            ret += Math.random().toString(16).substring(2);
          }
          return ret.substring(0,length);
        }
        
        // 40-/64-bit WEP: 10 digit key
        // alert("40-bit:" + generateHexString(10));
        
        // 104-/128-bit WEP: 26 digit key
        // alert("104-bit:" + generateHexString(26))
        document.getElementById('recieptid').innerText=generateHexString(26)
        
      
      })
} 

})


