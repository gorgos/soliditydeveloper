import * as Scrivito from "scrivito";
import textWidgetIcon from "../../assets/images/text_widget.svg";

Scrivito.provideEditingConfig("CodeWidget", {
  title: "Code",
  thumbnail: textWidgetIcon,
  attributes: {
    language: {
      title: "Language",
      description: "Default: Solidity",
      values: [
        { value: "solidity", title: "Solidity" },
        { value: "javascript", title: "JavaScript" },
        { value: "html", title: "HTML" },
        { value: "yml", title: "YAML" },
        { value: "bash", title: "Bash" },
      ],
    },
    text: {
      title: "Text",
      description: "The actual source code of this text",
    },
  },
  properties: ["language", "text"],
  initialContent: {
    language: "solidity",
  },
});
