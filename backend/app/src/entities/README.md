# Entities

All the entities will be placed here created with **te service:create** or **te service:create -n [name]**

## Demo code

```typescript
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean
}
```

[click here](https://github.com/typeorm/typeorm/blob/master/docs/entities.md) to Learn more about entities.
