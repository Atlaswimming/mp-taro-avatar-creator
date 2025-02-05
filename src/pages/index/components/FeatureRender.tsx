import { View, Image, Text } from "@tarojs/components";
import { useAvatarStore } from "../../../store/avatarStore";
import Selected from "../../../assets/icons/selected.svg";
import Forbid from "../../../assets/icons/forbid.svg";
import { FeatureType } from "../../../constants/features";

export const FeatureRender = (
  title: string,
  featureElements: FeatureType,
  featureKey: string,
  shape?: string
) => {
  const { setFeature, currentFeature, setCurrentFeature } = useAvatarStore();
  return (
    <>
      {title && (
        <Text className="texts-left w-full text-slate-50/50">{title}</Text>
      )}
      <View className="w-full min-h-20 flex items-center justify-start overflow-x-scroll">
        {featureElements.map((type, index) => {
          return (
            <View
              key={index}
              className={`relative w-16 h-16 shrink-0 grow-0 flex flex-wrap items-center justify-center py-1 mr-4 bg-stone-200/20 rounded-md
                            ${
                              type.name === currentFeature
                                ? "border-2 border-gray-100"
                                : "border-0"
                            } `}
              onClick={() => {
                setFeature(
                  featureKey,
                  type.name === "none" || type.name === shape
                    ? "none"
                    : type.name
                );
                setCurrentFeature(
                  type.name === "none" || type.name === shape ? "" : type.name
                );
              }}
            >
              {type.name === shape && (
                <Image
                  src={Selected}
                  className="size-3 absolute top-1 right-1 opacity-70"
                />
              )}
              {type.name === "none" ? (
                <Image src={Forbid} className="size-8 absolute" />
              ) : (
                <Image src={type.value} className="size-12" />
              )}
            </View>
          );
        })}
      </View>
    </>
  );
};
