import * as Scrivito from "scrivito";

const CodeWidget = Scrivito.provideWidgetClass("CodeWidget", {
  attributes: {
    text: "html",
    alignment: ["enum", { values: ["left", "center", "right"] }],
  },
  extractTextAttributes: ["text"],
});

export default CodeWidget;
