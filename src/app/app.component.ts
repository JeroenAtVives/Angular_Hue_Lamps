import { Component } from '@angular/core';
import { LampenService } from './lampen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'http-test';
  lights : any;

  constructor(private lampenService: LampenService ) { }

  ngOnInit() {
    this.lampenService.getLamps().subscribe(
      data => { 
        this.lights = Object.values(data);
      }
    );

  }
}
