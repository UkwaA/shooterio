import { Component, OnInit } from '@angular/core';
import { Player } from './data/Player';
import { Tile } from './data/Tile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shooterio';
  gamebox: HTMLElement;
  board = [[],[],[],[],[]];
  players:Player[] = [];
  player_direction:string
  
  num_rows:number = 5;
  num_cols:number = 5;


  ngOnInit(){
    this.gamebox = document.getElementById('gamebox');
    this.players.push(new Player('right', 'blue', 'O>', [1,1]));
    this.players.push(new Player('right'));
    let row:Tile[],col:number;
    for (row of this.board)
      for (col = 0; col < this.num_cols; ++col)
        row.push(new Tile());
    console.log(this.board);
    let player;
    for (player of this.players)
      this.board[player.coords[0]][player.coords[1]].setTile(player);

    document.onkeydown = (e) => {
      let player1 = this.players[0];
      let player2 = this.players[1];
      switch(e.key){
          case "w":
            if (player1)
              this.walk('up', player1);
              break;
          case "a":
            if (player1)
            this.walk('left', player1);
            break;
          case "d":
            if (player1)
            this.walk('right', player1);
            break;
          case "s":
            if (player1)
              this.walk('down', player1);
              break;
          case "x":
            if (player1)
            if (this.checkDirection(player1.direction, player1.coords)){
              let bullet_coords = [player1.coords[0],player1.coords[1]];
              this.shoot(player1.direction, player1, player2, bullet_coords, 0);
            }
            break;
          case "ArrowUp":
            if (player2)
              this.walk('up', player2);
              break;
          case "ArrowLeft":
            if (player2)
            this.walk('left', player2);
            break;
          case "ArrowRight":
            if (player2)
            this.walk('right', player2);
            break;
          case "ArrowDown":
            if (player2)
              this.walk('down', player2);
              break;
          case " ":
            if (player2)
            // let check = this.checkDirection(player2.direction, player2.coords);
              if (this.checkDirection(player2.direction, player2.coords)){
                let bullet_coords = [player2.coords[0], player2.coords[1]];
                this.shoot(player2.direction, player2, player1, bullet_coords, 0);
              }
              break;
          default:
            console.log(e.key);
            break;
      }
    }
  }

  walk(direction:string, player:Player){
    if (direction == 'up'){
      if (this.checkDirection('up', player.coords) == 1){
        player.img = 'O/\\';
        this.moveItem(direction, player.coords,player);
        player.coords[0]-=1;
        player.direction = 'up';
      }
    }
    else if (direction == 'down'){
      if (this.checkDirection('down', player.coords) == 1){
        player.img = 'O\\/';
        this.moveItem(direction, player.coords, player);
        player.coords[0]+=1;
        player.direction = 'down';
      }
    }
    else if (direction == 'left'){
      if (this.checkDirection('left', player.coords) == 1){
        player.img = '<O';
        this.moveItem(direction, player.coords, player);
        player.coords[1]-=1;
        player.direction = 'left';
      }
    }
    else if (direction == 'right'){
      if (this.checkDirection('right', player.coords) == 1){
        player.img = 'O>';
        this.moveItem(direction, player.coords, player);
        player.coords[1]+=1;
        player.direction = 'right';
      }
    }
  }

shoot(direction, player, player2, bullet_coords,type?){
  if (player.bullet_fired)
    return;
  player.bullet_fired = true;
  if (type != 0)
      this.board[bullet_coords[0]][bullet_coords[1]] = '.';
  switch (direction){
      case 'up':
          this.moveItem(direction, bullet_coords, '|', 'bullet');
          bullet_coords[0] -= 1;
          break;
      case 'down':
          this.moveItem(direction, bullet_coords, '|', 'bullet');
          bullet_coords[0] += 1;
          break;
      case 'left':
          this.moveItem(direction, bullet_coords, '--', 'bullet');
          bullet_coords[1] -= 1;
          break;
      case 'right':
          this.moveItem(direction, bullet_coords, '--', 'bullet');
          bullet_coords[1] += 1;
          break;
    }

    setTimeout(() => {
      player.bullet_fired = false;
      switch (this.checkDirection(direction, bullet_coords)){
        case 1:
          this.shoot(direction, player, player2, bullet_coords);
          break;
        case -1:
          this.board[bullet_coords[0]][bullet_coords[1]] = '.'; 
          if (player2.hit(25)){
            this.board[player2.coords[0]][player2.coords[1]] = '.';
            this.players.splice(1,1);
          }
          break;
        case 0:
          this.board[bullet_coords[0]][bullet_coords[1]] = '.'; 
          break;
        default:
          console.log('default');
          console.log(this.checkDirection(direction, bullet_coords));
          break;
      }           
    }, 300)
  }

  moveItem(direction, item_coords, item, type='player'){
    if (type == 'player')
      this.board[item_coords[0]][item_coords[1]].emptyTile();

    switch (direction){
      case 'up':
          console.log('up');
          this.board[item_coords[0]-1][item_coords[1]].setTile(item);
          break;
      case 'down':
          this.board[item_coords[0]+1][item_coords[1]].setTile(item);
          break;
      case 'left':
          this.board[item_coords[0]][item_coords[1]-1].setTile(item);
          break;
      case 'right':
          this.board[item_coords[0]][item_coords[1]+1].setTile(item);
          break;
    }
  }

  checkDirection(direction, curr_coords){
    let new_coords;
    switch (direction){
      case 'up':
          new_coords = [curr_coords[0]-1, curr_coords[1]];
          break;
      case 'down':
          new_coords = [curr_coords[0]+1, curr_coords[1]];
          break;
      case 'left':
          new_coords = [curr_coords[0], curr_coords[1]-1];
          break;
      case 'right':
          new_coords = [curr_coords[0], curr_coords[1]+1];
          break;
    }
    if (new_coords[0] >= 0 && new_coords[0] < this.num_rows)
      if (new_coords[1] >= 0 && new_coords[1] < this.num_cols)
        switch (this.board[new_coords[0]][new_coords[1]].itemType){
          case '':
            console.log('.');
            return 1;
          case 'player':
            console.log('O');
            return -1;
          default:
            console.log('checkDir default: ' + this.board[new_coords[0]][new_coords[1]].itemType);
            return -1;
        }
    return 0;
  }
}
