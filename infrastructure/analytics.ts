import type { } from '../.sst/platform/config'

import { allSecrets } from './secret'
import { table } from './table'

table.subscribe(
    'TableStreamIngest',
    {
        handler: 'app/functions/analytics/index.handler',
        link: [...allSecrets, table],
    },
    {
        filters: [
            {
                dynamodb: {
                    NewImage: {
                        type: {
                            S: [{ 'anything-but': ['analytics'] }],
                        },
                    },

                }
            }
        ],
    },
)