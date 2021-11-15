const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth")
// use /api/comment

router.get("/", async (req, res) => {
    const getComment = await Comment.findAll()
    res.json(getComment)
})


router.post("/", withAuth, async (req, res) => {
    if (!req.session) {
        res.status(404).send("Please logged in to comment")
    } else {
        try {
            console.log(req.body)
            const newComment = await Comment.create({
                description: req.body.description,
                thread_id: req.body.postId,
                userId: req.session.userId
            });
            res.status(200).json(newComment);
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

module.exports = router;