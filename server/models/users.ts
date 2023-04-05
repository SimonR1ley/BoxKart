import { prop, getModelForClass } from "@typegoose/typegoose";

class Users {
    @prop({required: true})
    public username?: string;

    @prop({required: true})
    public name?: string;
    
    @prop({required: true})
    public surname?: string;

    @prop({required: true})
    public email?: string;

    @prop({required: true})
    public password?: number;


    // public inventory? : 


}

export const UsersModel = getModelForClass(Users)