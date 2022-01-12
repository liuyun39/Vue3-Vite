import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      counter: 0,
      name: 'Eduardo',
      isAdmin: true
    }
  },
  getters: {
    doubleCount: (state) => state.counter * 2,
    doublePlusOne(): number {
      return this.counter * 2 + 1
    },
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    },
    getUserById: (state) => {
      return (userId: number) => state.counter + userId
    },
  },
  actions: {
    // await
  }
})