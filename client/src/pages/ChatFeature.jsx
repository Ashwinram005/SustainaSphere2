import { Chat } from "stream-chat-react";
import ChannelListContainer from "../components/ChannelListContainer";
import ChannelContainer from "../components/ChannelContainer";
import { useState } from "react";

const ChatFeature = ({ client }) => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Chat client={client} theme="team light">
      <div className="flex flex-1 h-full m-0 shadow-md shadow-black/30 m-0">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </div>
    </Chat>
  );
};

export default ChatFeature;
