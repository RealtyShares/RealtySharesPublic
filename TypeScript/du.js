/*
$ tsc du.ts && node du.js
User { key: { uid: 1001 }, name: 'Dima' }
Post { key: { pid: 2001 }, text: 'Strong typing FTW!' }
Like { key: { lid: 3001 }, user: { uid: 1001 }, post: { pid: 2001 } }
User 'Dima' liked post 'Strong typing FTW!'
*/
/*
enum Dima1 { Invalid = 1, Two = 2 }
enum Dima2 { Invalid = 1 }

let a: Dima1 = Dima1.Invalid;
console.log(a);

let b: Dima2 = Dima2.Invalid;
console.log(b);

a = Dima1.Two;
b = <Dima2>(<number>(a));
console.log(b);


interface UserID { uid: number; }
interface PostID { pid: number; }
interface LikeID { lid: number; }
 */
var UserID;
(function (UserID) {
    UserID[UserID["INVALID_UID"] = 0] = "INVALID_UID";
})(UserID || (UserID = {}));
var PostID;
(function (PostID) {
    PostID[PostID["INVALID_PID"] = 0] = "INVALID_PID";
})(PostID || (PostID = {}));
var LikeID;
(function (LikeID) {
    LikeID[LikeID["INVALID_LID"] = 0] = "INVALID_LID";
})(LikeID || (LikeID = {}));
var DBContents = (function () {
    function DBContents() {
        this.user_name = new Map();
        this.post_text = new Map();
    }
    return DBContents;
}());
var User = (function () {
    function User(key, name) {
        this.key = key;
        this.name = name;
    }
    User.prototype.updateDB = function (db) {
        db.user_name[this.key] = this.name;
    };
    User.prototype.dumpGivenDBContents = function (db) { };
    return User;
}());
var Post = (function () {
    function Post(key, text) {
        this.key = key;
        this.text = text;
    }
    Post.prototype.updateDB = function (db) {
        db.post_text[this.key] = this.text;
    };
    Post.prototype.dumpGivenDBContents = function (db) { };
    return Post;
}());
var Like = (function () {
    function Like(key, user, post) {
        this.key = key;
        this.user = user;
        this.post = post;
    }
    Like.prototype.updateDB = function (db) { };
    Like.prototype.dumpGivenDBContents = function (db) {
        console.log("User '" + db.user_name[this.user] + "' liked post '" + db.post_text[this.post] + "'");
    };
    return Like;
}());
var data = [
    new User(1001, "Dima"),
    new Post(2001, "Strong typing FTW!"),
    new Like(3001, 1001, 2001),
];
data.forEach(function (e) {
    console.log(e);
});
var db = new DBContents();
data.forEach(function (e) {
    e.updateDB(db);
});
data.forEach(function (e) {
    e.dumpGivenDBContents(db);
});
