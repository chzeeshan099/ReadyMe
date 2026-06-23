import React from "react";
import AiChatScreen from "@/modules/ai-chat/screens/AiChatScreen";

export default function AiAssistantScreen(props) {
  const route = {
    ...props.route,
    params: {
      ...(props.route?.params || {}),
      activeRoute: "AiAssistant",
      screenTitle: "Ai Assistant",
    },
  };

  return <AiChatScreen {...props} route={route} />;
}
