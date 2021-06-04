import { Context, Middleware } from "koa";
import Router, { RouterContext } from "koa-tree-router";

declare namespace API {
  export interface CreateScreenshotRequest {
    body: {
      /**
       * template's name
       */
      template?: string;
      /**
       * screenshot width
       */
      width?: number;
      /**
       * screenshot height
       */
      height?: number;
      /**
       * data to be replaced in template
       */
      data?: {
        key?: string;
        value?: string;
      }[];
    };
  }
  export interface CreateScreenshotResponse {
    body: {
      /**
       * uri of screenshot result
       */
      uri?: string;
      /**
       * will delete the screenshot unitl expiredAt
       */
      expiredAt?: string;
    };
  }
  type Context<StateT, CustomT = {}> = RouterContext<StateT, CustomT>;
}

declare class API {
  middleware(operation: string): Array<Middleware>;
  bind(router: Router): API;
  createScreenshot(
    req: API.CreateScreenshotRequest,
    ctx: API.Context
  ): Promise<API.CreateScreenshotResponse>;
}

export = API;
