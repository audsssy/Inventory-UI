import React, { useState, useContext } from "react";
import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {

  return (
    <>
      <Box bg="black">
        <Head>
          <title>LGT Inventory</title>
          <meta
            property="og:title"
            content="LGT Inventory Sytem"
            key="title"
          />
        </Head>
        <Nav
          style={{
            overflowX: "hidden !important",
          }}
        />
        <Container
          minH="80vh"
          maxW="container.lg"
          alignItems="center"
          justifyContent="center"
          style={{
            overflowX: "hidden !important",
          }}
        >
          <Box minH="70vh">hello</Box>
        </Container>
          <Footer />
      </Box>
    </>
  );
}
