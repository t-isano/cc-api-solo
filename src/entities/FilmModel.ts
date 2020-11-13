import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "films" })
class Films {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({
    length: 100,
  })
  public name: string;

  @Column()
  public releasedYear: number;
}

export default Films;
