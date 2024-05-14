require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080
const expressLayouts = require('express-ejs-layouts')
const db = require('./db')
const methodOverride = require('method-override')
const session = require('express-session')
const userRouter = require('./routes/user_router')
const sessionRouter = require('./routes/session_router')
const homeRouter = require('./routes/home_router')
const viewRouter = require('./routes/view_router')
const adminRouter = require('./routes/admin_router')
const setCurrentUser = require('./middlewares/set_current_user') 

app.set('view engine', 'ejs')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(methodOverride('_method'))

app.use(session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 1},
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(setCurrentUser)

app.use(userRouter)
app.use(homeRouter)
app.use(viewRouter)
app.use(sessionRouter)
app.use(adminRouter)

app.listen(port, () => {
    console.log(`Gundarchive is available on port ${port}!`);
})

