import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Characters from "./CharacterModel";

@Entity({ name: "gender" })
class Gender {
  @PrimaryGeneratedColumn()
  public id: number;

  // male or female or other
  @Column()
  public name: string;
}

export default Gender;
