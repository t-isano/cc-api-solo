import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Characters from "./CharacterModel";
import Films from "./FilmModel";

@Entity({ name: "appear" })
class Appear {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @ManyToOne((type) => Characters, (character) => character.id)
  @JoinColumn()
  public character: Characters;

  @ManyToOne((type) => Films, (film) => film.id)
  @JoinColumn()
  public film: Films;
}

export default Appear;
