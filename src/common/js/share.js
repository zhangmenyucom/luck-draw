import config from 'config'
import FootprintsActivities from '@/services/footprintsActivities'
import ext from '@/ext/ext'
export default (cb) => () => ({
    ...config.share,
    success (res) {
        if (!res) return
        FootprintsActivities.add({
            type: 'SHARE'
        }).then((res) => {
            if (res.code === 0) {
                // #warning goldBeanshare.png 写死了
                ext.showToast('分享成功', 'success', '/static/img/goldBean.png')
                if (cb) {
                    cb()
                }
            }
        })
    }
})
