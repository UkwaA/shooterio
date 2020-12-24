import { Bullet } from './Bullet';
import { Item } from './Item';
import { Player } from './Player';
import { Tile } from './Tile';

export class Map{
    map:any[] = [];
    players:Player[] = [];
    player_colors:string[] = ['black','blue','yellow','purple'];
    player_nums:string[] = ['Player1', 'Player2','Player3','Player4'];
    num_rows:number; num_cols:number;
    num_players:number = 0;

    constructor(num_rows:number, num_cols:number){
        this.num_rows = num_rows;
        this.num_cols = num_cols;
        let row:number,col:number;
        for (row = 0; row < num_rows; ++row){
            let row_array:Tile[] = [];
            for (col = 0; col < this.num_cols; ++col){
                row_array.push(new Tile());
            }
            this.map.push(row_array);
        }
    }

    addPlayer(){
        if (this.num_players >= 4)
            return;
        let x_coord:number = Math.floor(Math.random() * this.num_cols);
        let y_coord:number = Math.floor(Math.random() * this.num_rows);
        while (!this.map[x_coord][y_coord].empty){
            x_coord = Math.floor(Math.random() * this.num_cols);
            y_coord = Math.floor(Math.random() * this.num_rows);
        }
        let new_player = new Player(this.player_nums[0], 'right', this.player_colors[0], 'O>', [x_coord,y_coord]);
        this.map[x_coord][y_coord].setTile(new_player);
        this.players.push(new_player);
        this.player_nums.splice(1,1);
        this.player_colors.splice(1,1);
    }

    walk(direction:string, player:Player){
        if (this.checkDirection(direction, player) == 'empty'){
            if (direction != player.direction)
                player.switchDirection(direction);
            this.moveItem(direction, player);
        }
      }

    shoot(bullet:Bullet, player:Player, player2:Player, round?:number){
        if (!bullet.active()){
            this.map[bullet.coords[0]][bullet.coords[1]].emptyTile();
            return;
        }

        switch (this.checkDirection(bullet.direction, bullet)){
            case 'empty':
                this.moveItem(bullet.direction, bullet);
                this.map[player.coords[0]][player.coords[1]].setTile(player); 
                setTimeout(() =>  this.shoot(bullet, player, player2), 100);
                break;
            case 'player':
                this.map[bullet.coords[0]][bullet.coords[1]].emptyTile(); 
                if (player2.hit(bullet.damage)){
                    this.map[player2.coords[0]][player2.coords[1]].emptyTile();
                this.players.splice(1,1);
                }
                break;
            case 'bullet':
                setTimeout(() => this.map[bullet.coords[0]][bullet.coords[1]].emptyTile(), 500);
                break;
            case 'undefined':
                this.map[bullet.coords[0]][bullet.coords[1]].emptyTile();
                break;
          }   
        }

    moveItem(direction:string, item:Item){    
        switch (direction){
            case 'up':
                item.y_coord -= 10;
                // console.log('+5: ' + item.y_coord);

                if (item.y_coord < -20){
                    if (item.itemType == 'bullet')
                        (<Bullet>item).incrementRange();
                    console.log('next tile');
                    this.map[item.coords[0]][item.coords[1]].emptyTile();
                    this.map[item.coords[0]-1][item.coords[1]].setTile(item);
                    item.coords[0] -= 1;
                    item.y_coord = 10;
                }
                break;
          case 'down':
            item.y_coord += 10;
            // console.log('+5: ' + item.y_coord);

            if (item.y_coord > 20){
                if (item.itemType == 'bullet')
                    (<Bullet>item).incrementRange();
                console.log('next tile');
                this.map[item.coords[0]][item.coords[1]].emptyTile();
                this.map[item.coords[0]+1][item.coords[1]].setTile(item);
                item.coords[0] += 1;
                item.y_coord = -10;
            }
              break;
          case 'left':
            item.x_coord -= 15;
            // console.log('-5: ' + item.x_coord);

            if (item.x_coord < -30){
                if (item.itemType == 'bullet')
                    (<Bullet>item).incrementRange();
              console.log('next tile');
              this.map[item.coords[0]][item.coords[1]].emptyTile();
              this.map[item.coords[0]][item.coords[1]-1].setTile(item);
              item.coords[1] -= 1;
              item.x_coord = 15;
            }
              break;
          case 'right':
              item.x_coord += 15;
            //   console.log('+5: ' + item.x_coord);

              if (item.x_coord > 30){
                if (item.itemType == 'bullet')
                    (<Bullet>item).incrementRange();
                // console.log('next tile');
                this.map[item.coords[0]][item.coords[1]].emptyTile();
                this.map[item.coords[0]][item.coords[1]+1].setTile(item);
                item.coords[1] += 1;
                item.x_coord = -15;
              }
              break;
        }
    }

    checkDirection(direction:string, item:Item){
        let new_coords = item.coords;
        switch (direction){
            case 'up':
                if (item.y_coord <= -20)
                    new_coords = [item.coords[0]-1, item.coords[1]];
                break;
            case 'down':
                if (item.y_coord >= 20)
                    new_coords = [item.coords[0]+1, item.coords[1]];
                break;
            case 'left':
                if (item.x_coord <= -30)
                    new_coords = [item.coords[0], item.coords[1]-1];
                break;
            case 'right':
                if (item.x_coord >= 30)
                    new_coords = [item.coords[0], item.coords[1]+1];
                break;
        }
        if (new_coords == item.coords)
            return 'empty';
        console.log(new_coords);
        if (new_coords[0] >= 0 && new_coords[0] < this.num_rows)
          if (new_coords[1] >= 0 && new_coords[1] < this.num_cols)
            switch (this.map[new_coords[0]][new_coords[1]].itemType){
                case '':
                    // console.log('.');
                    return 'empty';
                case 'player':
                    console.log('O');
                    return 'player';
                case 'bullet':
                    console.log('<->');
                    return 'bullet';
                default:
                    console.log('checkDir default: ' + this.map[new_coords[0]][new_coords[1]].itemType);
                    return 'unknown';
            }
        return 'undefined';
    }
}