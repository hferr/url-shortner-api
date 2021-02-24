import moment = require("moment");
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class URL {

    constructor(id: string, originalUrl: string, creationDate: Date) {
        this.id = id;
        this.originalUrl = originalUrl;
        this.creationDate = creationDate;
    }

    @PrimaryColumn()
    public id: string;

    @Column()
    public originalUrl: string;

    @Column()
    public creationDate: Date;
}
