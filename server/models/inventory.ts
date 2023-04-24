import { prop, getModelForClass } from "@typegoose/typegoose";

export class Inventory {
    
    @prop({required: false})
    public userId?: string;
    
    // @prop({required: true})
    // public location?: string;
    @prop({required: true})
    public name?: string;
    
    @prop({required: true})
    public type?: string;

    @prop({required: true})
    public img?: string;

    @prop({required: true})
    public modelLink?: string;

    @prop({required: true})
    public qtySA?: number;

    @prop({required: true})
    public qtyUSA?: number;

    @prop({required: true})
    public qtyAus?: number;

    @prop({required: true})
    public qtyGarage?: number;

    @prop({required: true})
    public amount?: number;



}

export const InventoryModel = getModelForClass(Inventory)






// rmand Pretorius09:27
// item: item
// {_id: item.id, name: item.name....}
// Armand Pretorius09:30
// 3 locations, each with an array of each inventory - option 1
// inventory: object, 3 additional amount:
// -amountLocation1: 10,
// -amoutnLocation2: 20
// -amoiuntLocation3: 30
// Armand Pretorius09:32
// User -> 3 locations -> each location has an inventory
// public inventory?: Inventory[]
// Armand Pretorius09:33
// user has 3 location (an array of the location)

// each of your lcoation has an array of inventory
// array of recipes