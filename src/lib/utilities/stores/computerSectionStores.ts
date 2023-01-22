import persistedWritable from "$utilities/persistedWritable"

export const dialUpAudioCurrentTime = persistedWritable("dialUpAudioCurrentTime", 0)

export const dialUpAudioPaused = persistedWritable("dialUpAudioPaused", false)

export const phoneRingtonePaused = persistedWritable("phoneRingtonePaused", true)
