// const http=require('http')

const express=require('express')
const session=require('express-session')
// const socketio=require('socket.io')

const app=express()

// const server=http.createServer(app)
// const io=socketio(server)// to work with socket on server named server
// // it includes a js file at path /socket.io/socket.io.js


const{ db,Users,Products }=require('./db')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', express.static(__dirname + '/public'))
// app.use('/sock', express.static(__dirname + '/node_modules'))
// makes this folder available to public


app.set('view engine','hbs')
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'bsdhuiqe2eqne89nquiq2e134rr5',
   
}))
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.post('/signup',async (req,res)=>{
    const user=await Users.create({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email

    })
    res.status(201).send(` User ${user.id} created `)
})

app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async (req,res)=>{
    const user=await Users.findOne({where:{
        username:req.body.username
    }})

    if(!user)
    {
        return res.status(404).render('login',{
            error:'No such username found'
        })
    }

    if(user.password!=req.body.password)
    {
        return res.status(401).render('login',{
            error:'Wrong password'
        })
    }
    req.session.userId=user.id
    res.redirect('/profile')
})

app.get('/profile',async (req,res)=>{
    if(!req.session.userId)
    {
        return res.redirect('/login')
    }
    const user=await Users.findByPk(req.session.userId)
    res.render('profile',{
        user
    })
})
app.get('/logout',(req,res)=>{
    req.session.userId=null
    res.redirect('login')
})

// let socketmap={}
// io.on('connection',(socket)=>{
//     console.log('Connected with socket id = ',socket.id)


//     socket.on('msg_send',(data)=>{
//         data.from=socketmap[socket.id]
//         if(data.to)
//         {
//             io.to(data.to).emit('msg_rcvd',data)
//         }
//         else
//         {
//             socket.broadcast.emit('msg_rcvd',data)
//         }
//     })
// })

app.post('/addproduct',async (req,res)=>{
    const product=await Products.create({
        username:req.body.username,
        name:req.body.name,
        price:req.body.price,
        company:req.body.company
    })
    res.status(201).send(` Product ${product.id} created successfully`)
})
app.get('/product',async (req,res)=>{
    const product=await Products.findAll()
    res.send(product)
})


db.sync()
  .then(() => {
    app.listen(2246, () => console.log('started on http://localhost:2246'))
  })
  .catch(console.error)