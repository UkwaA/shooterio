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
  players:Player[] = [];
  player_direction:string
  
  num_rows:number = 5;
  num_cols:number = 5;

  mousePos:number = 0;
  trackMouse:boolean = false;
  player1:Player;

  ngOnInit(){
    this.gamebox = document.getElementById('gamebox');
    this.map = new Map();
    this.map.addPlayer();
    // this.map.addPlayer('zombie');
    this.players = this.map.players;
    this.players[0].setWeapon(new Weapon());
    this.player1 = this.players[0];
    this.board = this.map.map;
    console.log(this.board);

    this.gamebox.onclick = (e) => {
      this.map.shoot(this.player1.weapon.assault(this.player1.coords, 0));
    }

    document.onkeydown = (e) => {
      let player1 = this.players[0];
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
    let mouseX = e.clientX - box.left;
    let mouseY = e.clientY - box.top;
    let yCoord = this.player1.coords[1] + 40;
    let xCoord = this.player1.coords[0] + 40;
    

    this.mousePos = Math.atan2(mouseY-yCoord, mouseX-xCoord) * 180 / Math.PI;
  }
}
