import { prop, getModelForClass } from "@typegoose/typegoose";
import { Part } from "./part";

export class Build {
    @prop({required: true})
    public buildNumber?: number;

    @prop({required: true})
    public buildName?: string;

    @prop({required: true})
    public image?: string;

    @prop({required: true})
    public buildModel?: string;

    @prop({required: true})
    public amount?: number;

    @prop({type: () => [Part], required: true})
    public parts?: Part[];

}

export const BuildModel = getModelForClass(Build)

