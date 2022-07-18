/*
 * @Author: misterzhou
 * @Date: 2022-07-15 15:49:06
 * @LastEditTime: 2022-07-15 15:50:28
 * @LastEditors: misterzhou
 * @FilePath: /mz-ts-node/src/middlewares/accessToken.ts
 * @Description: 
 */
import Koa from 'koa';

// 鉴权
export async function guard(ctx: Koa.Context, next: () => Promise<any>) {
  if (!ctx.header.token) {
    ctx.throw(400, '登录超时，请先登录!');
  }
  await next();
}
