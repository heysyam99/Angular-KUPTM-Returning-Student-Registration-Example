import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickAble() {
    this.router.navigate(['address']);
    return;
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }

}
