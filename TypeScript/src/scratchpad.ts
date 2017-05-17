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
  public userName: Map<UserID, string> = new Map<UserID, string>();
  public postText: Map<PostID, string> = new Map<PostID, string>();
}

class User {
  public constructor(public key: UserID, public name: string) {}
  public updateDB(db: DBContents): void {
    db.userName[this.key] = this.name;
  }
  public dumpGivenDBContents(_: DBContents): void {}
}

class Post {
  public constructor(public key: PostID, public text: string) {}
  public updateDB(db: DBContents): void {
    db.postText[this.key] = this.text;
  }
  public dumpGivenDBContents(_: DBContents): void {}
}

class Like {
  public constructor(public key: LikeID, public user: UserID, public post : PostID) {}
  public updateDB(_: DBContents): void {}
  public dumpGivenDBContents(db: DBContents): void {
    console.log(`User '${db.userName[this.user]}' liked post '${db.postText[this.post]}'`);
  }
}

type Entry = User | Post | Like;

let data: Entry[] = [
  new User(<UserID> 1001, "Dima"),
  new Post(<PostID> 2001, "Strong typing FTW!"),
  new Like(<LikeID> 3001, <UserID> 1001, <PostID> 2001),
];

data.forEach((e: Entry) => {
  console.log(e);
});

const db: DBContents = new DBContents();

data.forEach((e: Entry) => {
  e.updateDB(db);
});

data.forEach((e: Entry) => {
  e.dumpGivenDBContents(db);
});
