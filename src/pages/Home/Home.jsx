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
            conversionRate: "",
        };
        this.getCurrencies = this.getCurrencies.bind(this);
        this.handleBaseChange = this.handleBaseChange.bind(this);
        this.handleQuoteChange = this.handleQuoteChange.bind(this);
        this.handleBaseValueChange = this.handleBaseValueChange.bind(this);
        this.handleQuoteValueChange = this.handleQuoteValueChange.bind(this);
    }

    getCurrencies() {
        axios
            .get(
                `https://api.currconv.com/api/v7/currencies?apiKey=${process.env.REACT_APP_OPENEXCHANGE_APP_ID}`
            )
            .then((res) => {
                this.setState(
                    {
                        allCurrencies: Object.values(res.data.results).sort(
                            (item1, item2) => {
                                if (item1.id > item2.id) return 1;
                                if (item1.id < item2.id) return -1;
                                return 0;
                            }
                        ),
                    },
                    () => console.log(this.state.allCurrencies)
                );
            })
            .catch((err) => console.error(err));
    }

    convertFX() {
        axios
            .get(
                `https://api.currconv.com/api/v7/convert?q=${this.state.baseCurrency}_${this.state.quoteCurrency}&compact=ultra&apiKey=${process.env.REACT_APP_OPENEXCHANGE_APP_ID}`
            )
            .then((res) =>
                this.setState(
                    {
                        conversionRate: Object.values(res.data)[0],
                        convertedValue:
                            this.state.baseValue * Object.values(res.data)[0],
                    },
                    () => console.log(this.state.conversionRate)
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

    handleBaseValueChange(newValue) {
        this.setState(
            {
                baseValue: newValue,
                convertedValue: newValue * this.state.conversionRate,
            },
            () => {
                console.log("Base value changed");
                console.log("basevalue", this.state.baseValue);
                console.log("converted value", this.state.convertedValue);
                console.log("conversion rate: ", this.state.conversionRate);
            }
        );
    }

    handleQuoteValueChange(newValue) {
        this.setState(
            {
                convertedValue: newValue,
                baseValue: newValue / this.state.conversionRate,
            },
            () => {
                console.log("basevalue", this.state.baseValue);
                console.log("converted value", this.state.convertedValue);
                console.log("conversion rate: ", this.state.conversionRate);
            }
        );
    }

    render() {
        return (
            <div>
                <div className={S.headingContainer}>
                    <h1>HackX</h1>
                </div>
                <div className={S.mainContainer}>
                    <div>
                        <Currencies
                            currencies={this.state.allCurrencies}
                            param="Base Currency"
                            default={this.state.baseCurrency}
                            onSelect={this.handleBaseChange}
                        />
                        <MoneyInput
                            param="Base Currency"
                            value={parseFloat(this.state.baseValue).toFixed(4)}
                            onChange={this.handleBaseValueChange.bind(this)}
                        />
                    </div>
                    <p className={S.convertedValue}>
                        {parseFloat(this.state.convertedValue).toFixed(4)}
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
                            value={parseFloat(
                                this.state.convertedValue
                            ).toFixed(4)}
                            onChange={this.handleQuoteValueChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
