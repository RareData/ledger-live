/* @flow */
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import type { Account } from "@ledgerhq/live-common/lib/types";
import { translate } from "react-i18next";
import SummaryRow from "../../screens/SendFunds/SummaryRow";
import LText from "../../components/LText";
import CurrencyUnitValue from "../../components/CurrencyUnitValue";
import CounterValue from "../../components/CounterValue";
import Touchable from "../../components/Touchable";
import ExternalLink from "../../icons/ExternalLink";

import colors from "../../colors";
import { getAccountBridge } from "../../bridge";
import type { Transaction } from "../../bridge/RippleJSBridge";
import type { T } from "../../types/common";

type Props = {
  account: Account,
  transaction: Transaction,
  navigation: *,
  t: T,
};

class RippleFeeRow extends Component<Props> {
  openFees = () => {
    const { account, navigation, transaction } = this.props;
    navigation.navigate("RippleEditFee", {
      accountId: account.id,
      transaction,
    });
  };
  extraInfoFees = () => {};

  render() {
    const { account, transaction, t } = this.props;
    const bridge = getAccountBridge(account);
    const fee = bridge.getTransactionExtra(account, transaction, "fee");
    const feeCustomUnit = bridge.getTransactionExtra(
      account,
      transaction,
      "feeCustomUnit",
    );
    return (
      <SummaryRow
        title={t("send.fees.title")}
        additionalInfo={
          <Touchable onPress={this.extraInfoFees}>
            <ExternalLink size={12} color={colors.grey} />
          </Touchable>
        }
      >
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.accountContainer}>
            {fee ? (
              <LText style={styles.valueText}>
                <CurrencyUnitValue
                  unit={feeCustomUnit || account.unit}
                  value={fee}
                />
              </LText>
            ) : null}

            <LText style={styles.link} onPress={this.openFees}>
              {t("common.edit")}
            </LText>
          </View>
          <LText style={styles.countervalue}>
            <CounterValue
              before="("
              value={fee}
              after=")"
              currency={account.currency}
            />
          </LText>
        </View>
      </SummaryRow>
    );
  }
}

export default translate()(RippleFeeRow);
const styles = StyleSheet.create({
  accountContainer: {
    flex: 1,
    flexDirection: "row",
  },
  summaryRowText: {
    fontSize: 16,
    textAlign: "right",
    color: colors.darkBlue,
  },
  countervalue: {
    fontSize: 12,
    color: colors.grey,
  },
  valueText: {
    fontSize: 16,
  },
  link: {
    color: colors.live,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: colors.live,
    marginLeft: 8,
  },
});
