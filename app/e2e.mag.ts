import { test } from 'magnitude-test'

const sampleTodos = [
    'Take out the trash',
    'Pay AWS bill',
    'Build more test cases with Magnitude',
]

test(
    'can add and complete todos',
    { url: 'https://magnitodo.com' },
    async ({ ai }) => {
        await ai.step('create 3 todos', { data: sampleTodos.join(', ') })
        await ai.check('should see all 3 todos')
        await ai.step('mark each todo complete')
        await ai.check('says 0 items left')
    },
)
