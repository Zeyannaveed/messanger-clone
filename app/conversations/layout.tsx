import getConversations from "../actions/getConversation";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import { ConversationList } from "./components/ConversationList";

export default async function conversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-ignore
    <Sidebar>
      <div className="h-full">
        <ConversationList
        users={users}
          // @ts-ignore
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
