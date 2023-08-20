const mongoose = require('mongoose');

// Connection to db
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to DB'));

// "Users" schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

// "Posts" schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
});

// "Comments" schema
const commentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// "Images" schema
const imageSchema = new mongoose.Schema({
  url: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// "Likes" schema
const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// Creating models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Image = mongoose.model('Image', imageSchema);
const Like = mongoose.model('Like', likeSchema);

// Usage

// Creating user with user link
const user = new User({
  name: 'John',
  email: 'john@gmail.com',
});

// Creating new post with user link
const post = new Post({
  title: 'My weekends',
  content: 'It is beautiful weather and mountains',
  user: user._id,
});

// Creating new comment with user link
const comment = new Comment({
  text: 'wow, amazing🔥🔥🔥',
  user: user._id,
});

// Create image with user link
const image = new Image({
  url: 'https://johnblog.com/110.jpg',
  user: user._id,
});

// Create like with user link
const like = new Like({
  user: user._id,
});

const addCommentToPost = async (post, comment) => {
    try {
        await Post.findOneAndUpdate(
            { title: post.title },
            { $push: { comments: comment._id }}
        );
    } catch (err) {
        console.log(err);
    }
};

const addLikeToPost = async (post, user_id) => {
    try {
        await Post.findOneAndUpdate(
            { title: post.title },
            { $push: { likes: like._id }}
        );
    } catch (err) {
        console.log(err);
    }
};

const addPostForUser = async (userId, postId) => {
    try {
        await User.findOneAndUpdate(
            { _id: userId }, { $push: { posts: postId }}
        )
    } catch (err) {
        console.log(err);
    }
};

// Function for deleting test data
const clearData = async () => {
    try {
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});
        await Image.deleteMany({});
        await Like.deleteMany({});
        console.log('Test data cleared successfully.');
    } catch (error) {
         console.error('Error clearing data:', error);
    }
  }
// Saving all creating objects
Promise.all([
    user.save(),
    post.save(),
    comment.save(),
    image.save(),
  like.save(),
]).then(async () => {
    await addCommentToPost(post, comment);
    await addLikeToPost(post, user.id);
    await addPostForUser(user._id, post._id);
    console.log('Data successfuly added!');

  // Get post with all user data, comments and likes
  // If `populate` is not used, u will see only ids in appropriate fields
  // U can use async/await, promises or .exec(cb)
  Post.findOne({ title: 'My weekends' })
    .populate('user comments likes')
    .then(async (post) => {
        console.log('Post with data:', post);
        await clearData();
        await db.close();
        console.log('Connection with db was closed.');
    })
    .catch(async (err) => {
        await clearData();
        await db.close();
        console.log('Connection with db was closed');
        return console.error('Get post error:', err);
    });
});
