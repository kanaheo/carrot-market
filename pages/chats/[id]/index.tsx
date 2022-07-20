import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import useUser from "@libs/client/useUser";
import { Chat } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";

interface ChatResponse {
  ok: boolean;
  chats: Chat[];
}

interface ChatsForm {
  chat: string;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();

  const { user } = useUser();

  const { data, mutate } = useSWR<ChatResponse>(
    router.query.id ? `/api/chats/${router.query.id}/buyIdUpdate` : null
  );
  const [sendChat, { data: chatData, loading: chatLoading }] =
    useMutation<ChatResponse>(`/api/chats/${router.query.id}/chats`);

  const { handleSubmit, register, reset } = useForm<ChatsForm>();

  const onValid = (form: ChatsForm) => {
    if (chatLoading) return;
    sendChat(form);
  };
  console.log(user);
  console.log(data);
  console.log(data?.chats);

  useEffect(() => {
    if (chatData && chatData.ok) {
      reset();
      mutate();
    }
  }, [chatData, reset, mutate]);

  return (
    <Layout canGoBack title={user?.name}>
      <div className="py-10 pb-16 px-4 space-y-4">
        {data &&
          user &&
          data.chats.map((chat) => (
            <div key={chat.id}>
              {user.id !== chat.userId ? (
                <Message message={chat.chatContent} />
              ) : (
                <Message message={chat.chatContent} reversed />
              )}
            </div>
          ))}
        <form
          className="fixed py-2 bg-white  bottom-0 inset-x-0"
          onSubmit={handleSubmit(onValid)}
        >
          <div className="flex relative max-w-md items-center w-full mx-auto">
            <input
              {...register("chat")}
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              type="text"
            />
            <div className="absolute inset-y-0 flex right-0">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </form>
        <div className="fixed py-2 bottom-6 inset-x-0">
          <div className="flex relative max-w-md items-center w-full mx-auto">
            <div className="absolute inset-y-0 flex -right-32 h-6">
              <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-lime-600 items-center bg-lime-600 rounded-full px-3 hover:bg-lime-700 text-sm text-white">
                예약
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
