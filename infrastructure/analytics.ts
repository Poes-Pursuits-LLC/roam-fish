import type {} from '../.sst/platform/config'

import { allSecrets } from './secret'
import { table } from './table'

table.subscribe(
    'TableStreamIngest',
    {
        handler: 'app/functions/analytics/index.handler',
        link: [...allSecrets, table],
    },
    // TODO: get this filter rule to work so that events pertaining to analytic events -- which we write from this lambda
    // do not trigger this handler but all other events do. the below failed to work.
    // {
    //     filters: [
    //         {
    //             dynamodb: {
    //                 Keys: {
    //                     type: {
    //                         S: [{ 'anything-but': ['analytics'] }],
    //                     },
    //                 },
    //             },
    //         },
    //     ],
    // },
)
