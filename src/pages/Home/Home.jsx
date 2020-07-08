import React, { Component } from "react";
import axios from "axios";
import Currencies from "../../components/currencies/Currencies";
import MoneyInput from "../../components/MoneyInput/MoneyInput";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allCurrencies: [],
        };
        this.getCurrencies = this.getCurrencies.bind(this);
    }

    getCurrencies() {
        axios
            .get(`https://openexchangerates.org/api/currencies.json`)
            .then((res) => {
                this.setState({ allCurrencies: Object.entries(res.data) }, () =>
                    console.log(this.state.allCurrencies)
                );
            })
            .catch((err) => console.error(err));
    }

    componentDidMount() {
        this.getCurrencies();
    }

    render() {
        return (
            <div>
                <h1>HackX</h1>
                <div>
                    <div>
                        <Currencies
                            currencies={this.state.allCurrencies}
                            param="Base Currency"
                            default="CAD"
                        />
                        <MoneyInput param="Base Currency" />
                    </div>
                    <div>
                        <Currencies
                            currencies={this.state.allCurrencies}
                            param="Quote Currency"
                            default="EUR"
                        />
                        <MoneyInput param="Quote Currency" />
                    </div>
                </div>
            </div>
        );
    }
}
