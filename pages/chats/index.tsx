import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import { Chat, ChatRoom, Product, User } from "@prisma/client";
import useSWR from "swr";
import useUser from "@libs/client/useUser";

interface ChatRoomWithUserAndProduct extends ChatRoom {
  user: User;
  product: Product;
  chat: Chat[];
  buyUser: User;
  createdBy: User;
}

interface ChatsResponse {
  ok: boolean;
  chatRoom: ChatRoomWithUserAndProduct[];
}

const Chats: NextPage = () => {
  const { data } = useSWR<ChatsResponse>(`/api/chats/?page=1`);
  const { user, isLoading } = useUser();
  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {data?.chatRoom?.map((room) => (
          <Link href={`/chats/${room.id}`} key={room.id}>
            <a className="flex px-4 cursor-pointer py-3 items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">
                  {user?.id === room?.createdById
                    ? room?.buyUser.name
                    : room?.createdBy.name}
                </p>
                <p className="text-sm  text-gray-500">
                  {room?.chat && room?.chat[0].chatContent}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
