import { Router } from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js";

const router = new Router()

/** read */

router.get('/:id', verifyToken, getUser);

router.get('/:id/friends', verifyToken, getUserFriends);

/** update */

router.patch('/:id/:friend', verifyToken, addRemoveFriend);

export default router;