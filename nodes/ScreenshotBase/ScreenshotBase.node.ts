import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class ScreenshotBase implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'ScreenshotBase',
        name: 'screenshotBase',
        icon: { light: 'file:screenshotbase.svg', dark: 'file:screenshotbase.svg' },
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"]}}',
        description: 'Capture screenshots via ScreenshotBase API',
        defaults: {
            name: 'ScreenshotBase',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        usableAsTool: true,
        credentials: [
            {
                name: 'screenshotBaseApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: '={{$credentials.baseUrl}}',
            url: '',
            headers: {
                Accept: '*/*',
            },
        },
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Get Screenshot',
                        value: 'getScreenshot',
                        action: 'Fetch website screenshot',
                        description: 'Capture a screenshot from a given URL',
                        routing: {
                            request: {
                                method: 'GET',
                                url: '/take',
                                qs: {
                                    url: '={{$parameter["url"]}}',
                                },
                            },
                        },
                    },
                ],
                default: 'getScreenshot',
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                placeholder: 'https://bbc.com',
                description: 'The URL to capture',
                required: true,
            },
            {
                displayName: 'File Name',
                name: 'fileName',
                type: 'string',
                default: 'screenshot.png',
                description: 'Name for the screenshot file',
            },
            {
                displayName: 'Advanced',
                name: 'advanced',
                type: 'collection',
                placeholder: 'Add Option',
                default: {},
                options: [
                    {
                        displayName: 'Width',
                        name: 'width',
                        type: 'number',
                        default: 1280,
                        description: 'Viewport width in pixels',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'width',
                            },
                        },
                    },
                    {
                        displayName: 'Height',
                        name: 'height',
                        type: 'number',
                        default: 720,
                        description: 'Viewport height in pixels',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'height',
                            },
                        },
                    },
                    {
                        displayName: 'Format',
                        name: 'format',
                        type: 'options',
                        default: 'png',
                        options: [
                            { name: 'PNG', value: 'png' },
                            { name: 'JPEG', value: 'jpeg' },
                            { name: 'WEBP', value: 'webp' },
                        ],
                        routing: {
                            send: {
                                type: 'query',
                                property: 'format',
                            },
                        },
                    },
                    {
                        displayName: 'Full Page',
                        name: 'fullpage',
                        type: 'boolean',
                        default: true,
                        routing: {
                            send: {
                                type: 'query',
                                property: 'fullpage',
                            },
                        },
                    },
                ],
            },
        ],
    };
}


