import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const MoneyInput = ({ param }) => {
    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">{param}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
        </div>
    );
};

export default MoneyInput;
