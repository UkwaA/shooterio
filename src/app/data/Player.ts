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

    constructor(direction:string, color:string = 'black',
        img:string='O>', coords:number[] = [2,2],){
        super();
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
}