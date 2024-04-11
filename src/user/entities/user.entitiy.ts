import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryColumn('uuid')
    public id:string;

    @Column({name:"username",type:"varchar" })
    public username:string;

    @CreateDateColumn({ name: 'createdAt' })
    public createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    public updatedAt: Date;

  public static builder() {
    return new UserEntity.Builder();
  }

  public toBuilder() {
     const builder = UserEntity.builder();
     builder.id = this.id;
     builder.username = this.username;
     builder.createdAt = this.createdAt;
     builder.updatedAt = this.updatedAt;
     return builder;
  }

    
  public static Builder = class {
    id: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    version = 0;

    public setUserName(username: string) {
      this.username = username;
      return this;
    }
    public build(includeId = true):UserEntity {
      const e = new UserEntity();
      this.updatedAt = new Date();
      if(!this.createdAt)
      this.createdAt = new Date();
      if (includeId) {
        e.id = this.id;
      }
      e.username = this.username;
      e.createdAt = this.createdAt;
      e.updatedAt = this.updatedAt; 
      return e
    }
}


}