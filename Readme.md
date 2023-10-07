Fastify + TypeScript boilerplate

Barebone environment with auto reload.
Has examples of how to use TypeScript generics for an endpoint

Yarn install then:

```
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "node ./dist/server.js",
    "dev": "tsc-watch --onFailure \"echo Compilation Failed\" --onSuccess \"yarn start\""
  },
```

If you are a npm guy then replace \"yarn start\" with \"npm run start\"
