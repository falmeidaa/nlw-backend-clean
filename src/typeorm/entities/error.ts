import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('errors')
export class Error {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  date: Date

  @Column({ name: 'error_stack' })
  errorStack: string

  @Column()
  isResolved: boolean
}
