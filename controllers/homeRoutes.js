const router = require("express").Router();
const withAuth = require("../utils/auth");
const {  User, Comment, Post } = require("../models");
const { sequelize } = require("../models/User");


router.get('/login', withAuth,  async (req, res) => {  

  try {
    const postData = await Post.findAll({
      include: [
       
       {
          model: User,
          attributes: ['userName', 'id'] ,
          required: true    
         },
         { model: Comment, 
          attributes: ['content','postId', 'userId', 'id'],
          required: false,
          include:[
            {model:Post,
            attributes:['post'],
          required:false}      
        ]
      },
        ],
    });


    const posts= postData.map(post=>post.get({plain:true}))
console.log(posts)
console.log(posts[0].comments)

    res.render('login', {
      posts,
       title: "post",
       style: "post.css",
       exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
       scripts: [{ script: "index.js" }, { script: 'logout.js' }],
       user_id: req.session.user_id
    })



  } catch (err) {
    console.log('is this here?')
    res.status(400).json(err);
  }
});
    
router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect("/feed");
  //   return;
  // }

  res.render("signup", {
    title: "Sign in",
    style: "style.css",
    scripts: [{ script: "login.js" }],
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Sign up",
    style: "style.css",
    scripts: [{ script: "signup.js" }],
  });
});

module.exports = router;
