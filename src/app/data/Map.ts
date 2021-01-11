import { Bullet } from './Bullet';
import { Item } from './Item';
import { Player } from './Player';
import { Tile } from './Tile';

export class Map{
    map:Item[] = [];
    players:Player[] = [];
    zombies:Player[] = [];
    player_colors:string[] = ['yellow','purple','black','red',];
    player_nums:string[] = ['Player2','Player3','Player4','Player1'];
    num_players:number = 0;

    constructor(){
    }

    addPlayer(type:string='player'){
        if (this.num_players >= 4)
            return;
        let x_coord:number = Math.floor(Math.random() * 560);
        let y_coord:number = Math.floor(Math.random() * 540);
        x_coord -= x_coord%10;
        y_coord -= y_coord%10;

        let new_player = new Player(type, 'right', this.player_colors.pop(), [x_coord,y_coord]);
        this.map.push(new_player);
        this.players.push(new_player);
        // this.player_nums.splice(1,1);
        // this.player_colors.splice(1,1);
    }

    walk(direction:string, player:Player){
        if (this.checkDirection(direction, player.coords) == 'empty'){
            this.moveItem(direction, player);
        }
      }

    shoot(bullet:Bullet){
        // console.log(bullet);
        // console.log(bullet.img);
        // console.log('shoot');

        if (bullet.active()){
            bullet.incrementRange();
            this.moveBullet(bullet);
            setTimeout( () => this.shoot(bullet), 50);
        }
        else{
            let index = this.map.indexOf(bullet);
            this.map.splice(index, 1);
            // this.map.
        }
        // else{ 
        //     this.map[bullet.coords[0]][bullet.coords[1]].emptyTile();
        //     return;
        // }

        // switch (this.checkDirection(bullet.direction, bullet.coords)){
        //     case 'empty':
        //         this.moveItem(bullet.direction, bullet);
        //         this.map[player.coords[0]][player.coords[1]].setTile(player); 
        //         setTimeout(() =>  this.shoot(bullet, player, player2), 300);
        //         break;
        //     // case 'player':
        //     //     this.map[bullet.coords[0]][bullet.coords[1]].emptyTile(); 
        //     //     if (player2.hit(bullet.damage)){
        //     //         this.map[player2.coords[0]][player2.coords[1]].emptyTile();
        //     //     this.players.splice(1,1);
        //     //     }
        //     //     break;
        //     // case 'bullet':
        //     //     setTimeout(() => this.map[bullet.coords[0]][bullet.coords[1]].emptyTile(), 500);
        //     //     break;
        //     case 'undefined':
        //         console.log('undefined')
        //         // this.map[bullet.coords[0]][bullet.coords[1]].emptyTile();
        //         break;
        //   }   
        }

    moveItem(direction:string, item:Item){
        switch (direction){
            case 'up':
                item.coords[1] += 10;
                break;
            case 'down':
                item.coords[1] -= 10;
                break;
            case 'left':
                item.coords[0] -= 10;
                break;
            case 'right':
                item.coords[0] += 10;
                break;
        }
    }

    moveBullet(item:Bullet){
        if (item.slope < 0)
            item.coords[0] -= 10;
        else
            item.coords[0] += 10;
        item.calculatePos();
    }

    checkDirection(direction:string, curr_coords:number[]){
        // return 'empty';

        let new_coords = curr_coords;
        switch (direction){
          case 'up':
              new_coords = [curr_coords[0], curr_coords[1]+10];
              break;
          case 'down':
              new_coords = [curr_coords[0], curr_coords[1]-10];
              break;
          case 'left':
              new_coords = [curr_coords[0]-10, curr_coords[1]];
              break;
          case 'right':
              new_coords = [curr_coords[0]+10, curr_coords[1]];
              break;
        }

        if (new_coords[0] >= 0 && new_coords[0] <= 560)
            if (new_coords[1] >= 0 && new_coords[1] <= 540)
                return 'empty';
            else console.log('failed y');
        else console.log('failed x');
            
            // switch (this.map[new_coords[0]][new_coords[1]].itemType){
            //     case '':
            //         // console.log('.');
            //         return 'empty';
            //     case 'player':
            //         console.log('O');
            //         return 'player';
            //     case 'bullet':
            //         console.log('<->');
            //         return 'bullet';
            //     default:
            //         console.log('checkDir default: ' + this.map[new_coords[0]][new_coords[1]].itemType);
            //         return 'unknown';
            // }
        return 'undefined';
      }
}