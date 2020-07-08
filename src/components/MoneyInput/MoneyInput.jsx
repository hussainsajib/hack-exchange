import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

class MoneyInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChange() {}
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
                    />
                </InputGroup>
            </div>
        );
    }
}

export default MoneyInput;
