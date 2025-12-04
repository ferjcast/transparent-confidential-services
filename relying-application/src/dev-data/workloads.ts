export const workload = {
    containers: [
        {
            id: 'a2341078ba4958e907e3329b7ed8f60a8999bd064b2d68cb7764e1b41128ca33',
            name: 'llm-core',
            image: 'confidential-service/llm-core:latest',
            imageDigest:
                'sha256:4f5cbf6312d7f64a898a6362a7a2dfe9e94d8d5660dce7562231303182505fcd',
            state: 'running',
            startedAt: '2025-05-25T16:11:32.464289285Z',
            labels: {
                'org.opencontainers.image.ref.name': 'ubuntu',
                'org.opencontainers.image.version': '20.04',
            },
        },
        {
            id: 'b2341078ba4958e907e3329b7ed8f60a8999bd064b2d68cb7764e1b41128ca34',
            name: 'auth-service',
            image: 'confidential-service/auth-service:v1.2.3',
            imageDigest:
                'sha256:1f2e3d4c5b6a7980a1b2c3d4e5f6071829abcd1234567890abcdef1234567890',
            state: 'running',
            startedAt: '2025-05-25T15:45:20.123Z',
            labels: {
                'org.opencontainers.image.ref.name': 'debian',
                'org.opencontainers.image.version': '11',
            },
        },
        {
            id: 'c3451078ba4958e907e3329b7ed8f60a8999bd064b2d68cb7764e1b41128ca35',
            name: 'user-service',
            image: 'confidential-service/user-service:v2.0.0',
            imageDigest:
                'sha256:2f3e4d5c6b7a8901b2c3d4e5f6071829abcdef1234567890abcdef1234567891',
            state: 'exited',
            startedAt: '2025-05-25T03:10:05.456Z',
            labels: {
                'org.opencontainers.image.ref.name': 'alpine',
                'org.opencontainers.image.version': '3.14',
            },
        },
        {
            id: 'd4561078ba4958e907e3329b7ed8f60a8999bd064b2d68cb7764e1b41128ca36',
            name: 'db-service',
            image: 'confidential-service/db-service:5.7',
            imageDigest:
                'sha256:3f4e5d6c7b8a9012b3c4d5e6f708192aabcdef1234567890abcdef1234567892',
            state: 'paused',
            startedAt: '2025-05-24T22:00:00.000Z',
            labels: {
                'org.opencontainers.image.ref.name': 'mysql',
                'org.opencontainers.image.version': '5.7',
            },
        },
        {
            id: 'e5671078ba4958e907e3329b7ed8f60a8999bd064b2d68cb7764e1b41128ca37',
            name: 'cache-service',
            image: 'confidential-service/cache-service:latest',
            imageDigest:
                'sha256:4f5e6d7c8b9a0123c4d5e6f708192a3abcdef1234567890abcdef1234567893',
            state: 'running',
            startedAt: '2025-05-25T12:30:45.789Z',
            labels: {
                'org.opencontainers.image.ref.name': 'redis',
                'org.opencontainers.image.version': '6.2',
            },
        },
        {
            id: 'f6781078ba4958e907e3329b7ed8f60a8999bd064b2d68cb7764e1b41128ca38',
            name: 'worker-service',
            image: 'confidential-service/worker-service:beta',
            imageDigest:
                'sha256:5f6e7d8c9b0a1234c5d6e7f8091a2b3abcdef1234567890abcdef1234567894',
            state: 'restarting',
            startedAt: '2025-05-25T00:00:00.000Z',
            labels: {
                'org.opencontainers.image.ref.name': 'busybox',
                'org.opencontainers.image.version': '1.33',
            },
        },
    ],

    images: [
        {
            id: 'sha256:4f5cbf6312d7f64a898a6362a7a2dfe9e94d8d5660dce7562231303182505fcd',
            repoTags: ['confidential-service/llm-core:latest'],
            repoDigests: [
                'confidential-service/llm-core@sha256:f7360a64e62fa61d7688fe592f3d520a27317ed76adea9509d9e31ea83a4faac',
            ],
            created: '2025-05-17T11:35:07.508678092Z',
            size: 3457626615,
            labels: {
                'org.opencontainers.image.ref.name': 'ubuntu',
                'org.opencontainers.image.version': '20.04',
            },
        },
        {
            id: 'sha256:1f2e3d4c5b6a7980a1b2c3d4e5f6071829abcd1234567890abcdef1234567890',
            repoTags: ['confidential-service/auth-service:v1.2.3'],
            repoDigests: [
                'confidential-service/auth-service@sha256:1111eeeebbccddff00112233445566778899aabbccddeeff',
            ],
            created: '2025-05-20T10:20:30.123Z',
            size: 234567890,
            labels: {
                'org.opencontainers.image.ref.name': 'debian',
                'org.opencontainers.image.version': '11',
            },
        },
        {
            id: 'sha256:2f3e4d5c6b7a8901b2c3d4e5f6071829abcdef1234567890abcdef1234567891',
            repoTags: ['confidential-service/user-service:v2.0.0'],
            repoDigests: [
                'confidential-service/user-service@sha256:2222fffdeeff2233445566778899aabbccddeeff00112233',
            ],
            created: '2025-05-18T08:15:00.000Z',
            size: 123456789,
            labels: {
                'org.opencontainers.image.ref.name': 'alpine',
                'org.opencontainers.image.version': '3.14',
            },
        },
        {
            id: 'sha256:3f4e5d6c7b8a9012b3c4d5e6f708192aabcdef1234567890abcdef1234567892',
            repoTags: ['confidential-service/db-service:5.7'],
            repoDigests: [
                'confidential-service/db-service@sha256:3333abcddddeee11223344556677889900aabbccddeeff11',
            ],
            created: '2025-05-17T05:00:00.000Z',
            size: 987654321,
            labels: {
                'org.opencontainers.image.ref.name': 'mysql',
                'org.opencontainers.image.version': '5.7',
            },
        },
        {
            id: 'sha256:4f5e6d7c8b9a0123c4d5e6f708192a3abcdef1234567890abcdef1234567893',
            repoTags: ['confidential-service/cache-service:latest'],
            repoDigests: [
                'confidential-service/cache-service@sha256:4444bbbcccddd111122223333444455556666777788889999',
            ],
            created: '2025-05-19T14:45:15.500Z',
            size: 456789012,
            labels: {
                'org.opencontainers.image.ref.name': 'redis',
                'org.opencontainers.image.version': '6.2',
            },
        },
        {
            id: 'sha256:5f6e7d8c9b0a1234c5d6e7f8091a2b3abcdef1234567890abcdef1234567894',
            repoTags: ['confidential-service/worker-service:beta'],
            repoDigests: [
                'confidential-service/worker-service@sha256:5555cccddd2222333344445555666677778888999900001111',
            ],
            created: '2025-05-16T20:30:00.000Z',
            size: 567890123,
            labels: {
                'org.opencontainers.image.ref.name': 'busybox',
                'org.opencontainers.image.version': '1.33',
            },
        },
    ],
};
