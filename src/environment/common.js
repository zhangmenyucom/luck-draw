export default {
  noVerification: new Set([
    `/sc/v1/user/login`,
    `/auth/refresh-token`,
    `captcha`,
    `/user/login/phone`,
    `/uc/v1/auth/login/wx-miniapp`
  ])
}
