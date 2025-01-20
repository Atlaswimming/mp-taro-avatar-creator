import { Image, View } from "@tarojs/components";
import p1 from "../../assets/intro/1.png";
import p2 from "../../assets/intro/2.png";

import "./index.scss";

const Index = () => {
  return (
    <View className="wrapper">
      <View className="text-center m-2">制作一个可爱表情</View>
      <View className="text-center  m-2">添加到聊天窗口</View>
      <View className="text-center  m-2">发送给可爱的人吧</View>
      <Image className="w-full h-[130vw]" src={p1} />
      <Image className="w-full h-[109vw]" src={p2} />
    </View>
  );
};

export default Index;
