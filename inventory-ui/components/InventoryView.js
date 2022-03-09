
import React, { useState } from "react"
import {
    Button,
    Box,
    HStack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from "@chakra-ui/react"

export default function InventoryView() {



    return (
        <Box bg="blue" color="white">
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
