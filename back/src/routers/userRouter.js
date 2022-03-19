const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { userAuthService } = require("../services/userService")

const userAuthRouter = Router()

userAuthRouter.post("/user/register", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      )
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    })

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage)
    }

    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

userAuthRouter.post("/user/login", async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email
    const password = req.body.password

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password })

    if (user.errorMessage) {
      throw new Error(user.errorMessage)
    }

    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

userAuthRouter.get(
  "/userlist",
  login_required,
  async (req, res, next) => {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers()
      res.status(200).send(users)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.get(
  "/user/current",
  login_required,
  async (req, res, next) => {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      })

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage)
      }

      res.status(200).send(currentUserInfo)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.put(
  "/users/:id",
  login_required,
  async (req, res, next) => {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null
      const email = req.body.email ?? null
      const description = req.body.description ?? null

      const toUpdate = { name, email, description }

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate })

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage)
      }

      res.status(200).json(updatedUser)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.get(
  "/users/:id",
  login_required,
  async (req, res, next) => {
    try {
      const user_id = req.params.id
      const currentUserInfo = await userAuthService.getUserInfo({ user_id })

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage)
      }

      res.status(200).send(currentUserInfo)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.put("/user/follow/:id", login_required, async (req, res, next) => {
  try {
    const user_id_my = req.params.id
    const user_id_you = req.body.user_id_you

    // 내 데이터
    const userInfo_my = await userAuthService
      .getUserInfo({ user_id: user_id_my })
    // 상대 데이터
    const userInfo_you = await userAuthService
      .getUserInfo({ user_id: user_id_you })

    // 데이터를 setUser로 넘겨주기 전에 처리(각자의 following, follower에 서로의 id 추가)
    let following_my = [...userInfo_my.following, user_id_you]
    let follower_you = [...userInfo_you.follower, user_id_my]

    const toUpdate_you = { follower: follower_you }
    const updated_you = await userAuthService.setUser({ user_id: user_id_you, toUpdate: toUpdate_you })
    // 상대 데이터가 없는 경우
    if (updated_you.errorMessage) {
      throw new Error(updated_you.errorMessage)
    }

    const toUpdate_my = { following: following_my }
    const updated_my = await userAuthService.setUser({ user_id: user_id_my, toUpdate: toUpdate_my })

    res.status(200).json({ updated_my, updated_you })
  } catch (error) {
    next(error)
  }
})

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, (req, res, next) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    )
})

module.exports = { userAuthRouter }
