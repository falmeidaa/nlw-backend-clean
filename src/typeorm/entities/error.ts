import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('erros')
export class Error {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  date: Date

  @Column({ name: 'error_stack' })
  errorStack: number

  @Column()
  isResolved: boolean
}
