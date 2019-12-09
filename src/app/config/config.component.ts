import { Component, OnInit } from '@angular/core';
import { LampenService } from '../lampen.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  lights : any;

  constructor(private lampenService: LampenService) { }

  ngOnInit() {
  }

  onClick(): void {
    this.lampenService.getLamps().subscribe(data => this.lights = Object.values(data));
  }


}
