import React, { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";
import {
  Button,
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { addresses } from "./eth/addresses";
import { ethers } from "ethers";
const abi = require("../abi/inventoryNFT.json");

export default function InventoryView() {
  const value = useContext(AppContext);
  const { web3, account, chainId } = value.state;
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [variant, setVariant] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [inventory, setInventory] = useState([0, 0, 0, 0]);

  const fetchProduct = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addresses.inventoryNft, abi, signer);

    const numOfProducts = await contract.productId();

    // let product = []
    let _variant = "";
    let _quantity = 0;
    let _inventory = [];

    for (let i = 0; i < numOfProducts; i++) {
      contract
        .getProducts(i)
        .then((data) => {
          setBrand(data[0])
          setProduct(data[1]);

          for (let j = 0; j < data[2].length; j++) {
            _variant = _variant + ", " + data[2][j];
            setVariant(_variant.slice(2));
          }

          for (let j = 0; j < data[3].length; j++) {
            _quantity =
              parseInt(ethers.utils.formatUnits(data[3][j].toString(), "wei")) +
              _quantity;
            setQuantity(_quantity);
          }

          for (let j = 0; j < data[4].length; j++) {
            _inventory.push(
              ethers.utils.formatUnits(data[4][j].toString(), "wei")
            );
            setInventory([..._inventory]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const SetTableRow = (prop) => {
    return (
      <Tr>
        <Td>{prop.brand}</Td>
        <Td>{prop.product}</Td>
        <Td>{prop.variants}</Td>
        <Td>{prop.quantity}</Td>
        <Td>{prop.available}</Td>
        <Td>{prop.reserved}</Td>
        <Td>{prop.sold}</Td>
        <Td>{prop.shipped}</Td>
      </Tr>
    );
  };

  useEffect(() => {
    if (web3 === null) {
      value.toast("Please connect your wallet.");
    } else {
      fetchProduct();
    }

    console.log(product, variant, quantity, inventory);
  }, []);

  return (
    <Box bg="blue" color="white">
      <Table variant="unstyled">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Brand</Th>
            <Th>Product</Th>
            <Th>Variants</Th>
            <Th>Total Quantity</Th>
            <Th>Available</Th>
            <Th>Reserved</Th>
            <Th>Sold</Th>
            <Th>Shipped</Th>
          </Tr>
        </Thead>
        <Tbody>
          <SetTableRow
            brand={brand}
            product={product}
            variants={variant}
            quantity={quantity}
            available={inventory[0]}
            reserved={inventory[1]}
            sold={inventory[2]}
            shipped={inventory[3]}
          ></SetTableRow>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
}
