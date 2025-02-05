import { Image, ScrollView, Text, View } from "@tarojs/components";
import { useState } from "react";
import {
  beards as normalBeards,
  eyebrows as normalEyebrows,
  eyes as normalEyes,
  faces as normalFaces,
  mouths as normalMouths,
  noses as normalNoses,
  borders,
  shapes,
  seasons,
} from "src/constants/features";
import {
  eyebrows as abstractEyebrows,
  eyes as abstractEyes,
  faces as abstractFaces,
  mouths as abstractMouths,
  noses as abstractNoses,
  decoration as abstractDecoration,
} from "src/constants/abstractFeatures";
import Forbid from "../../../assets/icons/forbid.svg";
import Selected from "../../../assets/icons/selected.svg";
import {
  colorsPalette1,
  colorsPalette2,
  colorsPalette3,
  colorsPalette4,
} from "../../../constants/colorPalettes";
import { useAvatarStore } from "../../../store/avatarStore";
import { FeatureRender } from "./FeatureRender";

const colorsPalettes = [
  colorsPalette1,
  colorsPalette2,
  colorsPalette3,
  colorsPalette4,
];

const colorsPaletteRender = (
  palette: string[],
  selectedColor?: string,
  handleSingleColorSelecte?: (color: string) => void
) => {
  return palette.map((color, index) => {
    return (
      <View
        key={index}
        className={`grow h-full flex items-center justify-center m-0 border-box ${
          selectedColor && color === selectedColor
            ? "border-2 border-gray-100"
            : "border-0"
        }`}
        style={{
          backgroundColor: color,
        }}
        onClick={() =>
          handleSingleColorSelecte && handleSingleColorSelecte(color)
        }
      >
        {selectedColor && color === selectedColor && (
          <Image src={Selected} className="size-4 opacity-70" />
        )}
      </View>
    );
  });
};

export const FeaturePanel = () => {
  const {
    type,
    setFeature,
    features: {
      shape_color,
      shape_key,
      border_color,
      border_type,
      face_shape,
      eye_shape,
      eyebrow_shape,
      mouth_shape,
      nose_shape,
      beard_shape,
      season_shape,
    },
  } = useAvatarStore();

  const [activeTab, setActiveTab] = useState(0);
  const [viewId, setViewId] = useState<string>("");

  let tabItems;
  if (type === "abstract") {
    tabItems = ["季节限定", "背景", "脸型", "五官", "装饰"];
  } else {
    tabItems = [
      "季节限定",
      "背景",
      "脸型",
      "五官",
      // "饰品", "服饰"
    ];
  }
  let faces, eyes, eyebrows, mouths, noses, beards, decorations;
  switch (type) {
    case "":
      faces = normalFaces;
      eyes = normalEyes;
      eyebrows = normalEyebrows;
      mouths = normalMouths;
      noses = normalNoses;
      beards = normalBeards;
      break;
    default:
    case "abstract":
      faces = abstractFaces;
      eyes = abstractEyes;
      eyebrows = abstractEyebrows;
      mouths = abstractMouths;
      noses = abstractNoses;
      decorations = abstractDecoration;
      break;
  }

  const handleScroll = (event) => {
    const scrollTop = event.detail.scrollTop;
    const scrollHeight = event.detail.scrollHeight;

    // 根据滚动位置计算当前应该激活的 tab
    const newActiveTab = Math.floor(
      scrollTop / (scrollHeight / tabItems.length)
    );
    if (newActiveTab !== activeTab) {
      setActiveTab(newActiveTab);
    }
  };

  const scrollToTab = (index) => {
    setViewId(`tab-${index}`);
  };

  return (
    <View className="flex w-full h-[49vh] py-[2vh]">
      <ScrollView
        className="w-[16vw] shrink-0 h-full"
        scrollY
        scrollWithAnimation
      >
        {tabItems.map((item, index) => {
          return (
            <View
              key={index}
              className={`h-[80px] flex items-center justify-center ${
                index === activeTab ? "text-white" : "text-slate-400"
              }`}
              onClick={() => scrollToTab(index)} // 添加点击事件
            >
              <Text className="block w-full px-3">{item}</Text>
            </View>
          );
        })}
      </ScrollView>
      <ScrollView
        className="text-white w-[84vw] h-full grow-1 pr-2"
        id="featurePannelScrollView"
        scrollY
        enhanced
        scrollWithAnimation
        fastDeceleration
        onScroll={handleScroll}
        scrollIntoView={viewId}
      >
        {tabItems.map((item, index) => {
          return (
            <View
              key={index}
              id={`tab-${index}`}
              className="min-h-20 w-full flex flex-col items-center justify-start px-2"
            >
              <Text className="texts-left w-full">{item}</Text>
              {item === "季节限定" &&
                FeatureRender("", seasons, "season_shape", season_shape)}
              {item === "背景" && (
                <View className="w-full min-h-16 flex items-center flex-col overflow-x-scroll">
                  <View className="w-full min-h-16 flex items-center justify-start overflow-x-scroll">
                    {shapes.map((type, index) => {
                      return (
                        <View
                          key={index}
                          className={`relative w-14 h-14 shrink-0 grow-0 flex flex-wrap items-center justify-center py-1 mr-2 bg-stone-200/20 rounded-md`}
                          onClick={() => {
                            setFeature(
                              "shape_key",
                              type === "none" || type === shape_key
                                ? "none"
                                : type
                            );
                          }}
                        >
                          {type === "none" ? (
                            <Image src={Forbid} className="size-8 absolute" />
                          ) : (
                            <View
                              className={`w-6 h-6 bg-stone-50 ${
                                type === "circle"
                                  ? "rounded-full"
                                  : type === "rounded"
                                  ? "rounded-md"
                                  : "rounded-none"
                              } 
                              `}
                            />
                          )}
                          {shape_key === type && (
                            <Image
                              src={Selected}
                              className="size-3 absolute top-1 right-1 opacity-70"
                            />
                          )}
                        </View>
                      );
                    })}
                  </View>

                  <View className="w-full h-4 flex flex-no-wrap justify-center my-1 pr-1">
                    {colorsPaletteRender(
                      colorsPalettes[0],
                      shape_color || colorsPalettes[0][0],
                      (color) => {
                        setFeature("shape_color", color);
                      }
                    )}
                  </View>

                  <Text className="texts-left w-full mt-2">边框</Text>
                  <View className="w-full min-h-16 flex items-center justify-start overflow-x-scroll">
                    {borders.map((type, index) => {
                      return (
                        <View
                          key={index}
                          className={`relative w-12 h-12 shrink-0 grow-0 flex flex-wrap items-center justify-center py-1 mr-2 bg-stone-200/20 rounded-m`}
                          onClick={() => {
                            setFeature(
                              "border_type",
                              type === "none" || type === border_type
                                ? "none"
                                : type
                            );
                          }}
                        >
                          {type === "none" ? (
                            <Image src={Forbid} className="size-8 absolute" />
                          ) : (
                            <View
                              className={`w-8 bg-stone-50 ${
                                type === "normal"
                                  ? "h-2"
                                  : type === "bold"
                                  ? "h-3"
                                  : type === "lighter"
                                  ? "h-1"
                                  : "h-0"
                              } 
                        `}
                            />
                          )}

                          {border_type === type && (
                            <Image
                              src={Selected}
                              className="size-3 absolute top-1 right-1 opacity-70"
                            />
                          )}
                        </View>
                      );
                    })}
                  </View>
                  <View className="w-full h-4 flex flex-no-wrap justify-center my-1 pr-1">
                    {colorsPaletteRender(
                      colorsPalettes[0],
                      border_color || colorsPalettes[0][0],
                      (color) => {
                        setFeature("border_color", color);
                      }
                    )}
                  </View>
                </View>
              )}
              {item === "脸型" && (
                <View className="w-full min-h-16 flex justify-start overflow-x-scroll">
                  {FeatureRender("", faces, "face_shape", face_shape)}
                </View>
              )}
              {item === "五官" && (
                <View className="w-full min-h-16 flex flex-col">
                  {FeatureRender("眼睛", eyes, "eye_shape", eye_shape)}

                  {FeatureRender("嘴巴", mouths, "mouth_shape", mouth_shape)}

                  {item !== "abstract" &&
                    eyebrows &&
                    FeatureRender(
                      "眉毛",
                      eyebrows,
                      "eyebrow_shape",
                      eyebrow_shape
                    )}

                  {FeatureRender("鼻子", noses, "nose_shape", nose_shape)}

                  {item !== "abstract" &&
                    beards &&
                    FeatureRender("胡子", beards, "beard_shape", beard_shape)}
                </View>
              )}
              {item === "装饰" && (
                <View className="w-full min-h-16 flex justify-start overflow-x-scroll">
                  {decorations &&
                    FeatureRender("", decorations, "decoration_shape", "none")}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
