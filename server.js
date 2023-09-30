const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const Blog = require("./models/blog");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const dbURI =
//   "mongodb://localhost:27017/Myblog";

const dbURI =
  "mongodb+srv://dorathypaul48:dorathypaul48@myblog.rnzsjyb.mongodb.net/Myblog?retryWrites=true&w=majority&appName=AtlasApp";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("app listening");
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    name: "Dorathy",
    picture: "my picture",
    title: "about",
    about: "About me 2",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      // console.log(result);
      res.render("myblog", { title: "Home", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/blogs/:id", (req, res) => {
  // console.log(req.params.id);
  Blog.findById(req.params.id)
    .then((result) => {
      // console.log(result);
      res.render("single-blog", {
        title: "single-blog",
        blog: {
          _id: result._id,
          name: result.name,
          title: result.title,
          about: result.about,
          picture: result.picture,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // Blog.findById(req.params.id)
  // .then((result) => {
  //     console.log(result);
  //     res.render("single-blog", {title: "single-blog", blog: result})
  // })
  // .catch((err) => {
  //     console.trace(err.message)
  // })
});
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
        console.log(result)
        res.json({ redirect: '/blogs'})
    })
    .catch(err => {
        console.log(err)
    })
})


app.post("/blogs", upload.single("picture"), (req, res) => {
  // console.log(req.file)
  const blog = new Blog({
    ...req.body,
    picture: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });

  // res.send(req.file);
});

app.get("/newblog", (req, res) => {
  res.render("newblog", { title: "Newblog" });
});
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});
