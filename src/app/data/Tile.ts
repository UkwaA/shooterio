import { Item } from './Item';

export class Tile{
    empty:boolean = true;
    item:Item;
    pickup:Item;
    itemType:string = '';
    color:string = 'black';
    img:string = 'empty.png';

    constructor(){}

    setTile(item:Item){
        this.empty = false;
        this.item = item;
        this.itemType = item.itemType;
        this.color = item.color;
        this.img = item.img;
    }
    
    emptyTile(){
        this.empty = true;
        this.item = null;
        this.itemType = '';
        this.color = 'black';
        this.img = 'empty.png';
    }

    hasPlayer():boolean{
        if (this.itemType == 'player')
            return true;
        return false;
    }

}