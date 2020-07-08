import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

class MoneyInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.key === "Enter") {
            this.props.onChange(e.target.value);
        }
    }
    render() {
        return (
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                            {this.props.param}
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder={this.props.value}
                        aria-label="Currency Value"
                        type="number"
                        aria-describedby="basic-addon1"
                        onKeyDown={this.handleChange}
                    />
                </InputGroup>
            </div>
        );
    }
}

export default MoneyInput;
