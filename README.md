# Unboxers Assignment Mock Exam

## 서버 개요

과제용 모의고사 서버입니다. 현재 구성은 `Fastify + Prisma + SQLite`이며, API는 시험 조회와 시험 제출/채점 두 개만 제공합니다.

## 실행 방법

- apps/server 디렉토리 하위에 .env파일을 생성한 뒤, 아래 내용을 넣어줍니다.

```
DATABASE_URL="file:./dev.db"
```

아래 명령어를 차례로 실행합니다.

```bash
pnpm install
pnpm db:generate
pnpm db:push
pnpm db:seed
pnpm dev
```

- 서버 주소: `http://localhost:3001`
- Swagger UI: `http://localhost:3001/swagger`
- 환경 변수 파일: `apps/server/.env`

## 웹앱 사용 기술

- `vite`: 리액트 앱 번들러로 vite를 사용했습니다.
- `shadcn/ui, radix/ui`: 빠른 ui 컴포넌트 제작 및 커스텀을 위해 사용합니다.
- `zod`: 런타임 타입 검증을 위해 사용합니다. 서버 요청/응답 스펙과 프론트엔드 api 호출 함수와의 타입 싱크를 위해 도입했습니다.
- `zustand`: 상태 관리를 위해 사용합니다. 여러 컴포넌트 간 공유되는 시험 제출 관련 상태들이 많아 도입했습니다.

## 웹앱 실행 방법

서버를 실행시킨 후,
아래 명령어를 차례로 입력합니다.

- `pnpm install:web`
- `pnpm dev:web`
- `http://localhost:5173` 으로 접속하면 자동으로 튜토리얼 페이지로 진입힙니다.
