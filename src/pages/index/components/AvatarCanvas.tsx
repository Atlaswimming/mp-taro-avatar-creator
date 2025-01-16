import { Canvas, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef } from "react";
import { DOWNLOAD_AVATAR_EVENT } from "../../../constants/eventNames"; // 引入常量
import {
  beards,
  eyebrows,
  eyes,
  faces,
  mouths,
  noses,
} from "../../../constants/features";
import { useAvatarStore } from "../../../store/avatarStore";

const loadImg = (url, canvas) =>
  url &&
  new Promise((resolve, reject) => {
    const img = canvas.createImage();
    img.onload = () => resolve(img);
    img.onerror = (e) => {
      console.error("loadImg error: ", e);
      reject(e);
    };
    img.src = url;
  });

export const AvatarCanvas = () => {
  const canvasRef = useRef<Taro.CanvasContext>(null);
  const {
    features: {
      shape_key,
      shape_color,
      border_color = "",
      border_type = "",
      face_shape = "",
      eye_shape = "",
      eyebrow_shape = "",
      mouth_shape = "",
      nose_shape = "",
      beard_shape = "",
    },
    isFlipped = false,
    featuresOffset,
    currentFeature,
  } = useAvatarStore();

  useEffect(() => {
    const query = Taro.createSelectorQuery();

    const borderWidth =
      border_type === "none"
        ? 0
        : border_type === "bold"
        ? 8
        : border_type === "normal"
        ? 6
        : 4;

    query
      .select("#avatarCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const queryDom = res[0];
        const canvas = queryDom.node;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;

        const size = queryDom.width;
        const center = size / 2;

        // Clear canvas
        ctx.clearRect(0, 0, size, size);

        // Save the initial state
        ctx.save();
        ctx.scale(dpr, dpr);

        // Draw the shape
        if (shape_key === "circle") {
          ctx.beginPath();
          ctx.fillStyle = shape_color || "white";
          ctx.arc(center, center, center - borderWidth, 0, Math.PI * 2);
          ctx.fill();
          if (border_type !== "none") {
            ctx.strokeStyle = border_color;
            ctx.lineWidth = borderWidth;
            ctx.stroke();
          }
          ctx.closePath();
        } else if (shape_key === "rounded") {
          const r = 20;
          let x = 0;
          let y = 0;
          let h = size;
          let w = size;

          if (border_type !== "none") {
            // 先绘制外层 即边框
            ctx.fillStyle = border_color || "white";
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
            ctx.fill();

            // 再绘制内层 即填充色
            ctx.fillStyle = shape_color || "white";
            x += borderWidth;
            y += borderWidth;
            h -= 2 * borderWidth;
            w -= 2 * borderWidth;
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.fillStyle = shape_color || "white";
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
            ctx.fill();
          }
        } else if (shape_key === "square") {
          ctx.beginPath();
          ctx.fillStyle = shape_color || "white";
          ctx.rect(
            borderWidth,
            borderWidth,
            size - borderWidth * 2,
            size - borderWidth * 2
          );
          ctx.fill();
          if (border_type !== "none") {
            ctx.strokeStyle = border_color;
            ctx.lineWidth = borderWidth;
            ctx.stroke();
          }
          ctx.closePath();
        }

        const currentFace = faces.find((type) => type.name === face_shape);
        const currentEyebrow = eyebrows.find(
          (type) => type.name === eyebrow_shape
        );
        const currentEye = eyes.find((type) => type.name === eye_shape);
        const currentNose = noses.find((type) => type.name === nose_shape);
        const currentMouth = mouths.find((type) => type.name === mouth_shape);
        const currentBeard = beards.find((type) => type.name === beard_shape);

        Promise.all([
          currentFace && loadImg(currentFace?.value, canvas),
          currentEyebrow && loadImg(currentEyebrow?.value, canvas),
          currentEye && loadImg(currentEye?.value, canvas),
          currentNose && loadImg(currentNose?.value, canvas),
          currentMouth && loadImg(currentMouth?.value, canvas),
          currentBeard && loadImg(currentBeard?.value, canvas),
        ]).then(
          ([
            face,
            eyebrow = null,
            eye = null,
            nose = null,
            mouth = null,
            beard = null,
          ]) => {
            const baseSize = 150;

            // Draw face base
            if (face && face_shape !== "none") {
              const { x, y, zoom } = featuresOffset.face_shape;
              const size = baseSize * zoom;
              const X = center - size / 2 + x;
              const Y = center - size / 2 + y;
              ctx.drawImage(face, X, Y, size, size);
            }

            // Draw eyebrow base
            if (eyebrow && eyebrow_shape !== "none") {
              const { x, y, zoom } = featuresOffset.eyebrow_shape;
              const size = baseSize * zoom;
              const X = center - size / 2 + x;
              const Y = center - size / 2 + y;
              ctx.drawImage(eyebrow, X, Y, size, size);
            }

            // Draw eye base
            if (eye && eye_shape !== "none") {
              const { x, y, zoom } = featuresOffset.eye_shape;
              const size = baseSize * zoom;
              const X = center - size / 2 + x;
              const Y = center - size / 2 + y;
              ctx.drawImage(eye, X, Y, size, size);
            }

            // Draw nose base
            if (nose && nose_shape !== "none") {
              const { x, y, zoom } = featuresOffset.nose_shape;
              const size = baseSize * zoom;
              const X = center - size / 2 + x;
              const Y = center - size / 2 + y;
              ctx.drawImage(nose, X, Y, size, size);
            }

            // Draw mouth base
            if (mouth && mouth_shape !== "none") {
              // 控制嘴巴的位置，如果有 beard_1, 向下移动一些
              // let mouthY = [
              //   "beard_1_1",
              //   "beard_1_2",
              //   "beard_2_1",
              //   "beard_2_2",
              // ].includes(beard_shape)
              //   ? 72
              //   : baseOffsetY;
              // if (
              //   face_shape.includes("face_1") ||
              //   face_shape.includes("face_2") ||
              //   face_shape.includes("face_5")
              // ) {
              //   mouthY += 2;
              // }
              // if (currentFeature === currentMouth?.name) {
              //   baseOffsetX += featureOffsetX;
              //   baseOffsetY = mouthY + featureOffsetY;
              //   baseSize *= featureZoom;
              // }
              const { x, y, zoom } = featuresOffset.mouth_shape;
              const size = baseSize * zoom;
              const X = center - size / 2 + x;
              const Y = center - size / 2 + y;
              ctx.drawImage(mouth, X, Y, size, size);
            }

            // Draw beard base
            if (beard && beard_shape !== "none") {
              let beardY = center - 72;
              // 特殊处理圆胡子
              // if (beard_shape === "beard_2_1" || beard_shape === "beard_2_2") {
              //   if (
              //     face_shape.includes("face_1") ||
              //     face_shape.includes("face_2")
              //   ) {
              //     beardY += 4;
              //   } else if (face_shape.includes("face_5")) {
              //     beardY += 0;
              //   } else {
              //     beardY += 8;
              //   }
              // }
              const { x, y, zoom } = featuresOffset.beard_shape;
              const size = baseSize * zoom;
              const X = center - size / 2 + x;
              const Y = center - size / 2 + y;
              ctx.drawImage(beard, X, Y, size, size);
            }

            // Apply mirror effect if needed
            // if (isFlipped) {
            //   ctx.translate(size, 0);
            //   ctx.scale(-1, 1);
            // }
          }
        );
      });
  }, [
    isFlipped,
    shape_key,
    shape_color,
    border_color,
    border_type,
    face_shape,
    eyebrow_shape,
    eye_shape,
    nose_shape,
    mouth_shape,
    beard_shape,
    currentFeature,
    featuresOffset,
    currentFeature,
  ]);

  const downloadImage = () => {
    const ctx = Taro.createCanvasContext("avatarCanvas");
    if (!ctx) return;
    const query = Taro.createSelectorQuery();
    query
      .select("#avatarCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const queryDom = res[0].node;
        Taro.canvasToTempFilePath({
          canvas: queryDom,
          success: (res) => {
            Taro.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                Taro.showToast({
                  title: "头像已保存到相册",
                  icon: "success",
                });
              },
              fail: () => {
                Taro.showToast({
                  title: "保存失败",
                  icon: "none",
                });
              },
            });
          },
          fail: () => {
            Taro.showToast({
              title: "保存失败",
              icon: "none",
            });
          },
        });
      });
  };

  // 监听自定义事件-下载头像
  useEffect(() => {
    const downloadHandler = () => {
      downloadImage();
    };

    Taro.eventCenter.on(DOWNLOAD_AVATAR_EVENT, downloadHandler);

    return () => {
      Taro.eventCenter.off(DOWNLOAD_AVATAR_EVENT, downloadHandler);
    };
  }, [downloadImage]);

  return (
    <View className="canvas-container w-[70vw] grow-0 shrink-0 flex justify-center items-center">
      <Canvas
        ref={canvasRef}
        type="2d"
        id="avatarCanvas"
        canvasId="avatarCanvas"
        style={{ width: "30vh", height: "30vh" }}
      />
    </View>
  );
};

const createGradientString = (color1: string, color2: string) => {
  return `linear-gradient(45deg, ${color1}, ${color2})`;
};
