import { Bullet } from './Bullet';
import { Item } from './Item';

export class Weapon extends Item{
    damage:number;
    range:number;
    speed:number;
    cooldown:number;
    type:string;
    belongs_to:string;

    constructor(name:string = 'pistol', damage:number = 25, 
        range:number = 100, speed:number = 1000, type:string = 'gun'){
        super();
        this.name = name;
        this.itemType = 'weapon';
        this.damage = damage;
        this.range = range;
        this.speed = speed;
        this.type = type;
    }

    assault(rotation:number, coords:number[], slope:number):Bullet{
        return new Bullet(rotation, [coords[0],coords[1]], slope, this.damage, this.range);
    }

}