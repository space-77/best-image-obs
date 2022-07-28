type ImageConfig = {
  /**
   * 图片质量
   */
  q?: number

  /**
   * 图片缩放
   */
  t?: number

  /**
   * 宽
   */
  w?: number

  /**
   * 高
   */
  h?: number

  /**
   * 图片的宽高，优先级低于 w h 参数。（正方形的情况下用）
   */
  size?: number

  /**
   * 圆角裁剪
   */
  r?: number

  /**
   * 人脸智能裁剪大小(传入参数则表示寻找人脸)
   */
  s?: number

  /**
   * 是否转换成物理像素
   */
  c?: boolean
}

// 腾讯云 文档
// https://cloud.tencent.com/document/product/436/44880
// https://examples-1251000004.cos.ap-shanghai.myqcloud.com/sample.jpeg、

// 阿里云
// https://help.aliyun.com/document_detail/144582.html

class BestImage {
  constructor() {}

  getImageUrl(url: string, { q = 90, t, w, h, r }: ImageConfig = {}) {
    if (!url) return
    // let isCrop = !!(w && h)
    // if (!isCrop && size) {
    //   isCrop = true
    //   w = size
    //   h = size
    // }

    const params = {
      quality: q ? `/q/${q}` : '', // 图片的绝对质量
      thumbnail: t ? `/thumbnail/!${t}p` : '', // 缩放 指定图片的宽高为原图的 Scale%
      scrop: `/scrop/${w}x${h}`, // 人脸智能裁剪参数说明
      crop: `/crop/${w}x${h}/gravity/center`, // 裁剪
      rradius: r ? `/rradius/${r}` : '' // 圆角裁剪
    }

    const query = `?imageMogr2/interlace/1${Object.values(params).join('')}`
    // const src = url + query
    return url + query
  }

  $convertSize(size: number) {
    return size * devicePixelRatio
  }
}

export default new BestImage()
