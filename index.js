const express = require('express');
const app = express();
const router = require ('./router');


app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static('public'));

const port = process.env.PORT || 5000;
app.use('/',router)

app.listen(port,()=>{
    console.log(`SERVER corriendo en http://localhost:${port}`);
}
)
