import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class ScreenshotBaseApi implements ICredentialType {
    name = 'screenshotBaseApi';
    displayName = 'ScreenshotBase API';

    documentationUrl = 'https://screenshotbase.com/docs';

    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            default: '',
            typeOptions: {
                password: true,
            },
            description: 'Find your key in your ScreenshotBase account',
        },
        {
            displayName: 'Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'https://api.screenshotbase.com/v1',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            qs: {
                apikey: '={{$credentials.apiKey}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.baseUrl}}',
            method: 'GET',
            url: '/take',
            qs: {
                url: 'https://bbc.com',
            },
        },
    };
}


