import { Comment } from "./../../_model/comment";
export class CommentService {
  private Comments: Comment[] = [
    {
      commentId: 1,
      userId: 1,
      postId: 12,
      commentContent: "hi erver one"
    },
    {
      commentId: 4,
      userId: 1,
      postId: 12,
      commentContent: "hi erver two"
    },
    {
      commentId: 5,
      userId: 1,
      postId: 12,
      commentContent: "hi erver tree"
    },
    {
      commentId: 2,
      userId: 2,
      postId: 13,
      commentContent: "good job"
    },
    {
      commentId: 3,
      userId: 3,
      postId: 14,
      commentContent: "bye"
    }
  ];
  ////////////// get all /////////////////////
  GetAllComments(): Comment[] {
    return this.Comments.slice();
  }

  ///////// get by id//////////////////
  getById(commentId: number): Comment {
    return this.Comments.find(comment => comment.commentId === commentId);
  }

  getByPostId(postId: number): Comment[] {
    let comments: Comment[] = [];
    comments = this.Comments.filter(comment => comment.postId === postId);
    return comments;
  }
  ////////// add new comment/////////////////////
  AddNewComment(UserId: number, PostId: number, CommentContent: string) {
    const Newcomment: Comment = {
      commentId: this.Comments.length,
      userId: UserId,
      postId: PostId,
      commentContent: CommentContent
    };
    this.Comments.push(Newcomment);
  }
  //////////// deleteComment//////////////////

  DeleteComment(commentId: number) {
    const indexOfComment = this.Comments.findIndex(
      comment => comment.commentId === commentId
    );
    this.Comments.splice(indexOfComment, 1);
  }

  ///////////////UpdateComment//////////////
  UpdateComment(
    CommentId: number,
    UserId: number,
    PostId: number,
    CommentContent: string
  ) {
    const indexOfComment = this.Comments.findIndex(
      comment => comment.commentId === CommentId
    );
    this.Comments[indexOfComment] = {
      commentId: CommentId,
      userId: UserId,
      postId: PostId,
      commentContent: CommentContent
    };
  }
}
