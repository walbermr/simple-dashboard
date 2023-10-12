import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("operation")
class Operation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    ticker: string;

    @Column("integer")
    quantity: number;

    @Column("float")
    price: number;

    @Column("text")
    operationType: string;

    @Column("date")
    date: string;

    @Column("text")
    broker: string;
}

export { Operation }