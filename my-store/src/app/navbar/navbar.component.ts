import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [NavbarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  title: string = "Links";
  link1: string = "Link1";
  link2: string = "Link2";
  link3: string = "Link3";

  constructor() { }


  ngOnInit(): void {
  }

}
