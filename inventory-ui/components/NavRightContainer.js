import React, { useContext } from "react";
import { IconButton, HStack } from "@chakra-ui/react";
import Account from "./Account";
import Chain from "./Chain";
import { BiCopy } from "react-icons/bi";
import AppContext from "./AppContext";

export default function NavRightContainer(props) {
  const value = useContext(AppContext);
  const { account } = value.state;

  const copy = async () => {
    await navigator.clipboard.writeText(account);
  };

  return (
    <HStack
      color={props.color}
      border="1.5px solid"
      borderRadius="xl"
      spacing={1}
      pl={3}
      borderColor={props.borderColor}
      height="45px"
      margin={{
        sm: "10px 0 20px 0 !important",
        md: "0 !important",
        lg: "0 !important",
        xl: "0 !important",
        "2xl": "0 !important",
      }}
    >
      <Chain />
      <Account message="Connect" />
      {account ? (
        <IconButton
          onClick={() => copy()}
          icon={<BiCopy />}
          aria-label="Copy account address"
          size="xs"
          type="unstyled"
          border="none"
          background="transparent"
          id="copy-address"
        />
      ) : null}
    </HStack>
  );
}
