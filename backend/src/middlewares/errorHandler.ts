/*
 * @Author: misterzhou
 * @Date: 2022-07-15 14:52:46
 * @LastEditTime: 2022-07-15 15:48:22
 * @LastEditors: misterzhou
 * @FilePath: /mz-ts-node/src/middlewares/errorHandler.ts
 * @Description: 
 */
import Koa from 'koa';

const errorHandler = (): Koa.Middleware<{}> => {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      // 没有报错直接跳过
      await next();
    } catch (err: any) {
      ctx.app.emit('error', err, this);
      const status = err.status || 500;
      const error = status === 500 && process.env.NODE_ENV === 'prod' ? 'Internal Server Error' : err.message;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: status,
        // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑 错误533开始 )
        // 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
        msg: error,
      };
      ctx.status = 200;
    }
  }
}

export default errorHandler;