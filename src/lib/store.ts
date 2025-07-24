import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Message = {
  id: string
  content: string
  role: 'user' | 'assistant'
  createdAt: string
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [] as Message[],
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.push(action.payload)
    },
    clearMessages() {
      return []
    }
  }
})

export const { addMessage, clearMessages } = messagesSlice.actions

export const store = configureStore({ reducer: { messages: messagesSlice.reducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
