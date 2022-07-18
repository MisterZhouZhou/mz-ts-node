/*
 * @Author: misterzhou
 * @Date: 2022-07-15 17:02:52
 * @LastEditTime: 2022-07-15 19:02:26
 * @LastEditors: misterzhou
 * @FilePath: /mz-ts-node/backend/src/model/user.ts
 * @Description: 
 */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ modelName: 'users' })
export default class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  public id?: number;

  @Column(DataType.CHAR)
  public name?: string;
}