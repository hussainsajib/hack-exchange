import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class Currencies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allCurrencies: [],
        };
    }

    render() {
        return (
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>{this.props.param}</Form.Label>
                <Form.Control as="select" defaultValue={this.props.default}>
                    {this.props.currencies.map((item) => (
                        <option
                            value={item.currencyName}
                            key={item.currencyName}
                        >
                            {item.id} - {item.currencyName}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
        );
    }
}
