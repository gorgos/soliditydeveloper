import * as React from "react";
import * as Scrivito from "scrivito";

import Prism from "prismjs";

class CodeWidgetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.codeRef = React.createRef();
  }

  componentDidMount() {
    Prism.highlightAllUnder(this.codeRef.current);
  }

  render() {
    return (
      <pre
        tag="div"
        ref={this.codeRef}
        content={this.props.widget}
        attribute="text"
      >
        <code className={`language-${this.props.widget.get("language")}`}>
          {this.props.widget.get("text")}
        </code>
      </pre>
    );
  }
}

Scrivito.provideComponent("CodeWidget", CodeWidgetComponent);
