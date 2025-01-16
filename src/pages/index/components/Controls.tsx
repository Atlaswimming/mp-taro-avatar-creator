import { Button, Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Download from "../../../assets/icons/download.svg";
import Randomize from "../../../assets/icons/randomize.svg";
import Redo from "../../../assets/icons/redo.svg";
import Refresh from "../../../assets/icons/refresh.svg";
import Undo from "../../../assets/icons/undo.svg";
import { DOWNLOAD_AVATAR_EVENT } from "../../../constants/eventNames"; // 引入常量
import { useAvatarStore } from "../../../store/avatarStore";

export const Controls = () => {
  const { undo, redo, randomize, reset, currentStep, history } =
    useAvatarStore();

  const handleSave = async () => {
    // 触发自定义事件
    Taro.eventCenter.trigger(DOWNLOAD_AVATAR_EVENT);
  };

  return (
    <View className="flex w-full px-12">
      <View className="flex w-3/4 px-4 justify-center items-center rounded-full bg-slate-50/20 h-12 mr-2">
        <Button
          disabled={currentStep === 0}
          onClick={undo}
          className="size-8 flex justify-center content-center p-0 rounded-full bg-slate-200/90"
        >
          <Image
            src={Undo}
            className={`size-4 h-8 ${currentStep === 0 ? "opacity-40" : ""}`}
          />
        </Button>
        <Button
          disabled={currentStep === history.length - 1}
          onClick={redo}
          className="size-8 flex  justify-center content-center p-0 rounded-full bg-slate-200/90"
        >
          <Image
            src={Redo}
            className={`size-4 h-8 ${
              currentStep === history.length - 1 ? "opacity-40" : ""
            }`}
          />
        </Button>
        <Button
          onClick={randomize}
          className="size-8 flex  justify-center content-center p-0 rounded-full bg-slate-200/90"
        >
          <Image src={Randomize} className="size-4 h-8" />
        </Button>
        <Button
          onClick={() => {
            Taro.showModal({
              content: "是否确认重置？",
              success: (res) => {
                if (res.confirm) {
                  reset();
                }
              },
            });
          }}
          className="size-8 flex  justify-center content-center p-0 rounded-full bg-stone-200/90"
        >
          <Image src={Refresh} className="size-4 h-8" />
        </Button>
      </View>
      <View className="flex w-1/4  px-4 justify-center items-center rounded-full bg-stone-200/20 h-12">
        <Button
          onClick={handleSave}
          className="size-8 flex  justify-center content-center p-0 rounded-full bg-stone-200/90"
        >
          <Image src={Download} className="size-4 h-8" />
        </Button>
      </View>
    </View>
  );
};
