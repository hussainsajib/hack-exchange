import React, { Component } from "react";
import axios from "axios";
import Currencies from "../../components/currencies/Currencies";
import MoneyInput from "../../components/MoneyInput/MoneyInput";

import S from "./Home.module.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allCurrencies: [],
            baseCurrency: "CAD",
            quoteCurrency: "USD",
            convertedValue: 1,
            baseValue: 1,
        };
        this.getCurrencies = this.getCurrencies.bind(this);
        this.handleBaseChange = this.handleBaseChange.bind(this);
        this.handleQuoteChange = this.handleQuoteChange.bind(this);
    }

    getCurrencies() {
        axios
            .get(
                `https://free.currconv.com/api/v7/currencies?apiKey=${process.env.REACT_APP_OPENEXCHANGE_APP_ID}`
            )
            .then((res) => {
                this.setState(
                    { allCurrencies: Object.values(res.data.results) },
                    () => console.log(this.state.allCurrencies)
                );
            })
            .catch((err) => console.error(err));
    }

    convertFX() {
        axios
            .get(
                `https://free.currconv.com/api/v7/convert?q=${this.state.baseCurrency}_${this.state.quoteCurrency}&compact=ultra&apiKey=${process.env.REACT_APP_OPENEXCHANGE_APP_ID}`
            )
            .then((res) =>
                this.setState(
                    { convertedValue: Object.values(res.data)[0] },
                    () => console.log(this.state.convertedValue)
                )
            )
            .catch((err) => console.error(err));
    }

    componentDidMount() {
        this.getCurrencies();
        this.convertFX();
    }

    handleBaseChange(newBaseCurrency) {
        this.setState({ baseCurrency: newBaseCurrency }, () => {
            this.convertFX();
            console.log(this.state.baseCurrency);
        });
    }

    handleQuoteChange(newQuoteCurrency) {
        this.setState({ quoteCurrency: newQuoteCurrency }, () => {
            this.convertFX();
            console.log(this.state.quoteCurrency);
        });
    }

    render() {
        return (
            <div>
                <h1>HackX</h1>
                <div className={S.mainContainer}>
                    <div>
                        <Currencies
                            currencies={this.state.allCurrencies}
                            param="Base Currency"
                            default={this.state.baseCurrency}
                            onSelect={this.handleBaseChange}
                        />
                        <MoneyInput param="Base Currency" value="1" />
                    </div>
                    <p className={S.convertedValue}>
                        {this.state.convertedValue.toFixed(4)}
                    </p>
                    <div>
                        <Currencies
                            currencies={this.state.allCurrencies}
                            param="Quote Currency"
                            default={this.state.quoteCurrency}
                            onSelect={this.handleQuoteChange}
                        />
                        <MoneyInput
                            param="Quote Currency"
                            value={this.state.convertedValue.toFixed(4)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
