/*
 * @Author: misterzhou
 * @Date: 2022-07-15 13:49:40
 * @LastEditTime: 2022-07-18 14:54:11
 * @LastEditors: misterzhou
 * @FilePath: /mz-ts-node/backend/src/routes/user.ts
 * @Description: 
 */
import Koa from 'koa';
import { get, post, middlewares } from '../utils/decors';
import { guard } from '../contract/accessToken';
import { validation } from '../contract/user';
import model from '../model/user';

const users = [{ name: 'tome'}];

// @middlewares([ guard ])
class User {
  @get('/users', {
    prefix: '/api'
  })
  public async list(ctx: Koa.Context) {
    const userList = await model.findAll();
    ctx.body = { ok: 1, data: userList };
  }

  @post('/users', {
    middlewares: [validation]
  })
  public add(ctx: Koa.Context) {
    users.push(ctx.request['body']);
    ctx.body = { ok: 1, data: ctx.request['body'] };
  }
}

export default User;