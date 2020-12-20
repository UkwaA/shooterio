import { Item } from './Item';

export class Bullet extends Item{
    direction:string;
    damage:number;
    range_left:number;
    
    constructor(direction:string, coords:number[], damage:number, range:number){
        super();
        this.itemType = 'bullet';
        this.img = 'weapon/bullet_'+direction+'.png';
        this.direction = direction;
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

    setImage(){
        if (this.direction == 'up' || this.direction == 'down')
            this.img = '/\\'
    }
}