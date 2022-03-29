import { createStore } from 'vuex'

// Create a new store instance.
export default createStore({
  state () {
    return {
      key: "03368cad0c0c6a178cdf790f63692758",
    }
  },
  getters:
  {
    getKey(state)
    {
        return state.key;
    }
  },
})