const express = require('express');

const app = express();

app.use(require('cors')())
app.use(express.json())
// 托管静态文件 可以通过/uploads来访问静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db.js')(app)
require('./routes/admin/index.js')(app)


app.listen(3000, ()=>{
  console.log('http://localhost:3000')
})