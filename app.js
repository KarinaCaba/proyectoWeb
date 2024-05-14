const express = require('express');
const app = express();
const router = require ('./router');


app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static('public'));


app.use('/',router)

app.listen(5000,()=>{
    console.log('SERVER corriendo en http://localhost:5000')
}
)
