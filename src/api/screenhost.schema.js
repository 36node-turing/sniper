export const createScreenshotReqSchema = {
  additionalProperties: false,
  type: "object",
  required: ["body"],
  properties: {
    body: {
      additionalProperties: false,
      type: "object",
      properties: {
        template: { type: "string", description: "template's name" },
        width: { type: "integer", description: "screenshot width" },
        height: { type: "integer", description: "screenshot height" },
        data: {
          type: "array",
          description: "data to be replaced in template",
          items: {
            additionalProperties: false,
            type: "object",
            properties: { key: { type: "string" }, value: { type: "string" } },
          },
        },
      },
    },
  },
};
export const createScreenshotResSchema = {
  additionalProperties: false,
  type: "object",
  required: ["body"],
  properties: {
    body: {
      additionalProperties: false,
      type: "object",
      properties: {
        uri: { type: "string", description: "uri of screenshot result" },
        expiredAt: {
          type: "string",
          description: "will delete the screenshot unitl expiredAt",
        },
      },
    },
  },
};
