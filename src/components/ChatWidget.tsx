import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  isTyping?: boolean;
}

const formatMessage = (text: string): string => {
  // Check if this is an appointment confirmation message
  if (
    text.includes("Date:") &&
    text.includes("Time:") &&
    text.includes("Vehicle:")
  ) {
    // Remove ** formatting and clean up the message
    let formatted = text
      .replace(/\\(.?)\\*/g, "$1") // Remove ** formatting
      .replace(/\s+/g, " ") // Clean up extra spaces
      .trim();

    // Structure the appointment confirmation professionally
    const lines = formatted.split(
      /(?:Date:|Time:|Vehicle:|Service:|Name:|Phone Number:|Email:)/
    );
    if (lines.length >= 7) {
      const details = lines.slice(1).map((line) => line.trim());

      return `✅ Appointment Confirmation

Here are your details:

Date: ${details[0]}
Time: ${details[1]}
Vehicle: ${details[2]}
Service: ${details[3]}
Name: ${details[4]}
Phone Number: ${details[5]}
Email: ${details[6]}

Your appointment has been booked. You will also receive a confirmation email shortly.`;
    }
  }

  // Remove ** formatting first
  let formatted = text.replace(/\\(.?)\\*/g, "$1");

  // 🔥 FIXED: Handle the exact format your n8n sends
  // Pattern: "Available engine oils hain: - Toyota - Honda - Shell"
  if (formatted.includes("hain:") && formatted.includes(" - ")) {
    // Split at "hain:" to separate intro from list
    const parts = formatted.split("hain:");

    if (parts.length >= 2) {
      const intro = parts[0].trim() + " hain:";
      let listItems = parts[1].trim();

      // Remove leading dash and space if exists
      if (listItems.startsWith("- ")) {
        listItems = listItems.substring(2);
      }

      // Split by " - " and format each item
      const itemArray = listItems
        .split(" - ")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      // Format as list regardless of number of items
      if (itemArray.length >= 1) {
        return intro + "\n\n" + itemArray.map((item) => `• ${item}`).join("\n");
      }
    }
  }

  // Also handle similar patterns with different keywords
  if (
    formatted.includes(" hain: -") ||
    (formatted.includes("available") && formatted.includes(" - "))
  ) {
    // Find the part after the colon or "available" keyword
    let splitPoint = formatted.indexOf("hain: -");
    if (splitPoint === -1) {
      splitPoint = formatted.toLowerCase().indexOf("available");
      if (splitPoint !== -1) {
        // Find the colon after "available"
        const colonIndex = formatted.indexOf(":", splitPoint);
        if (colonIndex !== -1) {
          splitPoint = colonIndex;
        }
      }
    }

    if (splitPoint !== -1) {
      const intro = formatted
        .substring(
          0,
          splitPoint + (formatted.charAt(splitPoint) === ":" ? 1 : 0)
        )
        .trim();
      let listPart = formatted
        .substring(splitPoint + (formatted.charAt(splitPoint) === ":" ? 1 : 0))
        .trim();

      // Clean up the list part
      if (listPart.startsWith("- ")) {
        listPart = listPart.substring(2);
      }

      // Split by " - " and create bullet points
      const items = listPart
        .split(" - ")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      if (items.length >= 1) {
        return intro + "\n\n" + items.map((item) => `• ${item}`).join("\n");
      }
    }
  }

  // Enhanced list detection patterns for other formats
  const patterns = [
    // Comma-separated lists (brands, services, etc.)
    /([A-Z][a-zA-Z0-9\s&]+(?:,\s*[A-Z][a-zA-Z0-9\s&]+){1,})/g,
    // Lists with "aur" or "and" (Urdu/English mixed)
    /([A-Z][a-zA-Z0-9\s&]+(?:\s+aur\s+[A-Z][a-zA-Z0-9\s&]+)+)/g,
  ];

  // Apply pattern-based list formatting for other cases
  patterns.forEach((pattern) => {
    formatted = formatted.replace(pattern, (match) => {
      let items = [];

      if (match.includes(",")) {
        items = match.split(",").map((item) => item.trim());
      } else if (match.includes(" aur ")) {
        items = match.split(" aur ").map((item) => item.trim());
      }

      // Only format as list if we have multiple items
      if (items.length >= 2) {
        return "\n\n" + items.map((item) => `• ${item}`).join("\n") + "\n";
      }

      return match;
    });
  });

  // Handle newline-separated lists and other multi-item scenarios
  const lines = formatted.split("\n");
  const processedLines: string[] = [];
  let currentListItems: string[] = [];
  let inPotentialList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (line === "") {
      // If we were building a list, finalize it
      if (currentListItems.length >= 2) {
        processedLines.push("");
        processedLines.push(...currentListItems.map((item) => `• ${item}`));
        processedLines.push("");
        currentListItems = [];
        inPotentialList = false;
      } else if (currentListItems.length === 1) {
        // Single item, treat as regular text
        processedLines.push(currentListItems[0]);
        currentListItems = [];
        inPotentialList = false;
      }
      processedLines.push("");
      continue;
    }

    // Detect potential list items (brands, services, products)
    const isListItem =
      /^[A-Z][a-zA-Z0-9\s&%-]{1,30}$/.test(line) &&
      !line.includes("?") &&
      !line.includes("!") &&
      !line.toLowerCase().includes("hamara") &&
      !line.toLowerCase().includes("hamare") &&
      !line.toLowerCase().includes("hum") &&
      !line.toLowerCase().includes("ap") &&
      !line.toLowerCase().includes("available") &&
      !line.toLowerCase().includes("service") &&
      line.split(" ").length <= 4; // Keep it reasonable

    // Check if previous line suggests a list is coming
    const prevLine = i > 0 ? lines[i - 1].trim().toLowerCase() : "";
    const suggestsList =
      prevLine.includes("hain:") ||
      prevLine.includes("available") ||
      prevLine.includes("services") ||
      prevLine.includes("offers") ||
      prevLine.includes("oils") ||
      prevLine.endsWith(":");

    if (
      (isListItem && (suggestsList || inPotentialList)) ||
      currentListItems.length > 0
    ) {
      if (isListItem) {
        currentListItems.push(line);
        inPotentialList = true;
      } else {
        // End of potential list, finalize it
        if (currentListItems.length >= 2) {
          processedLines.push(...currentListItems.map((item) => `• ${item}`));
        } else if (currentListItems.length === 1) {
          processedLines.push(currentListItems[0]);
        }
        currentListItems = [];
        inPotentialList = false;
        processedLines.push(line);
      }
    } else {
      processedLines.push(line);
    }
  }

  // Handle any remaining list items at the end
  if (currentListItems.length >= 2) {
    processedLines.push("");
    processedLines.push(...currentListItems.map((item) => `• ${item}`));
  } else if (currentListItems.length === 1) {
    processedLines.push(currentListItems[0]);
  }

  return processedLines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can we help you with your automotive needs today?",
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOpenChatWithMessage = (event: CustomEvent) => {
      setIsOpen(true);
      const { message } = event.detail;
      handleSendMessage(null, message);
    };

    window.addEventListener(
      "openChatWithMessage",
      handleOpenChatWithMessage as EventListener
    );

    return () => {
      window.removeEventListener(
        "openChatWithMessage",
        handleOpenChatWithMessage as EventListener
      );
    };
  }, [messages]);

  const handleSendMessage = async (
    e: React.FormEvent | null,
    initialMessage?: string
  ) => {
    if (e) e.preventDefault();
    const messageToSend = initialMessage || message;
    if (!messageToSend.trim() || isLoading) return;

    const newMessage = {
      id: messages.length + 1,
      text: messageToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    const userMessage = messageToSend;
    if (!initialMessage) setMessage("");
    setIsLoading(true);

    // Add typing indicator
    const typingMessage = {
      id: messages.length + 2,
      text: "",
      sender: "support",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      const response = await fetch(
        "https://n8n.srv1001376.hstgr.cloud/webhook/258c7d52-2024-451c-9541-fe6de48131f9",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      let responseText;

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        responseText = data.reply || data.message || data.response;
      } else {
        responseText = await response.text();
      }

      // Remove typing indicator and add actual response
      setMessages((prev) => {
        const withoutTyping = prev.filter((msg) => !msg.isTyping);
        const aiResponse = {
          id: withoutTyping.length + 1,
          text: formatMessage(
            responseText || "Got it! Please wait while I process your request."
          ),
          sender: "support",
          timestamp: new Date(),
        };
        return [...withoutTyping, aiResponse];
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove typing indicator and add error response
      setMessages((prev) => {
        const withoutTyping = prev.filter((msg) => !msg.isTyping);
        const errorResponse = {
          id: withoutTyping.length + 1,
          text: "⚠ Sorry, I'm having trouble connecting. Please try again later.",
          sender: "support",
          timestamp: new Date(),
        };
        return [...withoutTyping, errorResponse];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div
        className={`chat-widget ${isOpen ? "hidden" : "flex"}`}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-7 h-7" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-card rounded-2xl shadow-2xl z-50 border border-border">
          {/* Header */}
          <div className="bg-primary p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-semibold text-primary-foreground">
                  Live Support
                </h3>
                <p className="text-xs text-primary-foreground/80">
                  We're here to help!
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.isTyping ? (
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-border"
          >
            <div className="flex items-end space-x-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 px-3 py-2 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none min-h-[40px] max-h-32 textarea-no-scroll"
                rows={1}
                style={{
                  height: "auto",
                  minHeight: "40px",
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${Math.min(
                    target.scrollHeight,
                    128
                  )}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                  // Allow regular Enter for new lines
                }}
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground w-10 h-10 rounded-full hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
