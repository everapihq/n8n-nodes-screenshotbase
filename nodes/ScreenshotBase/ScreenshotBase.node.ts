import { INodeType, INodeTypeDescription } from 'n8n-workflow';

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
        inputs: ['main'],
        outputs: ['main'],
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
                        displayName: 'Block Ads',
                        name: 'block_ads',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to block ads on the page',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'block_ads',
                            },
                        },
                    },
                    {
                        displayName: 'Block Chats',
                        name: 'block_chats',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to block chat widgets on the page',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'block_chats',
                            },
                        },
                    },
                    {
                        displayName: 'Block Cookie Banners',
                        name: 'block_cookie_banners',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to block cookie banners on the page',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'block_cookie_banners',
                            },
                        },
                    },
                    {
                        displayName: 'Custom Styles (CSS)',
                        name: 'styles',
                        type: 'string',
                        typeOptions: {
                            rows: 4,
                        },
                        default: '',
                        description: 'Custom CSS injected before screenshot (will be URL-encoded)',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'styles',
                            },
                        },
                    },
                    {
                        displayName: 'Delay (Seconds)',
                        name: 'delay',
                        type: 'number',
                        typeOptions: {
                            minValue: 0,
                            maxValue: 30,
                        },
                        default: 0,
                        description: 'Seconds to wait before taking the screenshot',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'delay',
                            },
                        },
                    },
                    {
                        displayName: 'Format',
                        name: 'format',
                        type: 'options',
                        default: 'png',
                        description: 'Image format to return',
                        options: [
                            { name: 'GIF', value: 'gif' },
                            { name: 'JPEG', value: 'jpeg' },
                            { name: 'JPG', value: 'jpg' },
                            { name: 'PNG', value: 'png' },
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
                        name: 'full_page',
                        type: 'boolean',
                        default: false,
                        description: 'Whether to capture the full page',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'full_page',
                            },
                        },
                    },
                    {
                        displayName: 'Hide Selectors',
                        name: 'hide_selectors',
                        type: 'string',
                        default: '',
                        description: 'Comma-separated CSS selectors to hide (API supports multiple values)',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'hide_selectors',
                            },
                        },
                    },
                    {
                        displayName: 'IP Country Code',
                        name: 'ip_country_code',
                        type: 'string',
                        default: '',
                        placeholder: 'US',
                        description: 'ISO 3166-1 alpha-2 country code',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'ip_country_code',
                            },
                        },
                    },
                    {
                        displayName: 'Quality',
                        name: 'quality',
                        type: 'number',
                        typeOptions: {
                            minValue: 1,
                            maxValue: 100,
                        },
                        default: 80,
                        description: 'Image quality (only for jpg/jpeg)',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'quality',
                            },
                        },
                    },
                    {
                        displayName: 'Timeout (Seconds)',
                        name: 'timeout',
                        type: 'number',
                        typeOptions: {
                            minValue: 5,
                            maxValue: 60,
                        },
                        default: 60,
                        description: 'Page load timeout',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'timeout',
                            },
                        },
                    },
                    {
                        displayName: 'Viewport Height',
                        name: 'viewport_height',
                        type: 'number',
                        default: 800,
                        description: 'Height of the browser viewport in pixels',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'viewport_height',
                            },
                        },
                    },
                    {
                        displayName: 'Viewport Width',
                        name: 'viewport_width',
                        type: 'number',
                        default: 1280,
                        description: 'Width of the browser viewport in pixels',
                        routing: {
                            send: {
                                type: 'query',
                                property: 'viewport_width',
                            },
                        },
                    },
                    {
                        displayName: 'Wait Until',
                        name: 'wait_until',
                        type: 'options',
                        default: 'load',
                        description: 'When to take the screenshot based on page load state',
                        options: [
                            { name: 'DOMContentLoaded', value: 'domcontentloaded' },
                            { name: 'Load', value: 'load' },
                            { name: 'NetworkIdle0', value: 'networkidle0' },
                            { name: 'NetworkIdle2', value: 'networkidle2' },
                        ],
                        routing: {
                            send: {
                                type: 'query',
                                property: 'wait_until',
                            },
                        },
                    },
                ],
            },
        ],
    };
}


