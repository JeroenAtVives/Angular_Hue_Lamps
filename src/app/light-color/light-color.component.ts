import { Component, OnInit, Input } from '@angular/core';
import { LampenService } from '../lampen.service';

@Component({
  selector: 'app-light-color',
  templateUrl: './light-color.component.html',
  styleUrls: ['./light-color.component.css']
})
export class LightColorComponent implements OnInit {

  light: any;

  @Input() lampnummer : any;

  // Variabelen voor het gedeelte rood, groen en blauw...
  redPart : number;
  greenPart : number;
  bluePart : number;

  // Variabele voor het XY-formaat...
  xy : number[];

  constructor(private lampenService:LampenService) { }

  ngOnInit() {
    // De data van de lampen opvragen...
    this.lampenService.getLamps().subscribe(
      data => { 
        // De data van de specifieke lamp eruit halen...
        this.light = data[this.lampnummer];
        // De huidige kleur van de lamp opvragen (xy) en omzetten naar RGB formaat...
        this.XYToRGB(this.light.state.xy);
      }  
    );
    
  }

  onchange = (evt) => {
    switch ((evt.target as HTMLInputElement).id) {
      case "redRange":
        this.redPart = Number((evt.target as HTMLInputElement).value);
        break;
      case "greenRange":
        this.greenPart =Number((evt.target as HTMLInputElement).value);
        break;   
      case "blueRange":
        this.bluePart = Number((evt.target as HTMLInputElement).value);
        break;         
      default:
        break;
    }
    // rgb omzetten naar xy...
    this.xy = this.rgbToXY(this.redPart,this.greenPart,this.bluePart);
    console.log(this.xy.toString());
    // xy verpakken in een goed formaat om later door te sturen...
    var str = "["+ String(this.xy)+"]";     
    // Het kleur van de lamp updaten via de xy property...
    this.lampenService.updateLamp(this.lampnummer,"xy",str).subscribe();
  }

  rgbToXY(r:number,g:number,b:number) : number[]{
    //console.log("red "+r);
    //console.log("green "+g);
    //console.log("blue "+b);

    var red = r;
    var green = g;
    var blue = b;

    red = red / 255;
    green = green / 255;
    blue = blue / 255;

    var re = red > 0.04045 ? Math.pow(((red + 0.055) / 1.055), 2.4000000953674316) : red / 12.92;
    var gr = green > 0.04045 ? Math.pow(((green + 0.055) / 1.055), 2.4000000953674316) : green / 12.92;
    var bl = blue > 0.04045 ? Math.pow(((blue + 0.055) / 1.055), 2.4000000953674316) : blue / 12.92;

    var x = re * 0.664511 + gr * 0.154324 + bl * 0.162028;
    var y = re * 0.283881 + gr * 0.668433 + bl * 0.047685;
    var z = re * 8.8E-5   + gr * 0.07231  + bl * 0.986039;

    var xy = [x / (x + y + z), y / (x + y + z)];
    return xy;
  }

  XYToRGB(XY:number[]) : void{
    var x = XY[0];
    var y = XY[1];
    var z = 1.0 - x - y;
    
    var Y = 1.0; 
    var X = (Y / y) * x;
    var Z = (Y / y) * z;
    
    // Convert to RGB using Wide RGB D65 conversion
    var r =  X * 1.656492 - Y * 0.354851 - Z * 0.255038;
    var g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
    var b =  X * 0.051713 - Y * 0.121364 + Z * 1.011530;

    // Apply reverse gamma correction
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;

    // De sliders afstemmen op de huidige kleur van de lamp...
    this.redPart = r*255;
    this.greenPart = g*255;
    this.bluePart = b*255;
  }

}
