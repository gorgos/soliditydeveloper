import * as Scrivito from "scrivito";

const CodeWidget = Scrivito.provideWidgetClass("CodeWidget", {
  attributes: {
    text: "html",
    language: [
      "enum",
      {
        values: [
          "solidity",
          "javascript",
          "typescript",
          "html",
          "yml",
          "bash",
          "json",
        ],
      },
    ],
  },
  extractTextAttributes: ["text"],
});

export default CodeWidget;
