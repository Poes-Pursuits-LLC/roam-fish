const githubRole = new aws.iam.Role('GithubRole', {
    name: [$app.name, $app.stage, 'github'].join('-'),
    assumeRolePolicy: {
        Version: '2012-10-17',
        Statement: [
            {
                Effect: 'Allow',
                Principal: {
                    Federated:
                        'arn:aws:iam::296062572585:oidc-provider/token.actions.githubusercontent.com',
                },
                Action: 'sts:AssumeRoleWithWebIdentity',
                Condition: {
                    StringLike: {
                        'token.actions.githubusercontent.com:sub':
                            'repo:Poes-Pursuits-LLC/roam-fish:*',
                    },
                },
            },
        ],
    },
})

new aws.iam.RolePolicyAttachment('GithubRolePolicy', {
    policyArn: 'arn:aws:iam::aws:policy/AdministratorAccess',
    role: githubRole.name,
})

export const outputs = {
    githubRoleArn: githubRole.arn,
}
