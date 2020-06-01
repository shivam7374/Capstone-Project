const http=require('http')

const express=require('express')
const session=require('express-session')
const socketio=require('socket.io')

const app=express()

const server=http.createServer(app)
const io=socketio(server)// to work with socket on server named server
// it includes a js file at path /socket.io/socket.io.js
const multer=require('multer')
const fs=require('fs').promises

const{ db,Users,Products }=require('./db')

const upload=multer({dest:'uploads/'})


app.use('/images',express.static(__dirname+'/images'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', express.static(__dirname + '/public'))
// makes this folder available to public
app.get('/:id/product',(req,res)=>{
    res.render('product')
})

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
app.post('/signup',upload.single('avatar'),async (req,res)=>{
    console.log('req.body',req.body)
    console.log('req.file',req.file)
    const oldpath=__dirname+'/uploads/'+req.file.filename
    const newpath=__dirname+'/images/'+'avatar_'+req.body.username+'.'+req.file.mimetype.split('/').pop()
    
    await fs.rename(oldpath,newpath)

    const user=await Users.create({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        avatar:'/images/'+'avatar_'+req.body.username+'.'+req.file.mimetype.split('/').pop()

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

let socketmap={}
let userinroom={}
io.on('connection',(socket)=>{
    console.log('Connected with socket id = ',socket.id)
    
    function login(s,u) {
        s.join(u)
        s.emit('logged_in')
        socketmap[s.id]=u
        console.log(socketmap)
        userinroom[u]=1
    }
    function logout(s,u) {
        userinroom[u]=0
        s.emit('logged_out')
    }

    socket.on('login',(data)=>{
            login(socket,data.username)
    })
    socket.on('logout',(data)=>{
        logout(socket,data.username)
    })
    socket.on('msg_send',(data)=>{
        data.from=socketmap[socket.id]
        if(userinroom[data.to])
        {
            io.to(data.to).emit('msg_rcvd',data)
        }
        else 
        {
            io.to(data.from).emit('msg_rcvd',{msg:'Reciver is currently not in CHAT ROOM or no user with this username please check and try again !'})
        }
    })
})
app.post('/addproduct',upload.single('avatar'),async (req,res)=>{
    console.log(req.body)
    console.log("*-*-*-*-*-*-**-*-*-")
    const oldpath=__dirname+'/uploads/'+req.file.filename
    const newpath=__dirname+'/images/'+'avatar_'+req.body.username+'.'+req.file.mimetype.split('/').pop()
    
    await fs.rename(oldpath,newpath)

    const product=await Products.create({
        username:req.body.username,
        name:req.body.name,
        price:req.body.price,
        company:req.body.company,
        avatar:'/images/'+'avatar_'+req.body.username+'.'+req.file.mimetype.split('/').pop()
    })
    res.status(201).send(` Product ${product.id} created successfully`)
})
app.get('/product',async (req,res)=>{
    const product=await Products.findAll()
    res.send(product)
})


db.sync()
  .then(() => {
    server.listen(2346, () => console.log('started on http://localhost:2346'))
  })
  .catch(console.error)