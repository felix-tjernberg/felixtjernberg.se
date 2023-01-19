import persistedWritable from "$utilities/persistedWritable"

export const momCalling = persistedWritable("momCalling", false)

export const answeredCall = persistedWritable("answeredCall", false)

export const conversationDone = persistedWritable("conversationDone", false)
