// @flow
import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import { PropTypes } from "prop-types";
import copy from "clipboard-copy";
import { autobind } from "core-decorators";
import { injectIntl, defineMessages, intlShape } from "react-intl";
import "../style/MiscComponents.less";

const messages = defineMessages({
  copied: {
    id: "clipboard.copied",
    defaultMessage: "Copied"
  }
});

@autobind
class CopyToClipboardButton extends Component {

  static propTypes = {
    textToCopy: PropTypes.string.isRequired,
    intl: intlShape.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false
    };
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <a
        ref="copyButtonRef"
        className={"copy-to-clipboard-icon" + (this.props.className ? (" " + this.props.className) : "")}
        style={this.props.style}
        data-place="bottom"
        data-type="info"
        data-effect="solid"
        data-tip={this.state.showTooltip ? formatMessage(messages.copied) : ""}
        onClick={this.onClick}
        onMouseLeave={this.onMouseLeave} />
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevState.showTooltip && this.state.showTooltip) {
      ReactTooltip.show(ReactDOM.findDOMNode(this.refs.copyButtonRef));
    }
    else if(prevState.showTooltip && !this.state.showTooltip) {
      ReactTooltip.hide(ReactDOM.findDOMNode(this.refs.copyButtonRef));
    }
  }

  onClick() {
    if(copy(this.props.textToCopy)) {
      this.setState({ showTooltip: true });
    }
  }

  onMouseLeave() {
    if(this.state.showTooltip) {
      this.setState({ showTooltip: false });
    }
  }

}

export default injectIntl(CopyToClipboardButton);
