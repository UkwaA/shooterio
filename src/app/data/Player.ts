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

    constructor(type:string, direction:string, color:string = 'black',
        coords:number[] = [0,0],){
        super();
        // this.name = name;
        this.itemType = type;
        this.direction = direction;
        this.coords = coords;
        if (type == 'player')
            this.img = 'player/black.png'
        else if (type == 'zombie')
            this.img = 'enemy/zombie.png'
        this.color = color;
    }

    hit(amount:number){
        this.health -= amount;
        return this.health <= 0;
    }

    fireWeapon(coords:number[], slope:number){
        return this.weapon.assault(coords, slope);
    }

    setWeapon(weapon:Weapon){
        this.weapon = weapon;
    }
}