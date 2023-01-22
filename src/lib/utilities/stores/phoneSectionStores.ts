import persistedWritable from "$utilities/persistedWritable"

export const answeredCall = persistedWritable("answeredCall", false)

export const conversationDone = persistedWritable("conversationDone", false)

export const momCalling = persistedWritable("momCalling", false)
