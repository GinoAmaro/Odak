import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [`
  .margen{
    margin: 15px
  }
  `
  ]
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
