import { isVoid } from './tools'

// const configKey = {
//   ['crop', 'scrop', 'rradius', 'quality', 'thumbnail']
// }

type Param = string | number

function hasSize(w: Param, h: Param) {
  return isVoid(w) && isVoid(h)
}

const ConfigKey = {
  /**
   * @desc 裁剪
   */
  crop: '',

  /**
   * @desc 人脸智能裁剪参数说明
   */
  scrop: '',

  /**
   * @desc 圆角裁剪
   */
  rradius: '',

  /**
   * @desc 图片的绝对质量
   */
  quality: '',

  /**
   * @desc 缩放 指定图片的宽高为原图的 Scale%
   */
  thumbnail: ''
}

type TConfigKey = keyof typeof ConfigKey

export type ObsConfig = {
  scrop?: Param
  quality?: Param
  thumbnail?: Param

  /**
   * @desc 名称
   */
  readonly configName: CONFIG_NAME | string

  format(params: ImageParams, format?: string): string
}

export interface ImageParams {
  q?: Param
  t?: Param
  w?: Param
  h?: Param
  r?: Param
}

enum CONFIG_NAME {
  TENCENT = 'tx',

  ALIYUN = 'al',

  HUAWEI = 'hw',

  BAIDU = 'bd',

  QINIU = 'qn',

  JDCLOUD = 'jd',

  KSYUN = 'ks'
}

export class BaseObs {
  scrop?: Param
  quality?: Param
  thumbnail?: Param

  constructor({ quality, scrop, thumbnail }: { quality?: Param; scrop?: Param; thumbnail?: Param } = {}) {
    this.scrop = scrop
    this.quality = quality
    this.thumbnail = thumbnail
  }
}

export class Tencent extends BaseObs implements ObsConfig {
  configName = CONFIG_NAME.TENCENT

  format(params: ImageParams) {
    const { scrop: s, quality: q, thumbnail: t } = this
    const { w, h, r } = params
    const hasSize = !isVoid(w) && !isVoid(h)

    // 缩放裁剪
    const crop = hasSize ? `/crop/${w}x${h}/gravity/center` : ''
    const scrop = s && hasSize ? `/scrop/${w}x${h}` : ''
    const quality = q ? `/q/${q}` : ''
    const radius = r ? `/rradius/${r}` : ''
    // const thumbnail = t ? `/thumbnail/!${t}p` : ''

    const query = [crop, scrop, quality, radius].filter(Boolean).join('')
    return `?imageMogr2/interlace/1${query}`
  }
}

export class Aliyun extends BaseObs implements ObsConfig {
  configName = CONFIG_NAME.ALIYUN

  format(params: ImageParams) {
    const { quality: q, thumbnail: t } = this
    const { w, h, r } = params
    const hasSize = !isVoid(w) && !isVoid(h)

    const crop = hasSize ? `/resize,h_${h},w_${w},m_mfit/crop,h_${h},w_${w},g_center` : ''
    const quality = q ? `/quality,q_${q}` : ''
    const radius = r ? `/rounded-corners,r_${r}` : ''
    const thumbnail = t ? `/resize,p_${t}` : ''

    const query = [crop, quality, radius, thumbnail].join('')
    return `?x-oss-process=image${query}/interlace,1`
  }
}

export class HuaweiCloud extends BaseObs implements ObsConfig  {
  configName = CONFIG_NAME.HUAWEI

  format(params: ImageParams, format?: string) {
    const { quality: q } = this
    const { w, h, r } = params
    const hasSize = !isVoid(w) && !isVoid(h)

    const crop = hasSize ? `/resize,m_fill,h_${h},w_${w}` : ''
    const quality = q ? `/quality,q_${q}` : ''
    const radius = r ? `/rounded-corners,r_${r}/format,${format}` : ''
    // format,jpg/interlace,0

    const query = [crop, quality, radius].join('')
    return `?x-image-process=image${query}/interlace,1`
  }
}

export class BaiduCloud extends BaseObs implements ObsConfig  {
  configName = CONFIG_NAME.BAIDU

  format(params: ImageParams, format?: string) {
    const { quality: q } = this
    const { w, h, r } = params
    const hasSize = !isVoid(w) && !isVoid(h)

    const crop = hasSize ? `/resize,m_fill,h_${h},w_${w}` : ''
    const quality = q ? `/quality,q_${q}` : ''
    const radius = r ? `/rounded-corners,r_${r}` : ''

    const query = [crop, quality, radius].join('')
    // x-bce-process=image/crop,x_10,y_10,w_200,h_200
    return `?x-bce-process=image${query}/interlace,i_progressive`
  }
}

export class JdCloud extends BaseObs implements ObsConfig  {
  configName = CONFIG_NAME.JDCLOUD

  format(params: ImageParams, format?: string) {
    const { scrop: s, quality: q } = this
    const { w, h, r } = params
    const hasSize = !isVoid(w) && !isVoid(h)

    const crop = hasSize ? `img/cc/${w}/${h}` : ''
    // const scrop = s && hasSize ? `/scrop/${w}x${h}` : ''
    // const quality = q ? `/q/${q}` : ''
    // TODO 不生效
    // const radius = r ? `/roundPic/radius/${r}` : ''

    const query = [crop].filter(Boolean).join('')
    return `?x-oss-process=${query}/interlace/1`
  }
}

export class Ksyun extends BaseObs implements ObsConfig  {
  configName = CONFIG_NAME.KSYUN

  format(params: ImageParams, format?: string) {
    const { scrop: s, quality: q } = this
    const { w, h, r } = params
    const hasSize = !isVoid(w) && !isVoid(h)

    // http://ks3-resources.ks3-cn-beijing.ksyuncs.com/suiyi.jpg@base@tag=imgScale&h=30&w=200&m=0&c=1
    const crop = hasSize ? `imgScale&h=${h}&w=${w}&m=1&c=1` : ''
    // const scrop = s && hasSize ? `/scrop/${w}x${h}` : ''
    // const quality = q ? `/q/${q}` : ''
    // TODO 不生效
    // const radius = r ? `/roundPic/radius/${r}` : ''

    const query = [crop].filter(Boolean).join('')
    return `@base@tag=${query}&interlace/1`
  }
}

export class Qiniu extends BaseObs implements ObsConfig  {
  configName = CONFIG_NAME.QINIU

  format(params: ImageParams, format?: string) {
    const { scrop: s, quality: q } = this
    const { w, h, r } = params
    const hasSize = !isVoid(w) && !isVoid(h)

    const crop = hasSize ? `/1/w/${w}/h/${h}` : ''
    const scrop = s && hasSize ? `/scrop/${w}x${h}` : ''
    const quality = q ? `/q/${q}` : ''
    // TODO 不生效
    const radius = r ? `/roundPic/radius/${r}` : ''

    const query = [crop, scrop, quality, radius].filter(Boolean).join('')
    return `?imageView2${query}/interlace/1`
  }
}
