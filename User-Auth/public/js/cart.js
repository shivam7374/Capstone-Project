$(()=>{
// let test=document.getElementById('test')
    test=document.URL
    let res1 = test.split("/0-");
//   document.getElementById("test").innerHTML = res1[1]
  let res2=res1[1].split('/')
//   document.getElementById('test').innerHTML=res2[0]
let res3=res2[0].split('-')
// document.getElementById('test').innerHTML=res3
let set = new Set(res3)
    // document.getElementById('test').innerHTML=set[0]
    console.log(set)
    console.log(res3)
    const iterator1 = set.values();

console.log(iterator1.next().value);
// expected output: 42

console.log(iterator1.next().value);
})