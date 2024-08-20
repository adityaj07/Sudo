"use client";

import { useAppSelector } from "@/lib/hooks";
import { User } from "@/Types/type";
import { FC, useState } from "react";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [user, setuser] = useState<User | null>(null);
  return <div>{currentUser && <div>{currentUser?.name}</div>}</div>;
};

export default ProfilePage;
