#!/usr/bin/env node --harmony -r esm

import { app, config, logger } from "../src";

const { PORT } = config;

logger.info(config, "config list");

/**
 * start app
 */
app.listen(PORT, () =>
  logger.info(`[${process.env.NODE_ENV}] http server start on port ${PORT} 🚀`)
);

app.on("error", err => console.error(err));
