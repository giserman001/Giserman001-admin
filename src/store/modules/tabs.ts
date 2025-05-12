import router from "@/router";
import { defineStore } from "pinia";
import { getUrlWithParams } from "@/utils";
import { useKeepAliveStore } from "./keepAlive";
import { TabsState, TabsMenuProps } from "@/store/interface";
import piniaPersistConfig from "@/store/helper/persist";

const storeId = 'tabs'

export const useTabsStore = defineStore(storeId, () => {

  const keepAliveStore = useKeepAliveStore();

  const state = reactive<TabsState>({
    tabsMenuList: []
  })

  // Add Tabs
  async function addTabs(tabItem: TabsMenuProps) {
    if (state.tabsMenuList.every(item => item.path !== tabItem.path)) {
      state.tabsMenuList.push(tabItem);
    }
    // add keepalive
    if (!keepAliveStore.state.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
      keepAliveStore.addKeepAliveName(tabItem.path);
    }
  }

  // Remove Tabs
  async function removeTabs(tabPath: string, isCurrent: boolean = true) {
    if (isCurrent) {
      state.tabsMenuList.forEach((item, index) => {
        if (item.path !== tabPath) return;
        const nextTab = state.tabsMenuList[index + 1] || state.tabsMenuList[index - 1];
        if (!nextTab) return;
        router.push(nextTab.path);
      });
    }
    // remove keepalive
    const tabItem = state.tabsMenuList.find(item => item.path === tabPath);
    tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.path);
    // set tabs
    state.tabsMenuList = state.tabsMenuList.filter(item => item.path !== tabPath);
  }

  // Close Tabs On Side
  async function closeTabsOnSide(path: string, type: "left" | "right") {
    const currentIndex = state.tabsMenuList.findIndex(item => item.path === path);
    if (currentIndex !== -1) {
      const range = type === "left" ? [0, currentIndex] : [currentIndex + 1, state.tabsMenuList.length];
      state.tabsMenuList = state.tabsMenuList.filter((item, index) => {
        return index < range[0] || index >= range[1] || !item.close;
      });
    }
    // set keepalive
    const KeepAliveList = state.tabsMenuList.filter(item => item.isKeepAlive);
    keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.path));
  }

  // Close MultipleTab
  async function closeMultipleTab(tabsMenuValue?: string) {
    state.tabsMenuList = state.tabsMenuList.filter(item => {
      return item.path === tabsMenuValue || !item.close;
    });
    // set keepalive
    const KeepAliveList = state.tabsMenuList.filter(item => item.isKeepAlive);
    keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.path));
  }

  // Set Tabs
  async function setTabs(tabsMenuList: TabsMenuProps[]) {
    state.tabsMenuList = tabsMenuList;
  }

  // Set Tabs Title
  async function setTabsTitle(title: string) {
    state.tabsMenuList.forEach(item => {
      if (item.path == getUrlWithParams()) item.title = title;
    });
  }

  return {
    state,
    addTabs,
    removeTabs,
    closeTabsOnSide,
    closeMultipleTab,
    setTabs,
    setTabsTitle
  }
}, {
  persist: piniaPersistConfig(storeId)
});
