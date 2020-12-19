import { Item } from './Item';
import { Weapon } from './Weapon';

export class Player extends Item{
    direction:string;
    health:number = 100;
    coords:number[];
    weapon:Weapon;
    speed:number = 1000;
    player_num:number;
    bullet_fired:boolean;
    img:string;

    constructor(name:string, direction:string, color:string = 'black',
        img:string='O>', coords:number[] = [2,2],){
        super();
        this.name = name;
        this.itemType = 'player';
        this.direction = direction;
        this.coords = coords;
        this.img = img;
        this.color = color;
    }

    hit(amount:number){
        this.health -= amount;
        return this.health <= 0;
    }

    fireWeapon(direction:string, coords:number[]){
        return this.weapon.assault(direction, coords);
    }

    setWeapon(weapon:Weapon){
        this.weapon = weapon;
    }

    switchDirection(direction:string){
        this.direction = direction;
        switch (direction){
            case 'up':
                this.img = 'O/\\';
                break;
            case 'left':
                this.img = '<O';
                break;
            case 'right':
                this.img = 'O>';
                break;
            case 'down':
                this.img = 'O\\/';
                break;
        }
    }
}