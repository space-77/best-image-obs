import { ImageParams, ObsConfig } from './obsConfig'

export default class BestImage {
  static obsConfigList: ObsConfig[] = []

  addObsConfig(config: ObsConfig | ObsConfig[]) {
    const configArr = Array.isArray(config) ? config : [config]
    BestImage.obsConfigList.push(...configArr)
  }

  value2Int(params: ImageParams) {
    params.w = params.w ? Math.ceil(Number(params.w)) : undefined
    params.h = params.h ? Math.ceil(Number(params.h)) : undefined
    params.r = params.r ? Math.floor(Number(params.r)) : undefined
  }

  getImageUrl(url: string, params: ImageParams, useConfig?: ObsConfig['configName']) {
    if (!url) return

    const { obsConfigList } = BestImage
    const len = obsConfigList.length
    let imgConfig: ObsConfig | undefined

    let [format] = url.match(/\.\w+/g)?.slice(-1) ?? []
    format = format.replace('.', '')

    if (len > 1 && !useConfig) {
      const [firstConfig] = obsConfigList
      console.warn(`存在多个配置信息，但未指定使用某个配置，以为选用第一个配置：${firstConfig.configName}`)
      imgConfig = firstConfig
    } else {
      imgConfig = len === 1 ? obsConfigList[0] : obsConfigList.find(i => i.configName === useConfig)
    }

    if (!imgConfig) {
      console.error('未找到配置信息')
      return url
    }

    this.value2Int(params)

    return url + imgConfig.format(params, format)
  }
}
