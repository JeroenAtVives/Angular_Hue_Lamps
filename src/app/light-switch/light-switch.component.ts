import { Component, OnInit, Input } from '@angular/core';
import { LampenService } from '../lampen.service';


@Component({
  selector: 'app-light-switch',
  templateUrl: './light-switch.component.html',
  styleUrls: ['./light-switch.component.css']
})
export class LightSwitchComponent implements OnInit {

  // Inputs...
  @Input() lampnummer : any;
  @Input() isLampOn : Boolean;

  // Variabelen voor de status voor de switches...
  isOnActive : Boolean; 
  isOffActive : Boolean;


  constructor(private lampenService: LampenService ) { }

  ngOnInit() {
    if(this.isLampOn){
      this.isOffActive = false;
      this.isOnActive = true;      
    }else{
      this.isOffActive = true;
      this.isOnActive = false;      
    }

  }

  BtnOnclicked = (evt) => {
    this.isOnActive = !this.isOnActive;
    this.isOffActive = !this.isOffActive;

    // Probeer de lamp aan te zetten...
    this.lampenService.updateLamp(this.lampnummer,"on","true").subscribe();
  }

  BtnOffclicked = (evt) => {
    this.isOffActive = !this.isOffActive;
    this.isOnActive = !this.isOnActive;

    // Probeer de lamp uit te zetten...
    this.lampenService.updateLamp(this.lampnummer,"on","false").subscribe();
  }  

}
