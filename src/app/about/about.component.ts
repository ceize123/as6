import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    photo: string = "../../assets/photo.jpg";
    constructor() { }

    ngOnInit(): void {
    }

}
