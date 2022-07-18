import KoaRouter from 'koa-router';
import Koa from 'koa';
import glob from 'glob';

type HttpMethod = 'get' | 'post' | 'put' | 'del' | 'patch';

type LoadOptions = {
  // 路由文件扩展名，默认是'.{js,ts}'
  extname?: string;
}

type RouteOptions = {
  // 适用于某个请求的特殊情况，需要单独指定前缀
  prefix?: string;
  // 给当前路由添加一个或多个中间件
  middlewares?: Array<Koa.Middleware>;
}

const router = new KoaRouter();

// 独立路由函数
export const decorate = (method: HttpMethod, path: string, options: RouteOptions = {}, router: KoaRouter) => {
  return (target, property: string) => {
    // 因为方法的装饰器优先类装饰器先执行，因此如果想在执行方法装饰器前限制性类装饰器，需要慢一拍执行方法装饰器
    process.nextTick(() => {
      const middlewares: Array<Koa.Middleware> = [];
      if (target.middlewares) {
        middlewares.push(...target.middlewares);
      }
      // 添加中间件
      if (options.middlewares) {
        middlewares.push(...options.middlewares);
      }
      // 先处理中间件后执行函数调用
      middlewares.push(target[property]);
      const url = options.prefix ? options.prefix + path : path;
      // 中间件配置
      router[method](url, ...middlewares);
    });
  }
}

// 方法装饰器
export const method = (method: HttpMethod) => (path: string, options?: RouteOptions) => decorate(method, path, options, router);
export const get = method('get');
export const post = method('post');
export const del = method('del');
export const put = method('put');
export const patch = method('patch');

// 类装饰器
export const middlewares = (middlewares: Array<Koa.Middleware>) => {
  return (target) => {
    target.prototype.middlewares = middlewares;
  }
}

const routerLoader = (folder: string, options: LoadOptions={}): KoaRouter => {
  const extname = options.extname || '.{js,ts}'
  glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach(file => require(file));
  return router
}

export default routerLoader;