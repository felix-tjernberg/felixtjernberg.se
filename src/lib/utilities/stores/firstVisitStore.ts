import persistedWritable from "$utilities/persistedWritable"

export const firstVisit = persistedWritable("firstVisit", false)

export const firstVisitNotification = persistedWritable("firstVisitNotification", false)
