import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
// add module css file

import Styles from "./Chat.module.css";

const Chat = () => {
  return (
    <div className={Styles.background}>
      <div className="h-screen flex items-center justify-center">
        <div
          className={`flex  md:h-[550px] lg:h-[650px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 `}
        >
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};
export default Chat;
