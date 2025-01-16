export default {
  pages: ["pages/index/index", "pages/mine/index"],
  tabBar: {
    color: "#999",
    selectedColor: "#8c2de9",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/tabbar/home.png",
        selectedIconPath: "assets/tabbar/home-selected.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "assets/tabbar/other.png",
        selectedIconPath: "assets/tabbar/other-selected.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
