import React, { Component } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

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
                <Form.Control as="select">
                    {this.props.currencies.map((item) => (
                        <option value={item[0]} key={item[0]}>
                            {item[0]} - {item[1]}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
        );
    }
}
