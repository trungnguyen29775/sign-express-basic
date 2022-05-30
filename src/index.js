const express = require('express')
const {engine} = require('express-handlebars')
const app = express();
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000;
const users = []
let i=0;
const Authenticate = require('./resources/Authenticate/authenticate')
//cors and bodyParser
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
//view
app.engine('hbs',engine({
    extname:'.hbs'
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources','views'));
//static files
app.use(express.static(path.join(__dirname,'public')))

//route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login',(req,res)=>
{
  res.render('login')
})

app.get('/register',(req,res)=>
{
  res.render('register')
})

app.post('/register', (req,res)=>
{
  let user = {
    username: req.body.username,
    password: req.body.password
  }
  console.log(user)
  users.push(user)
  res.redirect('/login')
})

app.post('/login',(req,res)=>
{
  let user = {
    username: req.body.username,
    password: req.body.password
  }

  if(Authenticate(user,users))
    res.redirect('/')
  else
    res.send('Wrong username or password')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})