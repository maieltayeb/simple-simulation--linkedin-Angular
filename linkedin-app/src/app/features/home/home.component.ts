import { Post } from "./../../_model/post";
import { PostService } from "./../post/post.service";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/user.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/_model/user";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}

  userid: number;
  user: User;
  posts: Post[] = [];
  x: Post[];
  ngOnInit() {
    this.userid = +this.route.snapshot.params["id"];
    this.userService.userChanged.emit(this.userid);
    this.user = this.userService.getById(this.userid);

    this.user.connectionIds.push(this.user.id);
    this.x = this.postService.getAllPost();
    for (let i = 0; i < this.x.length; i++) {
      if (this.user.connectionIds.includes(this.x[i].userId)) {
        this.posts.push(this.x[i]);
      }
    }
    //this.postsArr();
    this.postService.newPostAdded.subscribe(newPost => {
      this.posts.unshift(newPost);
      console.log(newPost);
      console.log(this.posts);
    });
  }

  // postsArr() {

  //   console.log(this.posts);
  //   return this.posts;
  // }
}
