import { HostBinding } from '@angular/core';
import { Item } from './Item';
import { Weapon } from './Weapon';

export class Player extends Item{
    direction:string;
    health:number = 100;
    weapon:Weapon;
    speed:number = 1000;
    player_num:number;
    bullet_fired:boolean;
    img:string;

    constructor(name:string, direction:string, color:string = 'black',
        img:string='player/black_right.png', coords:number[] = [2,2],){
        super();
        this.x_coord = 10;
        this.name = name;
        this.itemType = 'player';
        this.direction = direction;
        this.coords = coords;
        this.img = 'player/black_right.png';
        this.color = color;
    }

    get x_coords(){
        return this.x_coord + 'px';
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
        this.img = 'player/black_'+direction+'.png';
    }
}