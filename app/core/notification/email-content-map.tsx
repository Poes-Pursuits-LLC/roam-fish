import { EmailType } from './notification.model'
import EmailTemplate from './emails/email-template'
import { render } from '@react-email/components'

export const emailContentMap = new Map<
    EmailType,
    {
        subject: string
        html: string
    }
>([
    [
        EmailType.Welcome,
        {
            subject: 'Welcome to Roam.Fish!',
            html: await render(<EmailTemplate message="Welcome to Roam.Fish!" />),
        },
    ],
])
