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


  ngOnInit(){
    this.gamebox = document.getElementById('gamebox');
    this.map = new Map(10,10);
    this.map.addPlayer();
    this.map.addPlayer();
    this.players = this.map.players;
    this.players[0].setWeapon(new Weapon());
    this.players[1].setWeapon(new Weapon());
    this.board = this.map.map;
    console.log(this.board);

    document.onkeydown = (e) => {
      let player1 = this.players[0];
      let player2 = this.players[1];
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
          case "x":
            if (player1){
              if (!player1.bullet_fired){
                let bullet = player1.fireWeapon(player1.direction, [player1.coords[0],player1.coords[1]]);
                console.log(bullet);
                if (this.map.checkDirection(bullet.direction, bullet.coords) == 'player')
                  player2.hit(25)
                else
                  this.map.shoot(bullet, player1, player2, 0);
              }
            }
            break;
          case "ArrowUp":
            if (player2)
              this.map.walk('up', player2);
              break;
          case "ArrowLeft":
            if (player2)
            this.map.walk('left', player2);
            break;
          case "ArrowRight":
            if (player2){
                this.map.walk('right', player2);
            }
            break;
          case "ArrowDown":
            if (player2)
              this.map.walk('down', player2);
              break;
          case " ":
            if (player2){
              if (!player2.bullet_fired){
                let bullet = player2.fireWeapon(player2.direction, [player2.coords[0],player2.coords[1]]);
                console.log(bullet);
                if (this.map.checkDirection(bullet.direction, bullet.coords) == 'player')
                  player1.hit(25)
                else
                  this.map.shoot(bullet, player2, player1, 0);
              }
            }
              break;
          default:
            console.log(e.key);
            break;
      }
    }
  }
}
