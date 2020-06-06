import * as Scrivito from "scrivito";
import textWidgetIcon from "../../assets/images/text_widget.svg";

Scrivito.provideEditingConfig("CodeWidget", {
  title: "Code",
  thumbnail: textWidgetIcon,
  attributes: {
    alignment: {
      title: "Alignment",
      description: "Default: Left",
      values: [
        { value: "left", title: "Left" },
        { value: "center", title: "Center" },
        { value: "right", title: "Right" },
      ],
    },
    language: {
      title: "Language",
      description: "Default: Solidity",
      values: [
        { value: "solidity", title: "Solidity" },
        { value: "javascript", title: "JavaScript" },
        { value: "html", title: "HTML" },
        { value: "yml", title: "YAML" },
      ],
    },
    text: {
      title: "Text",
      description: "The actual source code of this text",
    },
  },
  properties: ["alignment", "language", "text"],
  initialContent: {
    alignment: "left",
  },
});
