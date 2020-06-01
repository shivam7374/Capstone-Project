const { Router } = require('express')
const route = Router()
const{ Products }=require('../../db')
const{Op}=require('sequelize')


route.get('/:id', async (req, res) => {
    // console.log("****************")
    // console.log(req.params.id)
    // console.log("****************")
  const myposts = await Products.findAll({
    where: {id:req.params.id
    }
}
      )
  console.log("****************++++++++++++++")
    console.log(myposts)
    console.log("****************++++++++++++")
  res.status(200).send(myposts)
  // res.render(myposts)
})
 
module.exports = {
  mypostsRoute: route
}