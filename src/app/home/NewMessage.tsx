import { Box, Button, Card, Input, Portal, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import IconAttach from "../icons/Attach";
import IconSend from "../icons/SendIcon";
import IconChecklistTwentyFour from "../icons/ListAdd";
import IconCamera from "../icons/Camera";
import IconCameraVideo from "../icons/Video";

function NewMessage() {
  const [attachFile, setAttachFile] = useState(false);

  const handleToggleAttachFile = () => {
    setAttachFile(!attachFile);
  };

  const renderAttachFileModal = () => {
    if (attachFile) {
      return <>
        <Card bgColor={"green"} textColor={"white"} p={2} rounded={"full"} >
          <Box display={"flex"} flexDir={"row"} px={2}>
            <Box px={1}><IconCamera/></Box>
            <Box px={1}><IconCameraVideo/></Box>
            <Box px={1}><IconChecklistTwentyFour/></Box>
          </Box>
        </Card>
      </>;
    }
    return null;
  };

  return (
    <div>
      <Box>
        <Card
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Input
              type="text"
              placeholder="reply to @Rohit Yadav"
              fontSize={"sm"}
              maxW={"50vw"}
              border="none"
              focusBorderColor="transparent"
            />
          </Box>
          <Box display={"flex"} p={3} gap={2} position="relative">
            <button onClick={handleToggleAttachFile}>
              <Box zIndex={2} pos={"absolute"} mt={"-12"} ml={-14} >
                {renderAttachFileModal()}
              </Box>
              <IconAttach />
            </button>
            <IconSend />
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default NewMessage;
