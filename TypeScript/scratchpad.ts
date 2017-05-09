/*
$ tsc du.ts && node du.js
User { key: { uid: 1001 }, name: 'Dima' }
Post { key: { pid: 2001 }, text: 'Strong typing FTW!' }
Like { key: { lid: 3001 }, user: { uid: 1001 }, post: { pid: 2001 } }
User 'Dima' liked post 'Strong typing FTW!'
*/

enum UserID { INVALID_UID = 0 }
enum PostID { INVALID_PID = 0 }
enum LikeID { INVALID_LID = 0 }

class DBContents {
  user_name: Map<UserID, string> = new Map<UserID, string>();
  post_text: Map<PostID, string> = new Map<PostID, string>();
}

class User {
  public constructor(public key: UserID, public name: string) {}
  updateDB(db: DBContents) {
    db.user_name[this.key] = this.name;
  }
  dumpGivenDBContents(db: DBContents) {}
}

class Post {
  public constructor(public key: PostID, public text: string) {}
  updateDB(db: DBContents) {
    db.post_text[this.key] = this.text;
  }
  dumpGivenDBContents(db: DBContents) {}
}

class Like {
  public constructor(public key: LikeID, public user: UserID, public post : PostID) {}
  updateDB(db: DBContents) {}
  dumpGivenDBContents(db: DBContents) {
    console.log(`User '${db.user_name[this.user]}' liked post '${db.post_text[this.post]}'`);
  }
}

type Entry = User | Post | Like;

let data: Entry[] = [
  new User(<UserID>1001, "Dima"),
  new Post(<PostID>2001, "Strong typing FTW!"),
  new Like(<LikeID>3001, <UserID>1001, <PostID>2001),
];

data.forEach((e: Entry) => {
  console.log(e);
});

let db = new DBContents();
data.forEach((e: Entry) => {
  e.updateDB(db);
});

data.forEach((e: Entry) => {
  e.dumpGivenDBContents(db);
});
