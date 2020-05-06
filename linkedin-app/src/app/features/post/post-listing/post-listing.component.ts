import { User } from "./../../../_model/user";
import { Post } from "./../../../_model/post";
import { Comment } from "./../../../_model/comment";
import { CommentService } from "./../comment.service";
import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/user.service";
import { PostService } from "../post.service";

@Component({
  selector: "app-post-listing",
  templateUrl: "./post-listing.component.html",
  styleUrls: ["./post-listing.component.css"]
})
export class PostListingComponent implements OnInit {
  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}
  @Input() post: Post;
  @Input() user: User;
  postUser: User;
  postsId: number[] = [12, 13];
  x: Comment[];
  comment: {};
  liked = false;
  addCommentClicked = false;
  commentedUsers: User[] = [];

  ngOnInit() {
    this.postUser = this.userService.getById(this.post.userId);
    this.x = this.post.comment;
    for (let index = 0; index < this.x.length; index++) {
      this.commentedUsers.push(this.userService.getById(this.x[index].userId));
    }

    this.postService.newCommentAdded.subscribe(newComment => {
      this.postUser = this.userService.getById(newComment.postId);

      this.x = this.post.comment;
      let newComm = newComment.comment.slice(-1)[0];
      this.commentedUsers.push(this.userService.getById(newComm.userId));
    });
  }
  newLike() {
    this.liked = !this.liked;
    if (this.liked === true) {
      this.post.like += 1;
    } else {
      this.post.like -= 1;
    }
  }
  addNewComment(event, newComment: HTMLInputElement) {
    if (event.key === "Enter") {
      this.comment = {
        postId: this.post.postId,
        commentId: this.post.comment.length,
        userId: this.user.id,
        commentContent: newComment.value
      };
      this.post.comment.push(this.comment);
      this.postService.newCommentAdded.emit(this.post);
      newComment.value = "";
    }
  }
  addComment() {
    this.addCommentClicked = true;
  }
  myDate = Date.now();
}
