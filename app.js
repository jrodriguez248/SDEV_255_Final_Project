const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Course = require('./models/course');
const app = express();


const dbURI = "mongodb+srv://se09242001:test4@nodetuts.g7cmzow.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(3000))
.catch(err => console.log(err));

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req,res, next) => {
    res.locals.path = req.path;
    next()
})


app.get('/create_course', (req,res)=>{
    res.render('createCourse',{title:'Create Course',siteName:'A Class Coding'})
});

app.post('/create_course',(req,res) =>{
    console.log(req.body);
    const course = new Course(req.body);
    course.save()
    .then(result =>{
        res.redirect('/teacher');
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/teacher/:id', (req,res) =>{
    const id = req.params.id;
    Course.findById(id)
    .then(result=>{
        res.render('course', {course:result,title:'Teacher',siteName:'A Class Coding: Teachers'});
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/',(req,res)=>{
    res.render('index',{title:'Home',siteName:'A Class Coding'})
});

app.get('/teacher',(req,res)=>{
    Course.find().sort({createAt: -1})
    .then(result=>{
        res.render('teacher',{course:result,title:'Teacher',siteName:'A Class Coding: Teachers'});
    })
    .catch(err => {
        console.log(err);
    })
});

app.delete('/teacher/:id',(req,res) =>{
    const id = req.params.id;
    Course.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/teacher'});
    })
    .catch((err) =>{
        console.log(err);
    })
})

app.get('/student',(req,res)=>{
    res.render('student',{title:'Student',siteName:'A Class Coding: Students'})
});

app.get('/super',(req,res)=>{
    res.render('super',{title:'Super',siteName:'Super'})
});

app.use((req,res)=> {
    res.status(404).render('404',{title:'404:Page Not Found',siteName:'404:Page Not Found'})
});