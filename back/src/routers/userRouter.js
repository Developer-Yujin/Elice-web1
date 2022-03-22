const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { userAuthService } = require("../services/userService")

const userAuthRouter = Router()

userAuthRouter.post("/register", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("headers의 Content-Type을 application/json으로 설정해주세요")
    }

    const { name, nickname, email, password } = req.body
    const newUser = await userAuthService.addUser({
      name,
      nickname,
      email,
      password,
    })

    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

userAuthRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await userAuthService.getUser({ email, password })

    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

userAuthRouter.get("/list", login_required, async (req, res, next) => {
    try {
      const users = await userAuthService.getUsers()
      res.status(200).send(users)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.get("/current", login_required, async (req, res, next) => {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.currentUserId
      const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      })

      res.status(200).send(currentUserInfo)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.put("/:id", login_required, async (req, res, next) => {
    try {
      const userId = req.params.id
      const { nickname, description } = req.body
      const toUpdate = { nickname, description }

      const updatedUser = await userAuthService.setUser({ userId, toUpdate })

      res.status(200).json(updatedUser)
    } catch (error) {
      next(error)
    }
  }
)

userAuthRouter.get("/:id", login_required, async (req, res, next) => {
    try {
      const userId = req.params.id
      const currentUserInfo = await userAuthService.getUserInfo({ userId })

      res.status(200).send(currentUserInfo)
    } catch (error) {
      next(error)
    }
  }
)

// My -> 내 id로 db에서 가져온 데이터, Your -> 상대 id로 db에서 가져온 데이터
// follower -> 나를 follow하는 .. / following -> 내가 follow하는 ..
// follow : count 증가, 내 following과 상대 follower에 서로의 id를 add
// unfollow : count 감소, 내 following과 상대 follower에 서로의 id를 remove
userAuthRouter.put("/follow/:id", login_required, async (req, res, next) => {
  try {
    const userIdMy = req.params.id
    const { userIdYour } = req.body
    const userInfoYour = await userAuthService.getUserInfo({
      user_id: userIdYour
    })
    const userInfoMy = await userAuthService.getUserInfo({
      user_id: userIdMy
    })

    let followerYour = Object.values(userInfoYour.follower)
    let followingMy = Object.values(userInfoMy.following)

    // 값이 존재하는 경우 index를, 존재하지 않는 경우 -1 반환
    const indexFollowerYour = followerYour.indexOf(userIdMy)
    const indexFollowingMy = followingMy.indexOf(userIdYour)

    // follow
    if (indexFollowingMy === -1 && indexFollowerYour === -1) {
      followerCountYour = userInfoYour.followerCount + 1
      followerYour = [...followerYour, userIdMy]
      followingCountMy = userInfoMy.followingCount + 1
      followingMy = [...followingMy, userIdYour]
    } else {
      // unfollow
      followerCountYour = userInfoYour.followerCount - 1
      followerYour.splice(indexFollowerYour, 1)
      followingCountMy = userInfoMy.followingCount - 1
      followingMy.splice(indexFollowingMy, 1)
    }

    const toUpdate_your = {
      followerCount: followerCountYour,
      follower: followerYour
    }
    const updatedYour = await userAuthService.setUser({
      user_id: userIdYour,
      toUpdate: toUpdate_your
    })
    if (updatedYour.errorMessage) {
      throw new Error(updatedYour.errorMessage)
    }

    const toUpdateMy = {
      followingCount: followingCountMy,
      following: followingMy
    }
    const updatedMy = await userAuthService.setUser({
      user_id: userIdMy,
      toUpdate: toUpdateMy
    })

    res.status(200).json({ updatedYour, updatedMy })
  } catch (error) {
    next(error)
  }
})

// jwt 토큰 기능 확인용
userAuthRouter.get("/afterlogin", login_required, (req, res, next) => {
  res
    .status(200)
    .send(`안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`)
})

module.exports = { userAuthRouter }
