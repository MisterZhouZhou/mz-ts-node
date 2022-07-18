import Koa from 'koa';
import koaBody from 'koa-body';
import koaServe from 'koa-static';
import { Sequelize } from 'sequelize-typescript';
import routerLoader from './utils/decors';
import middlewareLoader from './utils/middlewares';

const app = new Koa();

// 数据库
const database = new Sequelize({
  host: 'mysql',
  port: 3306,
  database: 'mz_service',
  username: 'root',
  password: '123456',
  dialect: 'mysql',
  modelPaths: [__dirname + '/model']
});
database.sync({ force: true });

// 中间件
app.use(koaServe(__dirname + '/public'));
app.use(koaBody({
  multipart: true,
  strict: false, // 可以使用del
}));

// 注册error handler
// app.use(errorHandler());

// 自动加载中间件
middlewareLoader(app, __dirname + '/middlewares');

// 注册路由
const router = routerLoader(require('path').resolve(__dirname, 'routes'));
app.use(router.routes());

// app.use(async (ctx, next) => {
//   ctx.body = 'hello mz';
//   await next();
// });

app.on('error', (data) => {
  console.log('=============== error catch ===============\n', data.message);
});

app.listen(3000, () => {
  console.log('服务器运行于：http://127.0.0.1:3000');
});