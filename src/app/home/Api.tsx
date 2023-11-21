import React, { useState, useEffect } from "react";
import {
  AbsoluteCenter,
  Avatar,
  Box,
  Divider,
  Card,
  Image,
  Text,
} from "@chakra-ui/react";

interface Chat {
  id: string;
  message: string;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  time: string;
}

interface ApiResponse {
  chats: Chat[];
  from: string;
  message: string;
  name: string;
  status: string;
  to: string;
}

function Api() {
  const dataUrl = "https://qa.corider.in/assignment/chat?page=0";
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [formatTime, SetFormatTIme] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  async function DataHandle() {
    try {
      const response = await fetch(dataUrl);
      const result: ApiResponse = await response.json();
      const firstChat: Chat = result.chats[0];
      const { time: dateTime } = firstChat;
      const datePart = dateTime.split(" ")[0];
      const formatted = formatDate(datePart);
      setFormattedDate(formatted);
      const TimePart = dateTime.split(" ")[1];
      SetFormatTIme(TimePart);

      setChats(result.chats);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    DataHandle();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <Box mt={10} maxH="60vh" overflowY="auto">
        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white">{formattedDate}</AbsoluteCenter>
        </Box>
        {chats.map((chat) => (
          <Box key={chat.id} display={"flex"} maxW={"xs"} mt={5} mb={10}>
            <Image
              src={chat.sender.image}
              alt="Sender"
              boxSize="30px"
              borderRadius="full"
            />
            <Card ml={3} mt={3}>
              <Text fontSize={"sm"} p={2}>
                {chat.message}
              </Text>
            </Card>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Api;
