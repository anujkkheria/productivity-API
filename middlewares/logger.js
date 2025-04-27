import { createNewLogger } from '../utils/createNewlogger.js'

export function logger(req, res, next) {
  const url = req.originalUrl
  const urlSplit = url.split('/')
  const actionSplit = urlSplit.map((item) => (item === '' ? 'test' : item))
  const actionType = actionSplit[1]
  console.log(actionSplit, actionType)
  createNewLogger.info({ actionType: actionType })
  next()
}
