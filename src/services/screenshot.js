// @ts-check

import Debug from "debug";
import puppeteer from "puppeteer";
import fs from "fs";
import createError from "http-errors";
import Handlebars from "handlebars";

import API from "../api/screenhost";
import { plain } from "../lib";
import logger from "../lib/log";
import {
  TEMPLATES_PATH,
  SCREENSHOTS_PATH,
  IMAGE_SERVER_PREFIX,
} from "../config";

const debug = Debug("sniper:screenshot");

/**
 * @typedef {Object} State
 * @property {import("../models/pet").PetDocument} pet - pet model
 */

export class Service extends API {
  /**
   * Create a pet
   *
   * @override
   * @param {API.CreateScreenshotRequest} req createPet request
   * @returns {Promise<API.CreateScreenshotResponse>} The Pet created
   */
  async createScreenshot(req) {
    debug("crete screenshot with body %o", req.body);

    const tempFile = `${TEMPLATES_PATH}/${req.body.template}.html`;
    const imgName = `${new Date().getTime()}.png`;
    const imgFile = `${SCREENSHOTS_PATH}/${imgName}`;
    const uri = `${IMAGE_SERVER_PREFIX}/${imgName}`;
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 1);

    // 处理异常
    if (!fs.existsSync(tempFile)) {
      throw new createError.NotFound(`template ${req.body.template} not found`);
    }

    const templateStr = fs.readFileSync(tempFile).toString("utf8");
    const template = Handlebars.compile(templateStr);

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 默认 A4 纸宽高度
    const { width = 595, height = 842, data = [] } = req.body;
    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    const dataObj = data.reduce(
      (acc, { key, value }) => ({ ...acc, [key]: value }),
      {}
    );
    logger.info("screen shot", dataObj, tempFile, imgFile, expiredAt);

    await page.setContent(template(dataObj));
    await page.screenshot({
      path: imgFile,
      type: "png",
      fullPage: false, //边滚动边截图
    });
    await page.close();
    await browser.close();

    return {
      body: plain({ uri, expiredAt }),
    };
  }
}

const service = new Service();
export default service;
