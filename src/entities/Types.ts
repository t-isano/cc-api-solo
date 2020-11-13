import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Characters from "./CharacterModel";

@Entity({ name: "types" })
class Types {
  @PrimaryGeneratedColumn()
  public id: number;

  // hero or villain or other
  @Column()
  public name: string;
}

export default Types;
