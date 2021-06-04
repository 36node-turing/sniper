//@ts-check

import * as schemas from "./screenhost.schema.js";
import { validate } from "../middlewares";

/**
 * @typedef {Object} State
 */

export default class {
  /**
   * Bind service to router
   *
   * @param {import("koa-tree-router")} router the koa compatible router
   * @returns {this}
   */
  bind(router) {
    const createScreenshot = async ctx => {
      const req = {
        body: ctx.request.body,
      };
      const res = await this.createScreenshot(req, ctx);
      ctx.body = res.body;
      ctx.status = 201;
    };

    router.post(
      "/screenshots",
      validate(
        schemas.createScreenshotReqSchema,
        schemas.createScreenshotResSchema
      ),
      ...this.middlewares("createScreenshot"),
      createScreenshot
    );

    return this;
  }

  /**
   * implement following abstract methods in the inherited class
   */

  /**
   * Ability to inject some middlewares
   *
   * @abstract
   * @param {string} operation name of operation
   * @returns {Array<import("koa").Middleware<State>>} middlewares
   */
  middlewares(operation) {
    return [];
  }

  /**
   * Create a screenshot
   *
   * @abstract
   * @param {import("../api/screenhost").CreateScreenshotRequest} req createScreenshot request
   * @param {import("../api/screenhost").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/screenhost").CreateScreenshotResponse>} The Screenshot created
   */
  createScreenshot(req, ctx) {
    throw new Error("not implemented");
  }
}
