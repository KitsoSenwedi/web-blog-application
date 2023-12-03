const express = require('express');
const app = express();
const port = 3000;

//set ejs as the view engine
app.set('view engine', 'ejs');

//middleware to parse JSON and handle form submissions
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//sample data to simulate blog posts for now
let posts = [
    {id: 1, title: 'First Post', content: 'This is the content of the first post.'},
    {id: 2, title: 'Second Post', content: 'This is the content of the second post.'}
];

//routes
app.get('/', (req, res) => {
    res.render('home', {posts});
});

app.get('/newpost', (req, res) => {
    res.render('newpost');
});

app.post('/newpost', (req, res) => {
    //handle new blog post submission
    const {title, content} = req.body;
    const newPost = {id: posts.length + 1, title, content};
    posts.push(newPost);
    //Process and handle the data as needed    
    res.redirect('/')
});

app.get('post/:id', (req, res) => {
    const postId = parseInt(req.params.Id);
    const post = posts.find(post => post.id === postId);
    if(post){
        res.render('viewpost', {post})
    } else {
        res.redirect('/')
    }
});

app.get('/post/:id/edit', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (post) {
        res.render('editpost', { post });
    } else {
        res.redirect('/');
    }
});

app.post('/post/:id/edit', (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedPost = { title: req.body.title, content: req.body.content };
    posts = posts.map(post => (post.id === postId ? { ...post, ...updatedPost } : post));
    res.redirect(`/post/${postId}`);
});

app.post('/post/:id/delete', (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

//start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})