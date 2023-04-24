import { Ref, prop } from "@typegoose/typegoose";
import { Inventory } from "./inventory";

export class Part {
    @prop({ref: Inventory, required: true})
    public partId?: Ref<Inventory>;

    @prop({required: false})
    public amountNeeded?: number;

}

