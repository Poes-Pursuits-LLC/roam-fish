import { EmailType } from './notification.model'
import EmailTemplate from './emails/email-template'
import type { ReactElement } from 'react'

export const emailContentMap = new Map<
    EmailType,
    {
        subject: string
        html: ReactElement
    }
>([
    [
        EmailType.Welcome,
        {
            subject: 'Welcome to Roam.Fish!',
            html: <EmailTemplate message="Welcome to Roam.Fish!" />,
        },
    ],
])
