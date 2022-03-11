
import React, { useState, useEffect, useContext } from "react"
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
} from "@chakra-ui/react"
// import { fetchInventory } from "./eth/FetchInventory";
import { addresses } from "./eth/addresses";
import { ethers } from "ethers";
const abi = require("../abi/inventoryNFT.json")

export default function InventoryView() {
  const value = useContext(AppContext);
  const { web3, account, chainId } = value.state;

  const [name, setName] = useState("")
  const [variant, setVariant] = useState([])
  const [quantity, setQuantity] = useState([])
  const [inventory, setInventory] = useState([])

  const fetchInventory = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner()
    const contract = new ethers.Contract(addresses.inventoryNft, abi, signer)
    const numOfProducts = await contract.productId()

    // let name = []
    let _variant = []
    let _quantityPerVariant = []
    let _inventory = []

    for (let i = 0; i < numOfProducts; i++) {
      contract.getProducts(i).then((data) => {
        console.log(data[1])

        for (let j = 0; j < data[1].length; j++) {
          _variant.push(data[1][j])
          setVariant(_variant)
        }

        for (let j = 0; j < data[1].length; j++) {
          _quantityPerVariant.push(ethers.utils.formatUnits(data[2][j].toString(), "wei"))
          setQuantity(_quantityPerVariant)
        }

        for (let j = 0; j < data[1].length; j++) {
          _inventory.push(ethers.utils.formatUnits(data[3][j].toString(), "wei"))
          setInventory(_inventory)
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }

  useEffect(() => {
    if (web3 === null) {
      value.toast("Please connect your wallet.")
    } else {
      fetchInventory()
    }
  }, []);

  return (
    <Box bg="blue" color="white">
      {name && <Text>{name}</Text>}
      {variant && <Text>{variant}</Text>}
      {quantity && <Text>{quantity}</Text>}
      {inventory && <Text>{inventory}</Text>}
      <Table variant='unstyled'>
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Brand</Th>
            <Th>Product</Th>
            <Th>Item</Th>
            <Th>Variant</Th>
            <Th>Location</Th>
            <Th>Chipped?</Th>
            <Th>Digitized?</Th>
            <Th>Ready for Auction?</Th>
            <Th>Bid?</Th>
            <Th>Sold?</Th>
            <Th>Shipped?</Th>
            <Th>Delivered?</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
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
