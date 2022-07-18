/*
 * @Author: misterzhou
 * @Date: 2022-07-15 15:52:32
 * @LastEditTime: 2022-07-15 15:53:55
 * @LastEditors: misterzhou
 * @FilePath: /mz-ts-node/src/contract/user.ts
 * @Description: 
 */
import Koa from 'koa';

export async function validation(ctx: Koa.Context, next: () => Promise<any>) {
  // 用户名
  const { name } = ctx.request['body'];
  if (!name) {
    ctx.throw(400, '请输入用户名')
  }
  await next();
}