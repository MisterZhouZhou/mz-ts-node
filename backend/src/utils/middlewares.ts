/*
 * @Author: misterzhou
 * @Date: 2022-07-18 14:35:47
 * @LastEditTime: 2022-07-18 14:54:49
 * @LastEditors: misterzhou
 * @FilePath: /mz-ts-node/backend/src/utils/middlewares.ts
 * @Description: 
 */
import Koa from 'koa';
import glob from 'glob';

// 自动加载中间件
const middlewareLoader = (app: Koa, folder: string) => {
  const extname = '.{js,ts}'
  glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach(file => {
    app.use(require(file).default());
  });
}


export default middlewareLoader;