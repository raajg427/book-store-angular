import { Component, OnInit, Inject, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { Book } from "../../model/book.model";
import { BookService } from "../../service/book.service";

@Component({
  selector: "app-list-book-store",
  templateUrl: "./list-book-store.component.html",
  styleUrls: ["./list-book-store.component.css"]
})
export class ListBookStoreComponent implements AfterViewInit {
  books: Book[] = [];
  constructor(private router: Router, private bookService: BookService) {}

 
  ngAfterViewInit(): void {
    this.init()
  }

  init():void{
    console.log("init called")
    this.books=[];
    this.bookService.getAllBooks().subscribe((response: any) => {
      this.books = response.books;
    });
  }


  deleteBookStore(book: Book): void {
    this.bookService.deleteBook(book.id).subscribe(data => {
      console.log(data);
      this.init()
    });
  }

  editBookStore(book: Book): void {
    window.localStorage.removeItem("editbookId");
    window.localStorage.setItem("editbookId", book.id.toString());
    this.router.navigate(["edit-book"]);
  }

  addBookStore(): void {
    this.router.navigate(["add-book"]);
  }

  readXml():void{

 this.bookService.readXml().subscribe(data => {
      console.log(data);
      this.init()
    });
  }
}
