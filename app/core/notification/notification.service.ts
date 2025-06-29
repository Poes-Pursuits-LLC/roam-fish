import { restClient } from '~/clients/rest.client'
import { Resource } from 'sst'
import type { EmailType } from './notification.model'
import { emailContentMap } from './email-content-map'
import { handleAsync } from '~/utils'

const MARKETING_AUDIENCE_ID = 'd24f24b0-c368-4240-a279-fde5d46edaad'

const addToMarketingList = async (email: string) => {
    if (Resource.Environment.value === 'production') {
        const [, addToMarketingListError] = await handleAsync(
            restClient.post({
                url: `https://api.resend.com/audiences/${MARKETING_AUDIENCE_ID}/contacts`,
                headers: { Authorization: `Bearer ${Resource.ResendApiKey.value}` },
                body: {
                    email,
                },
            }))
        if (addToMarketingListError) {
            console.error(`Error in notificationService.addToMarketingList: ${addToMarketingListError.message}`)
            throw Error(addToMarketingListError)
        }
    }
}

const sendEmail = async (email: string, emailType: EmailType) => {
    if (Resource.Environment.value === 'production') {
        const emailContent = emailContentMap.get(emailType)

        const [, sendEmailError] = await handleAsync(
            restClient.post({
                url: 'https://api.resend.com/emails',
                headers: { Authorization: `Bearer ${Resource.ResendApiKey.value}` },
                body: {
                    to: email,
                    from: 'Roam.fish <admin@roam.fish>',
                    subject: emailContent!.subject,
                    html: emailContent!.html,
                },
            })
        )
        if (sendEmailError) {
            console.error(`Error in notificationService.sendEmail: ${sendEmailError.message}`)
            throw Error(sendEmailError)
        }

    }
}

export const notificationService = {
    addToMarketingList,
    sendEmail,
}
