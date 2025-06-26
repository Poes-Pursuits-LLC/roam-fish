import {
    Button,
    Html,
    Head,
    Body,
    Container,
    Text,
    Hr,
} from '@react-email/components'

const APP_URL = 'https://roam.fish'

const EmailTemplate = ({ message = 'testMessage' }: { message: string }) => {
    return (
        <Html>
            <Head>
                <title>Roam.Fish - Adventure Awaits</title>
            </Head>
            <Body
                style={{
                    margin: 0,
                    padding: 0,
                    backgroundColor: '#f4f4f4',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: 1.6,
                }}
            >
                <Container
                    style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        backgroundColor: '#ffffff',
                        padding: '40px 20px',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: '40px',
                            borderBottom: '4px solid #000',
                            paddingBottom: '20px',
                        }}
                    >
                        <h1
                            style={{
                                margin: 0,
                                fontSize: '32px',
                                fontWeight: 'bold',
                                color: '#000',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                            }}
                        >
                            Roam.Fish
                        </h1>
                        <p
                            style={{
                                margin: '10px 0 0 0',
                                fontSize: '16px',
                                color: '#666',
                                fontStyle: 'italic',
                            }}
                        >
                            The simplest fishing planner on the internet
                        </p>
                    </div>

                    {/* Main Content */}
                    <div
                        style={{
                            backgroundColor: '#f8f8f8',
                            border: '3px solid #000',
                            padding: '30px',
                            marginBottom: '30px',
                            boxShadow: '8px 8px 0px #000',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '18px',
                                color: '#000',
                                margin: 0,
                                lineHeight: 1.6,
                            }}
                        >
                            {message}
                        </Text>
                    </div>

                    {/* CTA Button */}
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: '30px',
                        }}
                    >
                        <Button
                            href={APP_URL}
                            style={{
                                backgroundColor: '#1F513F',
                                color: 'white',
                                padding: '16px 32px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                border: '3px solid #000',
                                borderRadius: '0',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: '6px 6px 0px #000',
                                display: 'inline-block',
                                cursor: 'pointer',
                            }}
                        >
                            Launch App
                        </Button>
                    </div>

                    {/* Footer */}
                    <Hr
                        style={{
                            border: '2px solid #000',
                            margin: '30px 0',
                        }}
                    />
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        <p style={{ margin: '0 0 10px 0' }}>
                            Made with ❤️ in Bozeman, Montana
                        </p>
                        <p style={{ margin: 0, fontSize: '12px' }}>
                            © {new Date().getFullYear()} Roam.Fish. All rights
                            reserved.
                        </p>
                    </div>
                </Container>
            </Body>
        </Html>
    )
}

export default EmailTemplate
