/*
$ tsc du.ts && node du.js
User { key: { uid: 1001 }, name: 'Dima' }
Post { key: { pid: 2001 }, text: 'Strong typing FTW!' }
Like { key: { lid: 3001 }, user: { uid: 1001 }, post: { pid: 2001 } }
User 'Dima' liked post 'Strong typing FTW!'
*/

interface UserID { uid: number; }
interface PostID { pid: number; }
interface LikeID { lid: number; }

class DBContents {
  user_name: object = {};
  post_text: object = {};
}

class User {
  public constructor(public key: UserID, public name: string) {}
  updateDB(db: DBContents) {
    db.user_name[this.key.uid] = this.name;
  }
  dumpGivenDBContents(db: DBContents) {}
}

class Post {
  public constructor(public key: PostID, public text: string) {}
  updateDB(db: DBContents) {
    db.post_text[this.key.pid] = this.text;
  }
  dumpGivenDBContents(db: DBContents) {}
}

class Like {
  public constructor(public key: LikeID, public user: UserID, public post : PostID) {}
  updateDB(db: DBContents) {}
  dumpGivenDBContents(db: DBContents) {
    console.log(`User '${db.user_name[this.user.uid]}' liked post '${db.post_text[this.post.pid]}'`);
  }
}

type Entry = User | Post | Like;

let data: Entry[] = [
  new User({ uid: 1001 }, "Dima"),
  new Post({ pid: 2001 }, "Strong typing FTW!"),
  new Like({ lid: 3001 }, { uid: 1001 }, { pid: 2001 }),
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
