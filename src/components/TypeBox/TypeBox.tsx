import classNames from "classnames";
import React from "react";

import styles from "./TypeBox.module.scss";

interface TypeBox {
  type: string;
}

function TypeBox({ type }: TypeBox) {
  return <span className={classNames(styles.Type, styles[type])}>{type}</span>;
}

export default TypeBox;
