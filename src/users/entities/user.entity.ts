import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/entities/role.entity';
import { BeforeUpdate } from 'typeorm';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  firstName?: string;
  @Column()
  lastName?: string;
  @Column()
  password?: string;
  @Index({ unique: true })
  @Column()
  email?: string;
  @Index({ unique: true })
  @Column()
  phone?: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at?: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at?: Date;

  async hashpassword(password) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
  async comparePassword(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  }
}
