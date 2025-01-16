import { Button, Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import ZoomIn from "../../../assets/icons/zoomIn.svg";
import ZoomOut from "../../../assets/icons/zoomOut.svg";
import Arrow from "../../../assets/icons/arrow.svg";
import { DOWNLOAD_AVATAR_EVENT } from "../../../constants/eventNames"; // 引入常量
import { useAvatarStore } from "../../../store/avatarStore";

export const Editor = () => {
  const { currentFeature, setFeatureOffset, setFeatureZoom } = useAvatarStore();

  return (
    <View className="flex w-[30vw] pr-4 grow-0 shrink-0 flex-col items-center justify-start">
      <View className="flex w-full h-2/3 mb-4 px-2 py-4 justify-center items-center flex-wrap rounded-xl bg-slate-50/20">
        <View className="w-full">
          <Button
            disabled={!currentFeature}
            onClick={() => setFeatureOffset("up")}
            className={`size-8 flex justify-center content-center p-0 mx-auto rounded-full bg-slate-200/90 ${
              !currentFeature && "opacity-40"
            }`}
          >
            <Image src={Arrow} className={`size-4 h-8`} />
          </Button>
        </View>
        <View className="w-full flex flex-nowrap justify-center items-center">
          <Button
            disabled={!currentFeature}
            onClick={() => setFeatureOffset("left")}
            className={`size-8 flex justify-center content-center p-0 rounded-full bg-slate-200/90 ${
              !currentFeature && "opacity-40"
            }`}
          >
            <Image src={Arrow} className={`size-4 h-8 -rotate-90`} />
          </Button>
          <Button
            disabled={!currentFeature}
            onClick={() => setFeatureOffset("right")}
            className={`size-8 flex justify-center content-center p-0 rounded-full bg-slate-200/90 ${
              !currentFeature && "opacity-40"
            }`}
          >
            <Image src={Arrow} className="size-4 h-8 rotate-90" />
          </Button>
        </View>
        <Button
          disabled={!currentFeature}
          onClick={() => setFeatureOffset("down")}
          className={`size-8 flex  justify-center content-center p-0 rounded-full bg-stone-200/90 ${
            !currentFeature && "opacity-40"
          }`}
        >
          <Image src={Arrow} className="size-4 h-8 rotate-180" />
        </Button>
      </View>

      <View className="flex w-full h-1/3 px-4 justify-center items-center rounded-xl bg-stone-200/20 h-12">
        <Button
          disabled={!currentFeature}
          onClick={() => setFeatureZoom("out")}
          className={`size-8 flex justify-center content-center mr-1 p-0 rounded-full bg-stone-200/90 ${
            !currentFeature && "opacity-40"
          }`}
        >
          <Image src={ZoomOut} className="size-4 h-8" />
        </Button>
        <Button
          onClick={() => setFeatureZoom("in")}
          className={`size-8 flex justify-center content-center p-0 rounded-full bg-stone-200/90 ${
            !currentFeature && "opacity-40"
          }`}
        >
          <Image src={ZoomIn} className="size-4 h-8" />
        </Button>
      </View>
    </View>
  );
};
