import { View } from "@tarojs/components";
import { AvatarCanvas } from "./components/AvatarCanvas";
import { Controls } from "./components/Controls";
import { Editor } from "./components/Editor";
import { FeaturePanel } from "./components/FeaturePanel";

import "./index.scss";

const Index = () => {
  return (
    <View className="wrapper">
      <View className="text-2xl h-[4vh] mt-[6vh] mb-[2vh] text-center text-white font-mono">
        {/* 可爱的我 */}
      </View>
      <View className="flex justify-center w-full max-h-[34vh] overflow-scroll">
        <AvatarCanvas type="abstract" />
        <Editor />
      </View>

      <View className="flex max-h-[50vh] mt-[2vh]">
        <FeaturePanel type="abstract" />
      </View>
      {/* <View className="w-full fixed top-[44vh] max-h-[8vh]">
        <Controls />
      </View> */}
      <View className="w-full fixed bottom-[1.2vh] max-h-[8vh]">
        <Controls />
      </View>
    </View>
  );
};

export default Index;
