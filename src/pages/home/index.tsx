import React from "react";
import { Text } from "../../components/Text";
import { auth } from "../../config/firebase";
import { User } from "firebase/auth";
type HomeProps = {
  user: User | null;
};

const Home: React.FC<HomeProps> = () => {
  return <Text>{`Hello ${auth?.currentUser?.email}!`}</Text>;
};

export default Home;
