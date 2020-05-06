import { Post } from "./../../../_model/post";
import { User } from "src/app/_model/user";
import { PostService } from "./../post.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-post-add",
  templateUrl: "./post-add.component.html",
  styleUrls: ["./post-add.component.css"]
})
export class PostAddComponent implements OnInit {
  openWritePost = false;
  @Input() user: User;
  newPost: Post;
  constructor(private postService: PostService) {}

  ngOnInit() {}

  openWitePostModal() {
    this.openWritePost = !this.openWritePost;
  }

  savePost(post: HTMLTextAreaElement) {
    console.log(post.value);
    this.newPost = {
      userId: this.user.id,
      postText: post.value,
      postMedia: "",
      comment: [],
      like: 0
    };
    this.postService.createPost(this.newPost);
    this.postService.newPostAdded.emit(this.newPost);
    this.openWritePost = !this.openWritePost;

    // let x = this.postService.getAllPost();
    // console.log(x);
  }
}
