import { FunctionArgs } from '../.sst/platform/src/components/aws'

export const budgetConfig: Partial<FunctionArgs> = {
    architecture: 'arm64',
    timeout: '10 seconds',
    memory: '250 MB',
}
