import * as Scrivito from "scrivito";
import textWidgetIcon from "../../assets/images/text_widget.svg";

Scrivito.provideEditingConfig("TextWidget", {
  title: "Text",
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
    text: {
      title: "Text",
      description: "The actual source code of this text",
      options: {
        toolbar: [
          "blockquote",
          "bold",
          "italic",
          "code",
          "underline",
          "strikethrough",
          "subscript",
          "superscript",
          "link",
          "header1",
          "header2",
          "header3",
          "header4",
          "header5",
          "header6",
          "bulletList",
          "orderedList",
        ],
      },
    },
  },
  properties: ["alignment", "text"],
  initialContent: {
    alignment: "left",
  },
});
