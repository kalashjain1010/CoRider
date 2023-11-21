import React, { useState, useEffect } from "react";
import { Avatar, Box, Divider } from "@chakra-ui/react";
import IconEdit from "../icons/Edit";
import IconBxLeftArrowAlt from "../icons/LeftArrow";
import IconBxDotsVerticalRounded from "../icons/VerticalDot";
import Api from "./Api";
import NewMessage from "./NewMessage";

function HomePage() {
  const dataUrl = "https://qa.corider.in/assignment/chat?page=0";
  const [fromValue, setFromValue] = useState(null);
  const [name, setName] = useState(null);
  const [tos, setTos] = useState(null);

  async function DataHandle() {
    try {
      const response = await fetch(dataUrl);
      const result = await response.json();
      const { from } = result;
      setFromValue(from);
      const { name } = result;
      setName(name);
      const { to } = result;
      setTos(to);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    DataHandle();
  }, []);

  return (
    <Box display={"flex"} flexDir={"column"} justifyContent={"space-between"} h={"90vh"}>
      <Box >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"} fontSize={"2xl"}>
            <IconBxLeftArrowAlt fill="#454545" />
            <Box fontWeight={"bold"}>{name}</Box>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <IconEdit />
          </Box>
        </Box>

        <Box m={2} mt={4}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display={"flex"}>
              <Avatar />
              <Box display={"flex"} flexDir={"column"} ml={3}>
                <Box display={"flex"}>
                  <Box>From &nbsp; </Box>
                  <Box fontWeight={"bold"}>
                    {fromValue !== null ? (
                      <div>{fromValue}</div>
                    ) : (
                      <div>Loading...</div>
                    )}
                  </Box>
                </Box>
                <Box display={"flex"}>
                  <Box>To &nbsp;</Box>
                  <Box fontWeight={"bold"}> {tos} </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <IconBxDotsVerticalRounded />
            </Box>
          </Box>
        </Box>
        <Divider />
      </Box>
      <Box >
        <Api />
      </Box>
      <Box>
        <NewMessage />
      </Box>
    </Box>
  );
}

export default HomePage;
