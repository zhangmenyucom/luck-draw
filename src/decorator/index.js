import { operatingEnvironment } from '../utils'

export const isWx = (target) => {
  target.isWx = operatingEnvironment() === 'miniApp'
}
