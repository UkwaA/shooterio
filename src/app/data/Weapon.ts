export class Weapon{
    name:string;
    damage:number;
    range:number;
    speed:number;
    cooldown:number;

    constructor(name:string = 'pistol', damage:number = 25, 
        range:number = 4, speed:number = 1000){
        this.name = name;
        this.damage = damage;
        this.range = range;
        this.speed = speed;
    }
}