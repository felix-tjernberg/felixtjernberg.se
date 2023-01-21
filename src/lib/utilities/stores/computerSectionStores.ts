import persistedWritable from "$utilities/persistedWritable"

export const dialUpAudioCurrentTime = persistedWritable("dialUpAudioCurrentTime", false)

export const dialUpAudioPaused = persistedWritable("dialUpAudioPaused", false)

export const phoneRingtonePaused = persistedWritable("phoneRingtonePaused", true)
