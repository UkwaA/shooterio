import { Component, OnInit } from '@angular/core';
import { Bullet } from './data/Bullet';
import { Item } from './data/Item';
import { Map } from './data/Map';
import { Player } from './data/Player';
import { Tile } from './data/Tile';
import { Weapon } from './data/Weapon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  gamebox: HTMLElement;
  map:Map;
  board = [];
  player_direction:string
  
  num_rows:number = 5;
  num_cols:number = 5;

  mousePos:number = 0;
  mouseX:number = 0;
  mouseY:number = 0;
  trackMouse:boolean = false;
  player1:Player;
  player1Rotation:number = 0;

  ngOnInit(){
    this.gamebox = document.getElementById('gamebox');
    this.map = new Map();
    this.map.addPlayer();
    this.player1 = this.map.players[0];
    // this.player1Rotation  = this.player1.rotation;
    // this.map.addPlayer('zombie');
    this.player1.setWeapon(new Weapon());
    
    this.board = this.map.map;
    console.log(this.board);

    this.gamebox.onclick = (e) => {
      console.log(this.mouseY + ',' + this.mouseX);
      console.log(this.player1.coords);
      console.log(this.player1.rotation);
      let new_bullet = this.player1.weapon.assault(Number(this.player1.rotation), this.player1.coords, Math.tan(this.player1.rotation) );
      // new_bullet.rotation = Number(this.player1Rotation);
      console.log(new_bullet);
      new_bullet.index = this.board.length;
      this.board.push(new_bullet);
      this.map.shoot(new_bullet);
    }

    document.onkeydown = (e) => {
      let player1 = this.player1;
      switch(e.key){
          case "w":
            if (player1)
              this.map.walk('up', player1);
              break;
          case "a":
            if (player1)
            this.map.walk('left', player1);
            break;
          case "d":
            if (player1)
            this.map.walk('right', player1);
            break;
          case "s":
            if (player1)
              this.map.walk('down', player1);
              break;
          default:
            console.log(e.key);
            break;
      }
    }
  }

  toggleMouseTracker(){
    this.trackMouse = !this.trackMouse;
    console.log(this.trackMouse);
  }

  changeAngle(e){
    let box = e.target.getBoundingClientRect();
    this.mouseX = e.clientX - box.left;
    // console.log(this.mouseX);
    this.mouseY = box.bottom - e.clientY;
    // console.log(this.mouseY);
    let yCoord = this.player1.coords[1] + 30;
    let xCoord = this.player1.coords[0] + 40;
    // console.log(this.player1.coords[1])
    

    this.player1.rotation = -Math.atan2(this.mouseY-yCoord, this.mouseX-xCoord) * 180 / Math.PI;
  }
}
