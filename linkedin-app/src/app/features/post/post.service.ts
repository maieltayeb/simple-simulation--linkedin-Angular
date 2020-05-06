import { Post } from "./../../_model/post";
import { EventEmitter } from "@angular/core";
export class PostService {
  posts: Post[] = [
    {
      postId: 1,
      userId: 3,
      postText: "welcome",
      postMedia: "123.mb4",
      comment: [
        { postId: 1, commentId: 6, userId: 3, commentContent: "that's great!" },
        { postId: 1, commentId: 3, userId: 1, commentContent: "that's bad!" },
        { postId: 1, commentId: 2, userId: 3, commentContent: "that's new!" }
      ],
      like: 1
    },
    {
      postId: 2,
      userId: 2,
      postText: "best friends are awesome",
      comment: [
        { postId: 2, commentId: 3, userId: 1, commentContent: "that's bad!" },
        { postId: 2, commentId: 2, userId: 3, commentContent: "that's new!" }
      ],
      like: 2
    },
    {
      postId: 3,
      userId: 1,
      postText: "welcome again",
      comment: [
        { postId: 3, commentId: 6, userId: 3, commentContent: "that's great!" },
        { postId: 3, commentId: 2, userId: 3, commentContent: "that's new!" }
      ],
      like: 9
    },
    {
      postId: 4,
      userId: 1,
      postText: "new job",
      postMedia: "123.png",
      comment: [
        { postId: 4, commentId: 6, userId: 3, commentContent: "that's great!" },
        { postId: 4, commentId: 3, userId: 1, commentContent: "that's bad!" }
      ],
      like: 4
    },
    {
      postId: 4,
      userId: 5,
      postText: "new job",
      postMedia: "123.png",
      comment: [{ postId: 4, commentId: 6, userId: 3, commentContent: "wow" }],
      like: 4
    },
    {
      postId: 4,
      userId: 4,
      postText: "hey there",
      postMedia: "123.png",
      comment: [{ postId: 4, commentId: 6, userId: 3, commentContent: "wow" }],
      like: 4
    }
  ];

  getAllPost(): Post[] {
    return this.posts;
  }
  getPostById(postId: number): Post {
    return this.posts.find(post => post.postId === postId);
  }

  getPostByUserId(userId: number): Post[] {
    return this.posts.filter(post => post.userId === userId);
  }
  createPost(post: Post) {
    const newPost: Post = {
      postId: this.posts.length + 1,
      userId: post.userId,
      postText: post.postText,
      postMedia: post.postMedia,
      comment: post.comment,
      like: post.like
    };
    // return
    this.posts.push(newPost);
  }

  newPostAdded = new EventEmitter<Post>();
  newCommentAdded = new EventEmitter<any>();
}
