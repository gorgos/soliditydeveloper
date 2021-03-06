import * as Scrivito from "scrivito";

const CodeWidget = Scrivito.provideWidgetClass("CodeWidget", {
  attributes: {
    text: "html",
    language: [
      "enum",
      { values: ["solidity", "javascript", "html", "yml", "bash", "json"] },
    ],
  },
  extractTextAttributes: ["text"],
});

export default CodeWidget;
