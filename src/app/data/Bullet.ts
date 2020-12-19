import { Item } from './Item';

export class Bullet extends Item{
    direction:string;
    coords:number[];
    range_left:number;
    
    constructor(direction:string, coords:number[], range:number){
        super();
        this.itemType = 'bullet';
        this.img = '<->';
        this.direction = direction;
        this.coords = coords;
        this.range_left = range;
    }

    active(){
        return this.range_left > 0;
    }

    incrementRange(){
        --this.range_left;
    }
}