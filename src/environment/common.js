export default {
  noVerification: new Set([
    `/sc/v1/user/login`,
    `/uc/v1/auth/refresh-token`,
    `captcha`,
    `/user/login/phone`,
    `/uc/v1/auth/login/wx-miniapp`
  ]),
  share: {
    title: `钱包抽奖吧`,
    path: `pages/index/index`,
    imageUrl: `/static/img/share.jpg`
  }
}
