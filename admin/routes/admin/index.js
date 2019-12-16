module.exports = app =>{
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  // 新增分类
  router.post('/', async (req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新分类名称
  router.put('/:id', async (req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })
  // 删除分类
  router.delete('/:id', async (req,res) => {
    await req.Model.findByIdAndRemove(req.params.id,req.body)
    res.send({
      success: true
    })
  })
  //获取分类列表
  router.get('/', async (req,res) => {
    const queryOptions = {};
    if(req.Model.modelName === 'Category'){
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 根据ID获取信息
  router.get('/:id', async (req,res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //资源的公用入口
  app.use('/admin/api/rest/:resource', async (req, res, next)=>{
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  },router)


  // 上传
  const multer = require('multer');
  const upload = multer({dest: __dirname + '/../../uploads'})
  // 路径地址 接受单个文件 参数为file
  app.post('/admin/api/upload', upload.single('file'), async (req,res)=>{
    const file = req.file
    // 返回前端当前图片的服务器地址
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}