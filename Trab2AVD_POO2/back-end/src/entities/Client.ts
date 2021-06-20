import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Column } from 'typeorm'

import { v4 as uuid } from 'uuid' // identificador universal unico

@Entity('clients')
class Client {

  @PrimaryColumn()
  id: string;

  @Column()
  cliente: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Client }

// let client = new Client() // instanciar 

// migrations - para criar a tabela no BD
// entidade - representa a tabela na aplicacao