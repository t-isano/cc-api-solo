import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Gender from "./Gender";
import Types from "./Types";

@Entity({ name: "characters" })
class Characters {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    length: 100,
  })
  public realName: string;

  @Column({
    length: 100,
  })
  public superName: string;

  @Column()
  public genderId: number;

  @Column()
  public typesId: number;
}

export default Characters;
