const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});

export { store };
