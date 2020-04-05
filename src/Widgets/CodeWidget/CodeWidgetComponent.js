import * as React from "react";
import * as Scrivito from "scrivito";

import Prism from "prismjs";

class CodeWidgetComponent extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const classNames = [];
    if (this.props.widget.get("alignment")) {
      classNames.push(`text-${this.props.widget.get("alignment")}`);
    }

    return (
      <pre
        tag="div"
        className={classNames.join(" ")}
        content={this.props.widget}
        attribute="text"
      >
        <code
          className={`language-${
            this.props.widget.get("language") || "solidity"
          }`}
        >
          {this.props.widget.get("text")}
        </code>
      </pre>
    );
  }
}

Scrivito.provideComponent("CodeWidget", CodeWidgetComponent);
