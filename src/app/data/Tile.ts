import { Item } from './Item';

export class Tile{
    empty:boolean = true;
    item:Item;
    pickup:Item;
    itemType:string = '';
    emptyItem:Item = new Item();

    constructor(){
        this.item = this.emptyItem;
    }

    setTile(item:Item){
        this.empty = false;
        this.item = item;
        this.itemType = item.itemType;
    }
    
    emptyTile(){
        this.empty = true;
        this.item = this.emptyItem;
        this.itemType = '';
    }

    hasPlayer():boolean{
        if (this.itemType == 'player')
            return true;
        return false;
    }

}