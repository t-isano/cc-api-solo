import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
  public gender: number;

  // Heros or Villans or other?
  @Column()
  public types: number;
}

export default Characters;
