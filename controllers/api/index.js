const router = require("express").Router();
const userRoutes = require("./api/userRoutes");
const commentRoutes=require("./api/commentRoutes")
const postRoutes=require("./api/postRoutes")

router.use('/user', userRoutes);
router.use('/comment',commentRoutes)
router.use('/post',postRoutes)
module.exports = router;
