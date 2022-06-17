import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  // /api/users/me key와 같은 역할도 한다 ! 이것을 그대로 다른 컴포넌트에서 쓰면 사용 가능하다 !!! 저대로!! 굳이 리덕스를 안써도 될 듯
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
