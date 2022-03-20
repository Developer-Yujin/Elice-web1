const is = require('@sindresorhus/is')
const { Router } = require('express')
const { login_required } = require('../middlewares/login_required')
const { CategoryService } = require('../services/categoryService')
const { timeUtil } = require("../common/timeUtil")

const categoryRouter = Router()

// POST
categoryRouter.post('/create', async (req, res, next) => {
    try {
        categoryRouter.use(login_required)

        if(is.emptyObject(req.body)){
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요."
            )
        }

        const user_id = req.body.user_id
        const name = req.body.name
        const description = req.body.description
        const created_at = timeUtil()
        const updated_at = timeUtil()

        // 데이터 DB 추가
        const newCategory = await CategoryService.addCategory({
            user_id,
            name,
            description,
            created_at,
            updated_at
        })

        res.status(201).json(newCategory)
    } catch(err) {
        next(err)
    }
})

// GET
categoryRouter.get('/list', async (req, res, next) => {
    try {
        const category = await CategoryService.getCategory()

        if (category.errorMessage){
            throw new Error(category.errorMessage)
        }

        res.status(200).send(category)
    } catch(err) {
        next(err)
    }
})

// GET
categoryRouter.get('/:name', async (req, res, next) =>{
    try {
        const categoryName = req.params.name
        const category = await CategoryService.getCategoryByName({ categoryName })

        // Todo : 내부 게시물 전부 출력

        if (category.errorMessage) {
            throw new Error(category.errorMessage)
        }

        res.status(200).send(category)
    } catch(err) {
        next(err)
    }
})

// PUT
categoryRouter.put('/:name', async (req, res, next) => {
    try {
        const categoryName = req.params.name

        const name = req.body.name ?? null
        const description = req.body.description ??  null
        const updated_at = timeUtil()
        const toUpdate = { name, description, updated_at }

        const category = await CategoryService.setCategory({ categoryName, toUpdate })

        if (category.errorMessage) {
            throw new Error(category.errorMessage)
        }

        res.status(200).send(category)
    } catch(err) {
        next(err)
    }
})

// DELETE
categoryRouter.delete('/:name', async (req, res, next) => {
    try {
        const categoryName = req.params.name

        // Todo : 게시글이 있으면 삭제 불가능


        const result = await CategoryService.deleteCategory({ categoryName })

        if(result.errorMessage){
            throw new Error(result.errorMessage)
        }

        res.status(200).send(result)
    } catch(err) {
        next(err)
    }
})

module.exports = { categoryRouter }