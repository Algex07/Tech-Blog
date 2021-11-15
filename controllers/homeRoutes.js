const router = require("express").Router();
const { User, Comment, Post } = require("../models");



router.get("/", async (req, res)=>{
  try{
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post)=> post.get({plain:true}));

    res.render("login", {posts , loggedIn:req.session.loggedIn});
  } catch (err){
    res.status(500).json(err)
  }

})

router.get("/login", (req, res)=>{
  if(req.session.loggedIn){
    res.redirect("/")
    return;
  }

  res.render("login")
})

router.get("/signup", (req, res)=>{
  if(!req.session.loggedIn){
    res.redirect("/")
    return;
  }

  res.render("signup")
})

// router.get("/allposts/:id", (req, res)=>{
//   if(!req.session.loggedIn){
//     res.redirect("/")
//     return;
//   }

//   res.render("signup")


  




 module.exports = router;
