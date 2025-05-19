import React, { useState } from "react";
import styled from "styled-components";
import { FaComments, FaPaperPlane } from "react-icons/fa";

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: #4a6cf7;
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #f8f9fa;
`;

const ChatMessage = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 8px;
  background: ${({ isUser }) => (isUser ? "#4a6cf7" : "#e9ecef")};
  color: ${({ isUser }) => (isUser ? "white" : "#333")};
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  max-width: 80%;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: white;
  border-top: 1px solid #e9ecef;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
`;

const ChatSendButton = styled.button`
  margin-left: 10px;
  padding: 8px 12px;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #3451b2;
  }
`;

const ChatIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #4a6cf7;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #3451b2;
  }
`;

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setInputValue("");
      // Simulate a bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Thank you for your message!", isUser: false },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {isOpen ? (
        <ChatContainer>
          <ChatHeader>
            <span>Chat Support</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </ChatHeader>
          <ChatBody>
            {messages.map((msg, index) => (
              <ChatMessage key={index} isUser={msg.isUser}>
                {msg.text}
              </ChatMessage>
            ))}
          </ChatBody>
          <ChatInputContainer>
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
            />
            <ChatSendButton onClick={handleSendMessage}>
              <FaPaperPlane />
            </ChatSendButton>
          </ChatInputContainer>
        </ChatContainer>
      ) : (
        <ChatIcon onClick={() => setIsOpen(true)}>
          <FaComments size={24} />
        </ChatIcon>
      )}
    </>
  );
};

export default Chat;

