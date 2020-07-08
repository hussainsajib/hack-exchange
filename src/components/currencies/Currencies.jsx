import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class Currencies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allCurrencies: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onSelect(e.target.value);
    }

    render() {
        return (
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>{this.props.param}</Form.Label>
                <Form.Control
                    as="select"
                    defaultValue={this.props.default}
                    onChange={this.handleChange}
                >
                    {this.props.currencies.map((item) => (
                        <option value={item.id} key={item.currencyName}>
                            {item.id} - {item.currencyName}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
        );
    }
}
