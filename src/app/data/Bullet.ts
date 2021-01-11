import { Item } from './Item';

export class Bullet extends Item{
    slope:number;
    damage:number;
    range_left:number;
    b:number;
    
    constructor(rotation:number, coords:number[], slope:number, damage:number, range:number){
        super();
        this.itemType = 'bullet';
        this.img = 'weapon/bullet_right.png';
        this.rotation = rotation;
        this.slope = slope;
        this.coords = coords;
        this.b = this.coords[1] - this.slope * this.coords[0];
        console.log(this.b);
        // this.coords[0] += 40;
        // this.coords[1] += 40;
        this.damage = damage;
        this.range_left = range;
    }

    active(){
        return this.range_left > 0;
    }

    incrementRange(){
        this.range_left -= 10;
    }

    calculatePos(){
        this.coords[1] = this.slope * this.coords[0] + this.b;
    }
}