import * as Scrivito from "scrivito";

const CodeWidget = Scrivito.provideWidgetClass("CodeWidget", {
  attributes: {
    text: "html",
    alignment: ["enum", { values: ["left", "center", "right"] }],
    language: ["enum", { values: ["solidity", "javascript", "html", "yml"] }],
  },
  extractTextAttributes: ["text"],
});

export default CodeWidget;
