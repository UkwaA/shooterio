import { Item } from './Item';

export class Bullet extends Item{
    slope:number;
    damage:number;
    range_left:number;
    
    constructor(coords:number[], slope:number, damage:number, range:number){
        super();
        this.itemType = 'bullet';
        this.img = 'weapon/bullet_right.png';
        this.slope = slope;
        this.coords = coords;
        this.damage = damage;
        this.range_left = range;
    }

    active(){
        return this.range_left > 0;
    }

    incrementRange(){
        --this.range_left;
    }

    get degrees(){
        return 0;
    }
}